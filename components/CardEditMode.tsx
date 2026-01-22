import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { X } from 'lucide-react';
import { USER_DATA, USER_ELEMENTS, UserElement } from '../constants';
import ElementDetailSheet from './ElementDetailSheet';

interface CardEditModeProps {
  onClose: () => void;
}

interface BubblePosition {
  x: number;
  y: number;
  angle: number;
}

const CardEditMode: React.FC<CardEditModeProps> = ({ onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const bodiesRef = useRef<Matter.Body[]>([]);
  const [positions, setPositions] = useState<BubblePosition[]>([]);
  const dragConstraintRef = useRef<Matter.Constraint | null>(null);
  const mouseBodyRef = useRef<Matter.Body | null>(null);
  const [selectedElement, setSelectedElement] = useState<UserElement | null>(null);
  const isDraggingRef = useRef(false);
  const dragStartPosRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    const centerX = width / 2;
    const centerY = height / 2;

    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0 }
    });
    engineRef.current = engine;

    const wallThickness = 50;
    const walls = [
      Matter.Bodies.rectangle(width / 2, -wallThickness / 2, width, wallThickness, { isStatic: true }),
      Matter.Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, { isStatic: true }),
      Matter.Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height, { isStatic: true }),
      Matter.Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height, { isStatic: true }),
    ];
    Matter.Composite.add(engine.world, walls);

    const mouseBody = Matter.Bodies.circle(0, 0, 1, { isStatic: true, render: { visible: false } });
    mouseBodyRef.current = mouseBody;
    Matter.Composite.add(engine.world, mouseBody);

    const bubbles: Matter.Body[] = [];
    USER_ELEMENTS.forEach((element, index) => {
      const angle = (index / USER_ELEMENTS.length) * Math.PI * 2;
      const radius = Math.min(width, height) * 0.3;
      const x = centerX + Math.cos(angle) * radius + (Math.random() - 0.5) * 30;
      const y = centerY + Math.sin(angle) * radius + (Math.random() - 0.5) * 30;

      const bubbleRadius = element.type === 'personality' ? 32 : 26;

      const bubble = Matter.Bodies.circle(x, y, bubbleRadius, {
        restitution: 0.6,
        friction: 0.1,
        frictionAir: 0.02,
        label: `bubble-${index}`,
      });

      bubbles.push(bubble);
    });

    bodiesRef.current = bubbles;
    Matter.Composite.add(engine.world, bubbles);

    let animationId: number;
    const update = () => {
      bubbles.forEach((bubble) => {
        const dx = centerX - bubble.position.x;
        const dy = centerY - bubble.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 5) {
          const force = 0.000006 * distance;
          Matter.Body.applyForce(bubble, bubble.position, {
            x: dx * force / distance,
            y: dy * force / distance,
          });
        }
      });

      Matter.Engine.update(engine, 1000 / 60);

      setPositions(bubbles.map((bubble) => ({
        x: bubble.position.x,
        y: bubble.position.y,
        angle: bubble.angle,
      })));

      animationId = requestAnimationFrame(update);
    };

    update();

    return () => {
      cancelAnimationFrame(animationId);
      Matter.Engine.clear(engine);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent, index: number) => {
    e.preventDefault();
    const engine = engineRef.current;
    const body = bodiesRef.current[index];
    const mouseBody = mouseBodyRef.current;

    if (!engine || !body || !mouseBody) return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    dragStartPosRef.current = { x, y };
    isDraggingRef.current = false;

    Matter.Body.setPosition(mouseBody, { x, y });

    const constraint = Matter.Constraint.create({
      bodyA: mouseBody,
      bodyB: body,
      stiffness: 0.02,
      damping: 0.5,
      length: 0,
    });

    dragConstraintRef.current = constraint;
    Matter.Composite.add(engine.world, constraint);

    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const mouseBody = mouseBodyRef.current;
    if (!mouseBody || !dragConstraintRef.current) return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (dragStartPosRef.current) {
      const dx = x - dragStartPosRef.current.x;
      const dy = y - dragStartPosRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > 10) {
        isDraggingRef.current = true;
      }
    }

    Matter.Body.setPosition(mouseBody, { x, y });
  };

  const handlePointerUp = (index: number) => {
    const engine = engineRef.current;
    if (!engine || !dragConstraintRef.current) return;

    Matter.Composite.remove(engine.world, dragConstraintRef.current);
    dragConstraintRef.current = null;

    if (!isDraggingRef.current && dragStartPosRef.current) {
      setSelectedElement(USER_ELEMENTS[index]);
    }

    dragStartPosRef.current = null;
    isDraggingRef.current = false;
  };

  return (
    <div className="absolute inset-0 bg-[#0a0a1a]/95 z-50 animate-fade-in">
      {/* Space background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" style={{ left: '-5%', top: '10%' }} />
        <div className="absolute w-72 h-72 bg-blue-500/8 rounded-full blur-3xl" style={{ left: '50%', top: '-5%' }} />
        <div className="absolute w-96 h-96 bg-indigo-500/8 rounded-full blur-3xl" style={{ left: '40%', top: '50%' }} />
        <div className="absolute w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" style={{ left: '-10%', top: '60%' }} />
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-14 left-4 z-50 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
      >
        <X className="w-5 h-5 text-white/80" />
      </button>

      {/* Title */}
      <div className="absolute top-14 left-0 right-0 text-center pointer-events-none">
        <h2 className="text-white text-xl font-bold">カード編集</h2>
        <p className="text-white/60 text-sm mt-1">バブルをタップで詳細を編集</p>
      </div>

      {/* Blurred Profile Card */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 pointer-events-none">
        <div
          className="w-32 aspect-[2/3] rounded-xl bg-white/10 overflow-hidden"
          style={{ filter: 'blur(4px)' }}
        >
          <div className="flex-1 h-[80%] flex items-center justify-center p-2 bg-gradient-to-b from-neutral-700/30 to-neutral-800/30">
            <img
              src={USER_DATA.avatar}
              alt="Profile"
              className="w-full h-full object-contain opacity-60"
              onError={(e) => {
                e.currentTarget.src = "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_15.png";
              }}
            />
          </div>
          <div className="h-[20%] px-2 py-1 bg-white/5 border-t border-white/10">
            <span className="text-sm font-bold text-white/60 block text-center">{USER_DATA.name}</span>
          </div>
        </div>
      </div>

      {/* Physics container for bubbles */}
      <div
        ref={containerRef}
        className="absolute inset-0 top-52 bottom-4"
        onPointerMove={handlePointerMove}
        onPointerLeave={() => {
          if (dragConstraintRef.current && engineRef.current) {
            Matter.Composite.remove(engineRef.current.world, dragConstraintRef.current);
            dragConstraintRef.current = null;
            dragStartPosRef.current = null;
            isDraggingRef.current = false;
          }
        }}
      >
        {positions.map((pos, index) => {
          const element = USER_ELEMENTS[index];
          const isPersonality = element.type === 'personality';
          const size = isPersonality ? 64 : 52;
          const textLength = element.label.length;
          const maxWidth = size * 0.75;
          const baseFontSize = 10;
          const fontSize = Math.min(baseFontSize, Math.max(7, maxWidth / (textLength * 0.55)));

          return (
            <div
              key={index}
              className={`absolute cursor-grab active:cursor-grabbing select-none touch-none ${
                isPersonality
                  ? 'bg-purple-400'
                  : 'bg-orange-400'
              } rounded-full flex items-center justify-center shadow-lg`}
              style={{
                width: size,
                height: size,
                left: pos.x - size / 2,
                top: pos.y - size / 2,
                transform: `rotate(${pos.angle}rad)`,
              }}
              onPointerDown={(e) => handlePointerDown(e, index)}
              onPointerUp={() => handlePointerUp(index)}
            >
              <span
                className="text-white font-semibold text-center leading-tight"
                style={{
                  transform: `rotate(${-pos.angle}rad)`,
                  fontSize: `${fontSize}px`,
                  maxWidth: `${size * 0.8}px`,
                  wordBreak: 'break-word',
                }}
              >
                {element.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Element Detail Sheet */}
      {selectedElement && (
        <ElementDetailSheet
          element={selectedElement}
          onClose={() => setSelectedElement(null)}
        />
      )}
    </div>
  );
};

export default CardEditMode;
