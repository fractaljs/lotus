import React from "react";

const StatCard = ({
  title,
  value,
  delta,
  kind = "down",
}: {
  title: string;
  value: string;
  delta: string;
  kind: string;
}) => {
  return (
    <div className="mx-auto w-[320px] flex flex-col space-y-4 rounded-3xl p-6 border border-[#1F2021]">
      <div className="text-base text-gray-400 w-full flex items-center justify-start">
        {title}
      </div>
      <div className="flex items-baseline justify-start gap-4">
        <div className="text-3xl text-[var(--foreground)]">{value}</div>
        <div
          className="text-base"
          style={{ color: kind === "down" ? "#BE553D" : "green" }}
        >
          {delta}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
