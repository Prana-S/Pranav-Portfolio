import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isOverHero, setIsOverHero] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-none');
      
      setIsHovering(!!isInteractive);

      // Check if over hero section
      const hero = document.querySelector('section.min-h-\\[90vh\\]');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        setIsOverHero(
          e.clientY >= rect.top && e.clientY <= rect.bottom
        );
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Custom cursor */}
      <div
        className={`custom-cursor ${isHovering ? 'cursor-hover' : ''} ${isOverHero ? 'cursor-scroll' : ''}`}
        style={{
          left: position.x,
          top: position.y,
        }}
      >
        <div className="cursor-outer" />
        <div className="cursor-inner" />
      </div>

      {/* Floating gradient blob */}
      <div
        className={`gradient-blob ${isOverHero ? 'hidden' : ''}`}
        style={{
          left: position.x,
          top: position.y,
          transition: 'left 0.4s ease-out, top 0.4s ease-out, opacity 0.3s ease',
        }}
      />
    </>
  );
}
