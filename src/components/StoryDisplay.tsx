
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, RotateCcw, Heart, Volume2, VolumeX, Pause, Play } from 'lucide-react';

interface StoryDisplayProps {
  story: string;
  onReset: () => void;
}

const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, onReset }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isReading, setIsReading] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);
  const [currentUtterance, setCurrentUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

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
    }, 15); // Made faster: reduced from 30ms to 15ms

    return () => clearInterval(typingInterval);
  }, [story]);

  const handleReadStory = () => {
    if (!speechSynthesis) return;

    if (isReading) {
      speechSynthesis.cancel();
      setIsReading(false);
      setCurrentUtterance(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(story);
    utterance.rate = 0.8;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;
    
    // Try to use a child-friendly voice
    const voices = speechSynthesis.getVoices();
    const childFriendlyVoice = voices.find(voice => 
      voice.name.includes('Female') || 
      voice.name.includes('Child') ||
      voice.name.includes('Karen') ||
      voice.name.includes('Samantha')
    ) || voices[0];
    
    if (childFriendlyVoice) {
      utterance.voice = childFriendlyVoice;
    }

    utterance.onstart = () => setIsReading(true);
    utterance.onend = () => {
      setIsReading(false);
      setCurrentUtterance(null);
    };
    utterance.onerror = () => {
      setIsReading(false);
      setCurrentUtterance(null);
    };

    setCurrentUtterance(utterance);
    speechSynthesis.speak(utterance);
  };

  const formatStoryText = (text: string) => {
    return text.split('\n').map((paragraph, index) => {
      if (paragraph.trim() === '') return null;
      
      return (
        <p key={index} className="mb-6 leading-relaxed text-lg">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 text-starlight-400 mb-4">
          <BookOpen className="w-8 h-8 animate-bounce-gentle" />
          <h2 className="text-3xl font-comic font-bold bg-gradient-to-r from-starlight-300 via-dreamcloud-300 to-moonlight-300 bg-clip-text text-transparent">
            Your Magical Story
          </h2>
          <Heart className="w-8 h-8 text-pink-400 animate-pulse" />
        </div>
      </div>

      <div className="story-card rounded-2xl p-10 min-h-96 shadow-2xl border-2 border-white/20">
        <div className="story-scroll max-h-96 overflow-y-auto">
          <div className="font-comic leading-relaxed text-white space-y-4">
            {formatStoryText(displayedText)}
            {isTyping && (
              <span className="inline-block w-3 h-7 bg-starlight-400 animate-pulse ml-1 rounded-sm" />
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        {speechSynthesis && (
          <Button
            onClick={handleReadStory}
            className="magic-button text-white font-comic font-bold text-lg py-6 px-8 rounded-xl relative overflow-hidden shadow-lg border-2 border-white/20"
          >
            <div className="flex items-center gap-3">
              {isReading ? (
                <>
                  <VolumeX className="w-6 h-6" />
                  Stop Reading
                </>
              ) : (
                <>
                  <Volume2 className="w-6 h-6 animate-bounce-gentle" />
                  Read Story Aloud
                </>
              )}
            </div>
          </Button>
        )}
        
        <Button
          onClick={onReset}
          className="magic-button text-white font-comic font-bold text-lg py-6 px-8 rounded-xl relative overflow-hidden shadow-lg border-2 border-white/20"
        >
          <div className="flex items-center gap-3">
            <RotateCcw className="w-6 h-6" />
            Tell me another story!
          </div>
        </Button>
      </div>
    </div>
  );
};

export default StoryDisplay;
