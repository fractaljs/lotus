# Text-to-Speech with ElevenLabs

A modular, functional text-to-speech implementation using ElevenLabs API.

## Setup

1. Add your ElevenLabs API key to `.env.local`:
```
ELEVENLABS_API_KEY=your_api_key_here
```

2. Import and use the function:
```typescript
import { textToSpeech } from '@/lib/tts';

// Basic usage
await textToSpeech("Hello, this is a test message!");

// With callback
await textToSpeech("Hello world!", () => {
  console.log("Speech completed!");
});

// With options
await textToSpeech("Custom voice test", () => {
  console.log("Done!");
}, {
  voice: 'pNInz6obpgDQGcFmaJgB',
  stability: 0.7,
  similarityBoost: 0.8
});
```

## API

### `textToSpeech(text, callback?, options?)`

- `text: string` - The text to convert to speech
- `callback?: () => void` - Optional callback triggered when speech completes
- `options?: TTSOptions` - Optional voice and audio settings

### `getAvailableVoices()`

Returns a list of available voices from ElevenLabs.

## Features

- Modular and functional design
- TypeScript support
- Error handling and validation
- Configurable voice settings
- Callback support for speech completion
- Client-side audio playback using Web Audio API