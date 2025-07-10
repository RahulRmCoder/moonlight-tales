
import React from 'react';

const FloatingElements = () => {
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 4,
    duration: 2 + Math.random() * 2,
  }));

  const clouds = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    width: 60 + Math.random() * 100,
    height: 30 + Math.random() * 40,
    delay: Math.random() * 6,
    duration: 8 + Math.random() * 4,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={`star-${star.id}`}
          className="star floating-element animate-twinkle"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}

      {/* Clouds */}
      {clouds.map((cloud) => (
        <div
          key={`cloud-${cloud.id}`}
          className="cloud floating-element animate-float"
          style={{
            left: `${cloud.left}%`,
            top: `${cloud.top}%`,
            width: `${cloud.width}px`,
            height: `${cloud.height}px`,
            animationDelay: `${cloud.delay}s`,
            animationDuration: `${cloud.duration}s`,
          }}
        />
      ))}

      {/* Moon */}
      <div className="fixed top-8 right-8 w-16 h-16 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full animate-glow opacity-80" />
    </div>
  );
};

export default FloatingElements;
