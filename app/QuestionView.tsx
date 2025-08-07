import { motion } from "motion/react";

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

export default QuestionView;