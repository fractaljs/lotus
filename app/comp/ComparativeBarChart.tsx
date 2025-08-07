"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

export const ComparativeBarChart = () => {
  const [showSecondBar, setShowSecondBar] = useState(false);
  const [showDiffMarker, setShowDiffMarker] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSecondBar(true);
    }, 3000);

    const diffTimer = setTimeout(() => {
      setShowDiffMarker(true);
    }, 3800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      key="comparative-bar-chart"
      className="h-80 w-full flex justify-center"
    >
      <div className="relative w-full flex items-end justify-center">
        <div className="absolute bottom-0 h-[0.5px]  w-[300px] bg-white/30" />
        <AnimatePresence>
          {showSecondBar && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative mx-4 flex flex-col items-center"
              style={{ width: "80px" }}
            >
              <motion.div
                className="w-full shadow-md bg-[#d78a2c]"
                initial={{ height: 0 }}
                animate={{
                  height: `${73 * 3.2}px`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  delay: 0.2,
                }}
              >
                <motion.div
                  layout
                  className="absolute top-4 left-0 w-full text-center text-black font-medium font-mono"
                >
                  73%
                </motion.div>
              </motion.div>
              {/* December marker */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="absolute -bottom-8 w-full text-center text-white/70 text-sm font-medium"
              >
                December
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          layout
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative mx-4 flex flex-col items-center"
          style={{ width: "80px" }}
        >
          <motion.div
            className="w-full shadow-md bg-white"
            initial={{ height: 0 }}
            animate={{
              height: `${54 * 3.2}px`,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              delay: 0.2,
            }}
          >
            <motion.div
              layout
              className="absolute top-4 left-0 w-full text-center text-black font-medium font-mono"
            >
              54%
            </motion.div>
            {/* {showDiffMarker && (
              <motion.div
                layout
                initial={{ height: 0, top: 0 }}
                animate={{ height: 60, top: -60 }}
                className="absolute -top-[60px] left-0 w-full text-center text-white font-medium font-mono"
              >
                <div className="absolute -top-[1px] -left-[100px] w-[180px] h-[1px] bg-amber-300"></div>
                19%
              </motion.div>
            )} */}
          </motion.div>
          {/* January marker */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="absolute -bottom-8 w-full text-center text-white/70 text-sm font-medium"
          >
            January
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
