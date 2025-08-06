import { ElevenLabs } from "@elevenlabs/elevenlabs-js";
import { TTSConfig, TTSOptions, TTSResponse } from "./types";

export class ElevenLabsService {
  private client: ElevenLabs;
  private config: TTSConfig;

  constructor(config: TTSConfig) {
    this.config = config;
    this.client = new ElevenLabs({
      apiKey: config.apiKey,
    });
  }

  async generateSpeech(
    text: string,
    options: TTSOptions = {}
  ): Promise<TTSResponse> {
    try {
      const voiceId =
        options.voice || this.config.defaultVoice || "pNInz6obpgDQGcFmaJgB";
      const modelId =
        options.model || this.config.defaultModel || "eleven_multilingual_v2";

      const response = await this.client.textToSpeech.convert(voiceId, {
        text,
        model_id: modelId,
        voice_settings: {
          stability: options.stability ?? 0.5,
          similarity_boost: options.similarityBoost ?? 0.5,
          style: options.style ?? 0.0,
          use_speaker_boost: options.useSpeakerBoost ?? true,
        },
      });

      const audioBuffer = await response.arrayBuffer();

      return {
        audio: audioBuffer,
        success: true,
      };
    } catch (error) {
      return {
        audio: new ArrayBuffer(0),
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  async getVoices() {
    try {
      const response = await this.client.voices.getAll();
      return response.voices;
    } catch (error) {
      console.error("Failed to fetch voices:", error);
      return [];
    }
  }
}
