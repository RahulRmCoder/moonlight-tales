
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Wand2 } from 'lucide-react';
import { toast } from 'sonner';

interface StoryInputProps {
  onStoryGenerate: (story: string) => void;
  isLoading: boolean;
}

const StoryInput: React.FC<StoryInputProps> = ({ onStoryGenerate, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) {
      toast.error('Please tell me what you\'d like your story to be about!');
      return;
    }

    console.log('Generating story for input:', input);

    try {
      const response = await fetch('https://agent-prod.studio.lyzr.ai/v3/inference/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'sk-default-iPEOmf2biknSikwsVOh0xbDtT5nNkUx6',
        },
        body: JSON.stringify({
          user_id: 'rahulrajasekharanmenon64325@gmail.com',
          agent_id: '686fe08804914e930331082a',
          session_id: '686fe08804914e930331082a-naotku71py',
          message: input,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      // Extract the story from the response
      let story = '';
      if (data.response) {
        story = data.response;
      } else if (data.message) {
        story = data.message;
      } else if (typeof data === 'string') {
        story = data;
      } else {
        story = 'Once upon a time, there was a magical story waiting to be told...';
      }

      onStoryGenerate(story);
      setInput('');
      toast.success('Your magical story is ready!');
    } catch (error) {
      console.error('Error generating story:', error);
      toast.error('Oops! The magic didn\'t work this time. Please try again!');
      
      // Fallback story for demo purposes
      const fallbackStory = `Once upon a time, based on "${input}", there lived a curious little character who learned that the most magical adventures begin with just one small step. They discovered that being kind, brave, and believing in yourself can make any dream come true. And they all lived happily ever after! ✨`;
      onStoryGenerate(fallbackStory);
    }
  };

  const examplePrompts = [
    'A brave little mouse who wants to be friends with a cat',
    'A cloud that forgot how to rain',
    'A tree that grows upside down',
    'A robot who loves to dance'
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-starlight-400">
          <Sparkles className="w-6 h-6 animate-twinkle" />
          <h2 className="text-2xl font-comic font-bold">Tell me about your story!</h2>
          <Sparkles className="w-6 h-6 animate-twinkle" />
        </div>
        <p className="text-moonlight-200 font-comic">
          Share a sentence or idea, and I'll create a magical bedtime story just for you!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="story-card rounded-xl p-6 space-y-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="A little bunny who lost their favorite toy..."
            className="min-h-24 text-lg font-comic bg-white/10 border-white/20 text-white placeholder:text-white/60 resize-none"
            disabled={isLoading}
          />
          
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="w-full magic-button text-white font-comic font-bold text-lg py-6 rounded-xl relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center justify-center gap-3">
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white" />
                  Creating your magical story...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5 animate-bounce-gentle" />
                  Tell me a story!
                  <Sparkles className="w-5 h-5 animate-twinkle" />
                </>
              )}
            </div>
          </Button>
        </div>
      </form>

      <div className="space-y-3">
        <p className="text-center text-moonlight-300 font-comic text-sm">
          Need inspiration? Try one of these magical ideas:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {examplePrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => setInput(prompt)}
              disabled={isLoading}
              className="text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 text-moonlight-100 font-comic text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              "{prompt}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryInput;
