import { AnimatePresence, motion } from "motion/react";

const QuestionView = ({
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
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onClick={() => setExpanded(!expanded)}
      className="fixed top-0 left-0 right-0 z-[1000] overflow-hidden border-b border-white/20"
    >
      <div className="h-full overflow-y-auto relative">
        <AnimatePresence mode="wait">
          <div className="mt-2 text-gray-400 opacity-50 absolute top-0 left-0 right-0 overflow-hidden text-ellipsis text-center text-xs whitespace-wrap line-clamp-2 select-none flex items-center justify-center">
            {questions[1]}
          </div>
          {questions.map((question, index) => (
            <motion.div
              // initial={{
              //   opacity: 0,
              //   y: 20,
              // }}
              // animate={{
              //   opacity: 1,
              //   y: 0,
              // }}
              // exit={{
              //   opacity: 0,
              //   y: -20,
              // }}
              // transition={{
              //   duration: 0.25,
              //   ease: "easeInOut",
              // }}
              key={`question-${index}-${question}`}
              className="h-20 p-4 overflow-hidden text-ellipsis text-center md:text-2xl whitespace-wrap line-clamp-2 select-none flex items-center justify-center"
            >
              {question}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default QuestionView;
