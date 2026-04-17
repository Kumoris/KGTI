"use client";

interface RadarChartProps {
  values: [number, number, number, number];
  labels: [string, string, string, string];
  size?: number;
}

export default function RadarChart({
  values,
  labels,
  size = 200,
}: RadarChartProps) {
  const center = size / 2;
  const maxRadius = size / 2 - 36;
  const angleStep = (2 * Math.PI) / 4;
  const startAngle = -Math.PI / 2;

  const getPoint = (index: number, value: number) => {
    const angle = startAngle + index * angleStep;
    const r = (value / 100) * maxRadius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const points = values.map((v, i) => getPoint(i, v));
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  const gridLevels = [0.25, 0.5, 0.75, 1.0];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {gridLevels.map((level) => {
        const gridPoints = [0, 1, 2, 3].map((i) => getPoint(i, level * 100));
        const d = gridPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
        return (
          <path
            key={level}
            d={d}
            fill="none"
            stroke="rgba(0,212,255,0.12)"
            strokeWidth={1}
          />
        );
      })}

      {[0, 1, 2, 3].map((i) => {
        const edge = getPoint(i, 100);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={edge.x}
            y2={edge.y}
            stroke="rgba(0,212,255,0.08)"
            strokeWidth={1}
          />
        );
      })}

      <path
        d={pathD}
        fill="rgba(0,212,255,0.12)"
        stroke="#00d4ff"
        strokeWidth={2}
      />

      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={4}
          fill="#00d4ff"
          stroke="#0a0a0f"
          strokeWidth={2}
        />
      ))}

      {labels.map((label, i) => {
        const edge = getPoint(i, 100);
        const labelRadius = maxRadius + 22;
        const angle = startAngle + i * angleStep;
        const lx = center + labelRadius * Math.cos(angle);
        const ly = center + labelRadius * Math.sin(angle);
        return (
          <text
            key={i}
            x={lx}
            y={ly}
            textAnchor="middle"
            dominantBaseline="central"
            fill="rgba(224,224,224,0.6)"
            fontSize={11}
            fontFamily="var(--font-geist-mono)"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
}
