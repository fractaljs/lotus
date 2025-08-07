import { Mic } from "lucide-react";
import { AnimatePresence, motion, scale } from "motion/react";
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
              scale: 0.85,
            }}
            initial={{ y: 0 }}
            animate={{ y: -20 }}
            transition={{ duration: 0.25 }}
            className="rounded-full size-12 flex items-center justify-center bg-black/10 backdrop-blur-lg outline outline-zinc-500/10 shadow-lg cursor-pointer"
          >
            <AnimatePresence initial={false} mode="popLayout">
              {isLLMResponding ? (
                <motion.div
                  key="wave-loader"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="flex items-center justify-center"
                >
                  <WaveLoader size="lg" />
                </motion.div>
              ) : (
                <motion.div
                  key="mic"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="flex items-center justify-center"
                >
                  <Mic size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </AnimatePresence>
      </div>
    </>
  );
};

export default QuestionTray;
