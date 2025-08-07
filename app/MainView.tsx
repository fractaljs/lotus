"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ComparativeBarChart } from "./comp/ComparativeBarChart";
import StatCard from "./comp/StatCard";
import { ArrowDown } from "lucide-react";

// Dummy chart data for payment success rate over time
const chartData = [
  { date: "Jan 1", successRate: 92 },
  { date: "Jan 2", successRate: 89 },
  { date: "Jan 3", successRate: 91 },
  { date: "Jan 4", successRate: 88 },
  { date: "Jan 5", successRate: 90 },
  { date: "Jan 6", successRate: 45 },
  { date: "Jan 7", successRate: 38 },
  { date: "Jan 8", successRate: 42 },
  { date: "Jan 9", successRate: 89 },
  { date: "Jan 10", successRate: 91 },
  { date: "Jan 11", successRate: 87 },
  { date: "Jan 12", successRate: 93 },
  { date: "Jan 13", successRate: 90 },
  { date: "Jan 14", successRate: 88 },
  { date: "Jan 15", successRate: 92 },
];

// Custom tooltip component for the chart
const CustomTooltip = ({ active, payload, label, tooltipData }: any) => {
  // Use external tooltip data if provided, otherwise use the default props
  const displayData = tooltipData || { active, payload, label };

  if (displayData.active && displayData.payload && displayData.payload.length) {
    return (
      <div className="bg-[var(--background)] border border-white/20 rounded-lg p-3 shadow-lg">
        <p className="text-white/90 font-medium">{`Date: ${displayData.label}`}</p>
        <p className="text-red-400 font-medium">{`Success Rate: ${displayData.payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

const MainView = ({ currentState }: { currentState: number }) => {
  const renderContent = () => {
    switch (currentState) {
      case 0:
        // return <View2 key="view-2" />;
        return (
          <div
            key="view-1"
            className="text-xl md:text-3xl font-medium text-center"
            style={{
              color: "rgba(93, 102, 111, 0.4)",
            }}
          >
            What would you want to know?
          </div>
        );
      case 1:
        return <View1 key="view-1" />;
      case 2:
        return <View2 key="view-2" />;
      default:
        return null;
    }
  };
  return (
    <div className="fixed top-0 pt-20 left-0 right-0 h-[100dvh] z-0 p-4 flex items-center justify-center">
      <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
    </div>
  );
};

const View2 = () => {
  const [showStatCards, setShowStatCards] = useState(false);
  const [tooltipData, setTooltipData] = useState<{
    active: boolean;
    payload: any[];
    label: string;
  } | null>(null);
  const DELAY_TO_SHOW_TABLE = 20000;
  const DELAY_TO_SHOW_TOOLTIP = 2000; // Variable for tooltip delay duration

  // Find the minimum point in the chart data
  const minPoint = chartData.reduce((min, current) =>
    current.successRate < min.successRate ? current : min
  );
  const minPointIndex = chartData.findIndex(
    (point) => point.successRate === minPoint.successRate
  );

  useEffect(() => {
    setTimeout(() => {
      setShowStatCards(true);
    }, DELAY_TO_SHOW_TABLE);
  }, []);

  useEffect(() => {
    if (showStatCards) {
      setTimeout(() => {
        setTooltipData({
          active: true,
          payload: [{ value: minPoint.successRate, payload: minPoint }],
          label: minPoint.date,
        });
      }, DELAY_TO_SHOW_TOOLTIP);
    }
  }, [showStatCards]);

  return (
    <motion.div
      layout
      key="view-2"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.7 }}
      className="space-y-6 w-[330px]"
    >
      <motion.div layout>
        <Table />
      </motion.div>
      {showStatCards && (
        <motion.div layout className="">
          <div className="text-sm text-white/90 border border-white/20 rounded-lg flex flex-col">
            <div className="flex items-start justify-between gap-4 p-4">
              <div className="flex flex-col">
                <div className="font-mono">HDFC GATEWAY LOGS</div>
                <div className="text-smfont-mono text-[var(--foreground)]/50">
                  LAST MONTH
                </div>
              </div>
              <div className="flex items-center size-6 text-red-400">
                <div>5%</div>
              </div>
            </div>
            <div className="w-full h-24">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  // margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <XAxis dataKey="date" hide={true} />
                  <YAxis hide={true} domain={[30, 95]} />
                  <Tooltip
                    // active={true}
                    content={<CustomTooltip tooltipData={tooltipData} />}
                  />
                  <Line
                    type="monotone"
                    dataKey="successRate"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={false}
                    activeDot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const Table = () => {
  const [visibleRows, setVisibleRows] = useState(0);

  // Payment Gateway Analysis data with custom delays for each row (in milliseconds)
  const tableData = [
    {
      id: 1,
      gateway: "Razorpay",
      successRate: "45%",
      change: "-5%",
      delay: 600,
    },
    {
      id: 2,
      gateway: "PayU",
      successRate: "78%",
      change: "-8%",
      delay: 1400,
    },
  ];

  useEffect(() => {
    if (visibleRows < tableData.length) {
      const currentRow = tableData[visibleRows];
      const timer = setTimeout(() => {
        setVisibleRows((prev) => prev + 1);
      }, currentRow.delay);

      return () => clearTimeout(timer);
    }
  }, [visibleRows, tableData]);

  return (
    <div className="w-full">
      <div className="rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-3 text-start text-base font-medium text-white/90 uppercase tracking-wide">
                Payment Gateway
              </th>
              <th className="px-4 py-3 text-start text-base font-medium text-white/90 uppercase tracking-wide">
                Success Rate
              </th>
              <th className="px-4 py-3 text-start text-base font-medium text-white/90 uppercase tracking-wide">
                Change
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.slice(0, visibleRows).map((row, index) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className="border-t border-white/20"
              >
                <td className="px-4 py-3 text-base text-white/90 font-medium">
                  {row.gateway}
                </td>
                <td className="px-4 py-3 text-base text-white/90">
                  {row.successRate}
                </td>
                <td className="px-4 py-3 text-base">
                  <span
                    className={`font-medium ${
                      row.change.startsWith("-")
                        ? "text-red-400"
                        : "text-green-400"
                    }`}
                  >
                    {row.change}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const View1 = () => {
  let TIME_TO_SHOW_STAT_CARDS = 18000;
  const [showStatCards, setShowStatCards] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowStatCards(true);
    }, TIME_TO_SHOW_STAT_CARDS);
  }, []);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.7 }}
      className="w-full space-y-6"
    >
      <motion.div layout className="w-full mb-14">
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
