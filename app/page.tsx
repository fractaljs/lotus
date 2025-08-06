"use client";

import { useState } from "react";
import { AnimatePresence, motion, scale } from "motion/react";
import { textToSpeech } from "@/lib/tts";
import { Mic } from "lucide-react";

export default function Home() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [inLoop, setInLoop] = useState<boolean>(false);

  const [currentState, setCurrentState] = useState<number>(0);

  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <div className="font-sans h-screen w-screen">
      <main className="w-screen space-y-4 overflow-y-auto">
        <QuestionsView
          questions={questions}
          expanded={expanded}
          setExpanded={setExpanded}
        />
        <MainView currentState={currentState} />

        <QuestionTray inLoop={inLoop} setInLoop={setInLoop} />
      </main>
    </div>
  );
}

const QuestionTray = ({
  inLoop,
  setInLoop,
}: {
  inLoop: boolean;
  setInLoop: (inLoop: boolean) => void;
}) => {
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 h-20 flex items-center justify-center">
        <AnimatePresence initial={false}>
          {!inLoop && (
            <motion.button
              onClick={() => {
                setInLoop(true);
              }}
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.95,
              }}
              animate={{
                y: -30,
              }}
              exit={{
                scale: 0,
                y: 100,
              }}
              transition={{ duration: 0.25 }}
              className="rounded-full p-5 bg-black/10 backdrop-blur-sm outline outline-zinc-500/10 shadow-lg cursor-pointer"
            >
              <Mic size={20} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

const MainView = ({ currentState }: { currentState: number }) => {
  const renderContent = () => {
    switch (currentState) {
      case 0:
        return (
          <div
            className="text-xl md:text-3xl font-medium text-center"
            style={{
              color: "rgba(93, 102, 111, 1)",
            }}
          >
            What would you want to know?
          </div>
        );
      case 1:
        return <div>World</div>;
    }
  };
  return (
    <div className="fixed top-20 left-0 right-0 h-[calc(100dvh-80px)] z-0 p-4 flex items-center justify-center">
      {renderContent()}
    </div>
  );
};

const QuestionsView = ({
  questions,
  expanded,
  setExpanded,
}: {
  questions: string[];
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
}) => {
  if (questions.length === 0) return null;
  return (
    <motion.div
      animate={{
        height: expanded ? "100vh" : "80px",
      }}
      onClick={() => setExpanded(!expanded)}
      className="fixed top-0 left-0 right-0 h-20 z-[1000] scroll-snap-y-mandatory overflow-hidden"
    >
      <div className="h-fit scroll-snap-y-mandatory">
        {questions.map((question, index) => (
          <div
            key={index}
            className="h-20 p-4 overflow-hidden text-ellipsis whitespace-wrap line-clamp-2 select-none"
          >
            {question}
          </div>
        ))}
      </div>
    </motion.div>
  );
};
