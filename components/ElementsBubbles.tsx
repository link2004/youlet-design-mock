import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { X } from 'lucide-react';
import { USER_ELEMENTS } from '../constants';

interface ElementsBubblesProps {
  onClose: () => void;
}

interface BubblePosition {
  x: number;
  y: number;
  angle: number;
}

const ElementsBubbles: React.FC<ElementsBubblesProps> = ({ onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const bodiesRef = useRef<Matter.Body[]>([]);
  const [positions, setPositions] = useState<BubblePosition[]>([]);
  const dragConstraintRef = useRef<Matter.Constraint | null>(null);
  const mouseBodyRef = useRef<Matter.Body | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    const centerX = width / 2;
    const centerY = height / 2;

    // Create engine with no default gravity
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0 }
    });
    engineRef.current = engine;

    // Create walls (boundaries)
    const wallThickness = 50;
    const walls = [
      // Top
      Matter.Bodies.rectangle(width / 2, -wallThickness / 2, width, wallThickness, { isStatic: true }),
      // Bottom
      Matter.Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, { isStatic: true }),
      // Left
      Matter.Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height, { isStatic: true }),
      // Right
      Matter.Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height, { isStatic: true }),
    ];
    Matter.Composite.add(engine.world, walls);

    // Create invisible mouse body for dragging
    const mouseBody = Matter.Bodies.circle(0, 0, 1, { isStatic: true, render: { visible: false } });
    mouseBodyRef.current = mouseBody;
    Matter.Composite.add(engine.world, mouseBody);

    // Create bubbles
    const bubbles: Matter.Body[] = [];
    USER_ELEMENTS.forEach((element, index) => {
      const angle = (index / USER_ELEMENTS.length) * Math.PI * 2;
      const radius = Math.min(width, height) * 0.25;
      const x = centerX + Math.cos(angle) * radius + (Math.random() - 0.5) * 50;
      const y = centerY + Math.sin(angle) * radius + (Math.random() - 0.5) * 50;

      const bubbleRadius = element.type === 'personality' ? 38 : 32;

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

    // Animation loop
    let animationId: number;
    const update = () => {
      // Apply center gravity to all bubbles
      bubbles.forEach((bubble) => {
        const dx = centerX - bubble.position.x;
        const dy = centerY - bubble.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 5) {
          const force = 0.00003 * distance;
          Matter.Body.applyForce(bubble, bubble.position, {
            x: dx * force / distance,
            y: dy * force / distance,
          });
        }
      });

      Matter.Engine.update(engine, 1000 / 60);

      // Update React state with positions
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

  // Handle touch/mouse interactions
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

    Matter.Body.setPosition(mouseBody, { x, y });

    // Create constraint between mouse and bubble
    const constraint = Matter.Constraint.create({
      bodyA: mouseBody,
      bodyB: body,
      stiffness: 0.2,
      damping: 0.3,
      length: 0,
    });

    dragConstraintRef.current = constraint;
    Matter.Composite.add(engine.world, constraint);

    // Capture pointer for drag
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const mouseBody = mouseBodyRef.current;
    if (!mouseBody || !dragConstraintRef.current) return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    Matter.Body.setPosition(mouseBody, { x, y });
  };

  const handlePointerUp = () => {
    const engine = engineRef.current;
    if (!engine || !dragConstraintRef.current) return;

    Matter.Composite.remove(engine.world, dragConstraintRef.current);
    dragConstraintRef.current = null;
  };

  return (
    <div className="absolute inset-0 bg-slate-900 z-50 animate-fade-in">
      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-1 h-1 bg-white/60 rounded-full" style={{ left: '10%', top: '15%' }} />
        <div className="absolute w-1.5 h-1.5 bg-white/50 rounded-full" style={{ left: '25%', top: '8%' }} />
        <div className="absolute w-1 h-1 bg-white/70 rounded-full" style={{ left: '45%', top: '12%' }} />
        <div className="absolute w-0.5 h-0.5 bg-white/50 rounded-full" style={{ left: '70%', top: '5%' }} />
        <div className="absolute w-1 h-1 bg-white/60 rounded-full" style={{ left: '85%', top: '18%' }} />
        <div className="absolute w-1.5 h-1.5 bg-white/40 rounded-full" style={{ left: '15%', top: '85%' }} />
        <div className="absolute w-1 h-1 bg-white/60 rounded-full" style={{ left: '35%', top: '90%' }} />
        <div className="absolute w-0.5 h-0.5 bg-white/70 rounded-full" style={{ left: '60%', top: '88%' }} />
        <div className="absolute w-1 h-1 bg-white/50 rounded-full" style={{ left: '80%', top: '92%' }} />
        <div className="absolute w-1 h-1 bg-white/60 rounded-full" style={{ left: '5%', top: '50%' }} />
        <div className="absolute w-0.5 h-0.5 bg-white/50 rounded-full" style={{ left: '92%', top: '45%' }} />
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-14 right-4 z-50 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
      >
        <X className="w-5 h-5 text-white" />
      </button>

      {/* Title */}
      <div className="absolute top-14 left-0 right-0 text-center">
        <h2 className="text-white text-xl font-bold">Your Elements</h2>
        <p className="text-white/60 text-sm mt-1">Drag and play with your traits</p>
      </div>

      {/* Physics container */}
      <div
        ref={containerRef}
        className="absolute inset-0 top-28 bottom-4"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {positions.map((pos, index) => {
          const element = USER_ELEMENTS[index];
          const isPersonality = element.type === 'personality';
          const size = isPersonality ? 76 : 64;

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
            >
              <span
                className="text-white text-xs font-semibold text-center px-1"
                style={{ transform: `rotate(${-pos.angle}rad)` }}
              >
                {element.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ElementsBubbles;
