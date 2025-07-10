
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, RotateCcw, Heart } from 'lucide-react';

interface StoryDisplayProps {
  story: string;
  onReset: () => void;
}

const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, onReset }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < story.length) {
        setDisplayedText(story.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, [story]);

  const formatStoryText = (text: string) => {
    // Split into paragraphs and add some basic formatting
    return text.split('\n').map((paragraph, index) => {
      if (paragraph.trim() === '') return null;
      
      return (
        <p key={index} className="mb-4 leading-relaxed">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 text-starlight-400 mb-2">
          <BookOpen className="w-6 h-6" />
          <h2 className="text-2xl font-comic font-bold">Your Magical Story</h2>
          <Heart className="w-6 h-6 text-pink-400 animate-pulse" />
        </div>
      </div>

      <div className="story-card rounded-xl p-8 min-h-96">
        <div className="story-scroll max-h-96 overflow-y-auto">
          <div className="text-lg font-comic leading-relaxed text-white space-y-4">
            {formatStoryText(displayedText)}
            {isTyping && (
              <span className="inline-block w-2 h-6 bg-starlight-400 animate-pulse ml-1" />
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={onReset}
          className="magic-button text-white font-comic font-bold text-lg py-4 px-8 rounded-xl relative overflow-hidden"
        >
          <div className="flex items-center gap-3">
            <RotateCcw className="w-5 h-5" />
            Tell me another story!
          </div>
        </Button>
      </div>
    </div>
  );
};

export default StoryDisplay;
