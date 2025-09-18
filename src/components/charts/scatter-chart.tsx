"use client"

import { Scatter, ScatterChart, XAxis, YAxis, CartesianGrid } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
    { x: 10, y: 200 },
    { x: 20, y: 100 },
    { x: 30, y: 150 },
    { x: 40, y: 230 },
    { x: 50, y: 300 },
    { x: 60, y: 400 },
    { x: 70, y: 280 },
    { x: 80, y: 340 },
    { x: 90, y: 210 },
    { x: 100, y: 380 },
];

const chartConfig = {
  predicted: {
    label: "Predicted",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function ScatterChartComponent() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <ScatterChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid />
        <XAxis dataKey="x" type="number" name="Actual Values" />
        <YAxis dataKey="y" type="number" name="Predicted Values" />
        <ChartTooltip cursor={{ strokeDasharray: '3 3' }} content={<ChartTooltipContent />} />
        <Scatter name="Predicted vs Actual" dataKey="y" fill="var(--color-predicted)" />
      </ScatterChart>
    </ChartContainer>
  )
}
