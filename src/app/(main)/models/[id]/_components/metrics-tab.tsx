'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Model } from "@/lib/types";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

export function MetricsTab({ model }: { model: Model }) {

    function renderMetricChange(change?: string) {
        if (!change) return <span className="flex items-center text-muted-foreground"><Minus className="h-4 w-4 mr-1" />No Change</span>;

        const isPositive = change.startsWith('+');
        const Icon = isPositive ? ArrowUp : ArrowDown;
        const color = isPositive ? 'text-green-500' : 'text-red-500';

        return (
            <span className={`flex items-center ${color}`}>
                <Icon className="h-4 w-4 mr-1" />
                {change} vs last version
            </span>
        );
    }
    
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {model.metrics.map((metric) => (
                <Card key={metric.name}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{metric.value}</div>
                        <p className="text-xs text-muted-foreground">
                            {renderMetricChange(metric.change)}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
