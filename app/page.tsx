"use client";

import { useEffect, useState } from "react";
import MainView from "./MainView";
import QuestionTray from "./QuestionTray";
import { textToSpeech } from "@/lib/tts";
import QuestionView from "./QuestionView";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Home() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [inLoop, setInLoop] = useState<boolean>(false);
  const [isLLMResponding, setIsLLMResponding] = useState<boolean>(false);
  const [currentState, setCurrentState] = useState<number>(0);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [askingQuestion, setAskingQuestion] = useState<boolean>(false);

  const talk = async (text: string, voice: string) => {
    await new Promise<void>((resolve) => {
      textToSpeech(text, resolve, { voice });
    });
  };

  const playAudio = async (audioPath: string) => {
    return new Promise<void>((resolve) => {
      console.log("Attempting to play audio:", audioPath);

      const audio = new Audio(audioPath);

      audio.onloadstart = () => console.log("Audio loading started");
      audio.oncanplay = () => console.log("Audio can start playing");
      audio.onplay = () => console.log("Audio started playing");
      audio.onended = () => {
        console.log("Audio ended");
        resolve();
      };
      audio.onerror = (e) => {
        console.error("Audio error:", e);
        console.error("Audio error details:", audio.error);
        resolve(); // Resolve even on error to continue the flow
      };

      // Set volume to ensure it's audible
      audio.volume = 1.0;

      audio
        .play()
        .then(() => {
          console.log("Audio play() succeeded");
        })
        .catch((error) => {
          console.error("Audio play() failed:", error);
          resolve(); // Handle autoplay restrictions
        });
    });
  };

  const animate = async () => {
    setInLoop(true);
    setAskingQuestion(true);
    await talk(
      "Hey, can you tell me about the Success Rate for the month?",
      "Rachel"
    ).then(() => {
      setAskingQuestion(false);
    });
    setIsLLMResponding(true);

    setQuestions([
      "Hey, can you tell me about the Success Rate for the month?",
    ]);
    setAskingQuestion(false);

    await delay(2000);

    setCurrentState(1);
    const audioFile = "/response-audio.mp3";
    console.log("About to play audio file:", audioFile);
    await playAudio(audioFile);

    setIsLLMResponding(false);

    await talk("Why is the success rate so low?", "Rachel");
    setQuestions([
      "Why is the success rate so low?",
      "The UPI success rate is 85% for the month, which is down by 5% from last month",
    ]);

    setInLoop(true);

    await talk(
      "The UPI success rate is 85% for the month, which is down by 5% from last month",
      "Rachel"
    );
  };

  return (
    <div className="font-sans h-screen w-screen">
      <main className="relative w-screen space-y-4 overflow-y-auto">
        <QuestionView
          questions={questions}
          expanded={expanded}
          setExpanded={setExpanded}
        />
        <MainView currentState={currentState} />

        <QuestionTray
          inLoop={inLoop}
          setInLoop={setInLoop}
          animate={animate}
          askingQuestion={askingQuestion}
          setAskingQuestion={setAskingQuestion}
          isLLMResponding={isLLMResponding}
        />
      </main>
    </div>
  );
}
