import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { TTSConfig, TTSOptions, TTSResponse } from "./types";

export class ElevenLabsService {
  private client: ElevenLabsClient;
  private config: TTSConfig;

  constructor(config: TTSConfig) {
    this.config = config;
    this.client = new ElevenLabsClient({
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
        modelId: modelId,
        voiceSettings: {
          stability: options.stability ?? 0.5,
          similarityBoost: options.similarityBoost ?? 0.5,
          style: options.style ?? 0.0,
          useSpeakerBoost: options.useSpeakerBoost ?? true,
        },
      });

      const chunks: Uint8Array[] = [];
      const reader = response.getReader();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
      }

      const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
      const audioBuffer = new ArrayBuffer(totalLength);
      const uint8Array = new Uint8Array(audioBuffer);
      let offset = 0;

      for (const chunk of chunks) {
        uint8Array.set(chunk, offset);
        offset += chunk.length;
      }

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
      const response = await this.client.voices.search();
      return response.voices;
    } catch (error) {
      console.error("Failed to fetch voices:", error);
      return [];
    }
  }
}
