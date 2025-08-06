import { TTSOptions, TTSCallback } from './types';

const VOICE_MAP: Record<string, string> = {
  'Rachel': 'pNInz6obpgDQGcFmaJgB',
  'Josh': 'TxGEqnHWrfWFTfGW9XjX',
  'Adam': 'pNInz6obpgDQGcFmaJgB',
  'Antoni': 'ErXwobaYiN019PkySvjV',
  'Arnold': 'VR6AewLTigWG4xSOukaG',
  'Bella': 'EXAVITQu4vr4xnSDxMaL',
  'Domi': 'AZnzlk1XvdvUeBnXmlld',
  'Elli': 'MF3mGyEYCl7XYWbV9V6O',
  'Freya': 'jsCqWAovK2LkecY7zXl4',
  'Grace': 'oWAxZDx7w5VEj9dCyTzz',
  'Sam': 'yoZ06aMxZJJ28mfd3POQ'
};

export async function textToSpeech(
  text: string,
  callback?: TTSCallback,
  options: TTSOptions = {}
): Promise<void> {
  if (!text || text.trim().length === 0) {
    throw new Error('Text cannot be empty');
  }

  if (text.length > 5000) {
    throw new Error('Text is too long (max 5000 characters)');
  }

  try {
    const apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;
    
    if (!apiKey) {
      throw new Error('NEXT_PUBLIC_ELEVENLABS_API_KEY environment variable is not set');
    }

    const voiceId = VOICE_MAP[options.voice || 'Rachel'] || options.voice || 'pNInz6obpgDQGcFmaJgB';
    const modelId = options.model || 'eleven_multilingual_v2';

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: modelId,
        voice_settings: {
          stability: options.stability ?? 0.5,
          similarity_boost: options.similarityBoost ?? 0.5,
          style: options.style ?? 0.0,
          use_speaker_boost: options.useSpeakerBoost ?? true,
          ...(options.speed && { speed: options.speed }),
        },
        ...(options.emotion && { emotion: options.emotion }),
        ...(options.seedValue && { seed: options.seedValue }),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const audioBuffer = await response.arrayBuffer();
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const decodedBuffer = await audioContext.decodeAudioData(audioBuffer);
    const source = audioContext.createBufferSource();
    
    source.buffer = decodedBuffer;
    source.connect(audioContext.destination);

    if (callback) {
      source.onended = callback;
    }

    source.start();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Text-to-speech failed: ${errorMessage}`);
  }
}

export * from './types';