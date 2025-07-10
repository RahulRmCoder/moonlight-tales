
import React, { useState } from 'react';
import FloatingElements from '@/components/FloatingElements';
import StoryInput from '@/components/StoryInput';
import StoryDisplay from '@/components/StoryDisplay';
import { Moon, Stars } from 'lucide-react';

const Index = () => {
  const [currentStory, setCurrentStory] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleStoryGenerate = (story: string) => {
    setCurrentStory(story);
    setIsLoading(false);
  };

  const handleStartGeneration = () => {
    setIsLoading(true);
  };

  const handleReset = () => {
    setCurrentStory('');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingElements />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Moon className="w-8 h-8 text-starlight-400 animate-glow" />
            <h1 className="text-5xl md:text-6xl font-comic font-bold bg-gradient-to-r from-moonlight-300 via-starlight-400 to-dreamcloud-300 bg-clip-text text-transparent">
              Moonlight Tales
            </h1>
            <Stars className="w-8 h-8 text-dreamcloud-400 animate-twinkle" />
          </div>
          <p className="text-xl md:text-2xl font-comic text-moonlight-200 max-w-2xl mx-auto">
            Where AI magic meets bedtime wonder ✨
          </p>
          <div className="mt-4 text-moonlight-300 font-comic">
            Funny, heartwarming stories with life lessons for every child
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-col items-center justify-center space-y-8">
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
        <footer className="mt-16 text-center text-moonlight-400 font-comic">
          <p className="text-sm">
            Sweet dreams are made of stories ⭐
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
