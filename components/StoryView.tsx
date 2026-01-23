import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface StoryViewProps {
  onClose: () => void;
}

// Theme definitions matching Swift version
const THEMES = [
  { // Green Mix (Minty)
    gradientStart: 'rgb(144, 238, 144)',
    gradientEnd: 'rgb(34, 139, 34)',
    accent: 'rgb(144, 238, 144)',
  },
  { // Purple Mix (Lavender)
    gradientStart: 'rgb(216, 191, 216)',
    gradientEnd: 'rgb(75, 0, 130)',
    accent: 'rgb(218, 112, 214)',
  },
  { // Red/Pink Mix (Sunset)
    gradientStart: 'rgb(255, 182, 193)',
    gradientEnd: 'rgb(139, 0, 0)',
    accent: 'rgb(255, 127, 80)',
  },
  { // Cyan Mix (Ocean)
    gradientStart: 'rgb(175, 238, 238)',
    gradientEnd: 'rgb(0, 77, 102)',
    accent: 'rgb(0, 255, 255)',
  },
  { // Yellow Mix (Lemon)
    gradientStart: 'rgb(255, 255, 224)',
    gradientEnd: 'rgb(184, 134, 11)',
    accent: 'rgb(255, 215, 0)',
  },
  { // Pink Mix (Berry)
    gradientStart: 'rgb(255, 192, 203)',
    gradientEnd: 'rgb(139, 0, 78)',
    accent: 'rgb(255, 105, 180)',
  },
];

// Sample story content
const STORY_CONTENT = `## 🌟 共感の段階

あなたは、現代のデジタル社会において、**非常に好奇心旺盛**で多角的な興味を持つ人物です。

技術やクリエイティブな分野に深い関心を寄せ、常に新しいことを学ぼうとする姿勢が見て取れます。

## 🔮 課題と可能性

あなたは多岐にわたる分野に興味を持つため、時には膨大な情報の中で**焦点を絞ること**に難しさを感じるかもしれません。

しかし、この幅広い視野こそがあなたの強みであり、異なる分野を繋げて新しい価値を創造する可能性を秘めています。

## ✨ 理想の未来像

あなたは、技術の最前線で活躍しながら、その力を**人々の創造性や幸福**のために役立てるという、崇高なビジョンを抱いています。

AIやデザイン、音楽など、様々な領域を横断しながら、独自の道を切り拓いていくでしょう。

## 💫 あなたへのメッセージ

迷った時は、**心が躍る方を選んでください**。あなたの好奇心は、必ず素晴らしい場所へ導いてくれます。

一歩一歩、自分のペースで進んでいきましょう。`;

interface Section {
  id: number;
  heading: string;
  emojis: string[];
  content: string;
}

function parseMarkdown(content: string): Section[] {
  const sections: Section[] = [];
  const parts = content.split(/(?=^## )/gm);

  parts.forEach((part, index) => {
    const trimmed = part.trim();
    if (!trimmed) return;

    const lines = trimmed.split('\n');
    const headingLine = lines[0];

    // Extract emojis and heading text
    const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu;
    const emojis = headingLine.match(emojiRegex) || [];
    const headingText = headingLine.replace(/^##\s*/, '').replace(emojiRegex, '').trim();

    // Get content (everything after heading)
    const contentLines = lines.slice(1).join('\n').trim();

    sections.push({
      id: index,
      heading: headingText,
      emojis,
      content: contentLines,
    });
  });

  return sections;
}

function renderContent(text: string, accentColor: string): React.ReactNode {
  // Split by bold markers
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2);
      return (
        <span key={index} className="font-black" style={{ color: accentColor }}>
          {boldText}
        </span>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

const StoryView: React.FC<StoryViewProps> = ({ onClose }) => {
  const [sections] = useState<Section[]>(() => parseMarkdown(STORY_CONTENT));
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const viewportHeight = container.clientHeight;
      const triggerPoint = viewportHeight * 0.4;

      let newActiveIndex = 0;
      sectionRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          const relativeTop = rect.top - containerRect.top;

          if (relativeTop <= triggerPoint) {
            newActiveIndex = index;
          }
        }
      });

      setActiveIndex(newActiveIndex);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const currentTheme = THEMES[activeIndex % THEMES.length];
  const nextTheme = THEMES[(activeIndex + 1) % THEMES.length];

  return (
    <div className="absolute inset-0 z-50 animate-fade-in overflow-hidden">
      {/* Dynamic gradient background */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: `linear-gradient(135deg, ${currentTheme.gradientStart} 0%, ${currentTheme.gradientEnd} 100%)`,
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-14 left-4 z-50 w-11 h-11 rounded-full bg-black/20 flex items-center justify-center hover:bg-black/30 transition-colors"
      >
        <X className="w-5 h-5 text-white/80" />
      </button>

      {/* Scrollable content */}
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-y-auto scroll-smooth"
        style={{ scrollbarWidth: 'none' }}
      >
        {/* Top spacer */}
        <div className="h-[35vh]" />

        {/* Sections */}
        <div className="px-4 pb-24">
          {sections.map((section, index) => {
            const theme = THEMES[index % THEMES.length];
            const isActive = index === activeIndex;

            return (
              <div
                key={section.id}
                ref={(el) => { sectionRefs.current[index] = el; }}
                className="mb-8 transition-all duration-300"
                style={{
                  opacity: isActive ? 1 : 0.4,
                  transform: isActive ? 'scale(1)' : 'scale(0.98)',
                  filter: isActive ? 'blur(0)' : 'blur(1px)',
                }}
              >
                <div className="p-5 pb-8">
                  {/* Emojis */}
                  {section.emojis.length > 0 && (
                    <div className="flex justify-center gap-2 mb-4">
                      {section.emojis.map((emoji, i) => (
                        <span key={i} className="text-6xl">
                          {emoji}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Heading */}
                  <h2 className="text-2xl font-serif italic font-bold text-white text-center mb-6">
                    {section.heading}
                  </h2>

                  {/* Content */}
                  <div className="text-lg text-white/90 leading-relaxed whitespace-pre-line">
                    {section.content.split('\n\n').map((paragraph, pIndex) => (
                      <p key={pIndex} className="mb-4">
                        {renderContent(paragraph, theme.accent)}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom spacer */}
        <div className="h-[20vh]" />
      </div>
    </div>
  );
};

export default StoryView;
