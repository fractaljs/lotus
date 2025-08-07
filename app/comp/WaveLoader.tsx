import "./WaveLoader.css";

interface WaveLoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function WaveLoader({ className, size = "sm" }: WaveLoaderProps) {
  const sizeConfig = {
    sm: {
      containerHeight: "12px",
      barWidth: "1px",
      heights: ["4px", "6px", "8px", "6px", "4px"],
    },
    md: {
      containerHeight: "16px",
      barWidth: "2px",
      heights: ["6px", "9px", "12px", "9px", "6px"],
    },
    lg: {
      containerHeight: "20px",
      barWidth: "2.5px",
      heights: ["8px", "12px", "16px", "12px", "8px"],
    },
  };
  const config = sizeConfig[size];

  return (
    <div
      className={`wave-loader ${className}`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "2px",
        height: config.containerHeight,
      }}
    >
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="wave-bar"
          style={{
            width: config.barWidth,
            height: config.heights[i],
            backgroundColor: "var(--foreground)",
            borderRadius: "9999px",
            animation: "wave 1s ease-in-out infinite",
            animationDelay: `${i * 100}ms`,
          }}
        />
      ))}
      <span className="sr-only">Loading</span>
    </div>
  );
}
