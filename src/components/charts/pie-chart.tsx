
"use client"

import { Pie, PieChart } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart"

const chartData = [
  { name: "Accuracy", value: 98, fill: "var(--color-accuracy)" },
  { name: "Precision", value: 95, fill: "var(--color-precision)" },
  { name: "Recall", value: 97, fill: "var(--color-recall)" },
  { name: "F1 Score", value: 96, fill: "var(--color-f1-score)" },
]

const chartConfig = {
  value: {
    label: "Value",
  },
  accuracy: {
    label: "Accuracy",
    color: "hsl(var(--chart-1))",
  },
  precision: {
    label: "Precision",
    color: "hsl(var(--chart-2))",
  },
  recall: {
    label: "Recall",
    color: "hsl(var(--chart-3))",
  },
  "f1-score": {
    label: "F1 Score",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function PieChartComponent() {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[300px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          strokeWidth={5}
        />
        <ChartLegend
          content={<ChartLegendContent nameKey="name" />}
          className="-translate-y-[2rem] flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
        />
      </PieChart>
    </ChartContainer>
  )
}
