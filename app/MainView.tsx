"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ComparativeBarChart } from "./comp/ComparativeBarChart";
import StatCard from "./comp/StatCard";

const MainView = ({ currentState }: { currentState: number }) => {
  const renderContent = () => {
    switch (currentState) {
      case 0:
        return (
          <div
            className="text-xl md:text-3xl font-medium text-center"
            style={{
              color: "rgba(93, 102, 111, 0.4)",
            }}
          >
            What would you want to know?
          </div>
        );
      case 1:
        return <View1 />;
      default:
        return null;
    }
  };
  return (
    <div className="fixed top-0 pt-20 left-0 right-0 h-[100dvh] z-0 p-4 flex items-center justify-center">
      <AnimatePresence>{renderContent()}</AnimatePresence>
    </div>
  );
};

const View1 = () => {
  let TIME_TO_SHOW_STAT_CARDS = 10000;
  const [showStatCards, setShowStatCards] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowStatCards(true);
    }, TIME_TO_SHOW_STAT_CARDS);
  }, []);
  return (
    <motion.div layout className="w-full space-y-6">
      <motion.div layout className="w-full">
        <ComparativeBarChart />
      </motion.div>
      {showStatCards && (
        <motion.div
          layout
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col space-y-4 mb-20"
        >
          <StatCard
            title="UPI Success Rate"
            value="85%"
            delta="5%"
            kind="down"
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default MainView;
