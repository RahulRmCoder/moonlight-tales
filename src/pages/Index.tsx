
import React, { useState } from 'react';
import FloatingElements from '@/components/FloatingElements';
import StoryInput from '@/components/StoryInput';
import StoryDisplay from '@/components/StoryDisplay';
import { Moon, Stars, Sparkles } from 'lucide-react';

const Index = () => {
  const [currentStory, setCurrentStory] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleStoryGenerate = (story: string) => {
    setCurrentStory(story);
    setIsLoading(false);
  };

  const handleReset = () => {
    setCurrentStory('');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingElements />
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Moon className="w-12 h-12 text-starlight-400 animate-glow" />
            <h1 className="text-6xl md:text-7xl font-comic font-bold bg-gradient-to-r from-moonlight-300 via-starlight-400 to-dreamcloud-300 bg-clip-text text-transparent drop-shadow-2xl">
              Moonlight Tales
            </h1>
            <Stars className="w-12 h-12 text-dreamcloud-400 animate-twinkle" />
          </div>
          <div className="space-y-4">
            <p className="text-2xl md:text-3xl font-comic text-moonlight-200 max-w-3xl mx-auto">
              Where AI magic meets bedtime wonder
            </p>
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-starlight-400 animate-twinkle" />
              <span className="text-xl text-moonlight-300 font-comic">
                Funny, heartwarming stories with life lessons for every child
              </span>
              <Sparkles className="w-6 h-6 text-starlight-400 animate-twinkle" />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-col items-center justify-center space-y-12">
          {!currentStory ? (
            <StoryInput 
              onStoryGenerate={handleStoryGenerate}
              isLoading={isLoading}
            />
          ) : (
            <StoryDisplay 
              story={currentStory}
              onReset={handleReset}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="mt-20 text-center text-moonlight-400 font-comic">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl">⭐</span>
            <p className="text-lg">
              Sweet dreams are made of stories
            </p>
            <span className="text-2xl">⭐</span>
          </div>
          <p className="text-sm text-moonlight-500">
            Let your imagination soar with every tale ✨
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
