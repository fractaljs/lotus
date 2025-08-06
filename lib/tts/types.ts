export interface TTSOptions {
  voice?: string;
  model?: string;
  stability?: number;
  similarityBoost?: number;
  style?: number;
  useSpeakerBoost?: boolean;
  speed?: number;
  emotion?: string;
  seedValue?: number;
}

export interface TTSConfig {
  apiKey: string;
  defaultVoice?: string;
  defaultModel?: string;
}

export interface TTSResponse {
  audio: ArrayBuffer;
  success: boolean;
  error?: string;
}

export type TTSCallback = () => void;