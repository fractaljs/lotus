import { Mic } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { AnimatedGlowCard } from "./comp/AnimatedGlow";
import { WaveLoader } from "./comp/WaveLoader";

const QuestionTray = ({
  inLoop,
  setInLoop,
  animate,
  askingQuestion,
  setAskingQuestion,
  isLLMResponding,
}: {
  inLoop: boolean;
  setInLoop: (inLoop: boolean) => void;
  animate: () => void;
  askingQuestion: boolean;
  setAskingQuestion: (askingQuestion: boolean) => void;
  isLLMResponding: boolean;
}) => {
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 h-20 flex items-center justify-center">
        {askingQuestion && (
          <div className="absolute inset-0 w-screen">
            <AnimatedGlowCard />
          </div>
        )}
        <AnimatePresence initial={false}>
          <motion.button
            onClick={animate}
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
            className="rounded-full p-5 bg-black/10 backdrop-blur-lg outline outline-zinc-500/10 shadow-lg cursor-pointer"
          >
            {isLLMResponding ? <WaveLoader /> : <Mic size={20} />}
          </motion.button>
        </AnimatePresence>
      </div>
    </>
  );
};

export default QuestionTray;
