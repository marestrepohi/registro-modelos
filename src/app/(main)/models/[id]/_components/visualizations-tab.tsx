'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wand2, Loader2, AlertCircle } from "lucide-react";
import type { Model } from "@/lib/types";
import { getVisualizationSuggestions } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { BarChartComponent } from "@/components/charts/bar-chart";
import { LineChartComponent } from "@/components/charts/line-chart";
import { ScatterChartComponent } from "@/components/charts/scatter-chart";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const chartMap: Record<string, React.ComponentType> = {
    'bar chart': BarChartComponent,
    'line chart': LineChartComponent,
    'scatter plot': ScatterChartComponent,
};

export function VisualizationsTab({ model }: { model: Model }) {
    const { toast } = useToast();
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSuggest = async () => {
        setLoading(true);
        setError(null);
        setSuggestions([]);

        const result = await getVisualizationSuggestions({
            modelName: model.name,
            modelType: model.type,
            metricsData: JSON.stringify(model.metrics),
        });

        if (result.success && result.suggestions) {
            setSuggestions(result.suggestions);
            toast({
                title: "Suggestions generated!",
                description: `Found ${result.suggestions.length} relevant visualizations.`,
            });
        } else {
            setError(result.error || "An unknown error occurred.");
            toast({
                variant: "destructive",
                title: "Failed to get suggestions",
                description: result.error,
            });
        }
        setLoading(false);
    };

    const renderChart = (suggestion: string) => {
        const ChartComponent = chartMap[suggestion.toLowerCase()];
        if (ChartComponent) {
            return (
                 <Card key={suggestion}>
                    <CardHeader>
                        <CardTitle className="capitalize">{suggestion}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartComponent />
                    </CardContent>
                </Card>
            );
        }
        return null;
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>AI-Powered Visualization Suggestions</CardTitle>
                    <CardDescription>
                        Let our AI analyze your model's metrics and suggest the most effective visualizations for understanding its performance.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={handleSuggest} disabled={loading}>
                        {loading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Wand2 className="mr-2 h-4 w-4" />
                        )}
                        Suggest Visualizations
                    </Button>
                </CardContent>
            </Card>

            {error && (
                 <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {suggestions.length > 0 && (
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                    {suggestions.map(renderChart)}
                </div>
            )}
             {loading && (
                 <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                    {[...Array(2)].map((_, i) => (
                        <Card key={i}>
                            <CardHeader>
                                 <div className="h-6 w-1/2 bg-muted animate-pulse rounded-md" />
                            </CardHeader>
                            <CardContent>
                                <div className="h-48 bg-muted animate-pulse rounded-md" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
