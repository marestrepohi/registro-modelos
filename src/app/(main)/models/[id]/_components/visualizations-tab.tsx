
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Model } from "@/lib/types";
import { BarChartComponent } from "@/components/charts/bar-chart";
import { LineChartComponent } from "@/components/charts/line-chart";
import { ScatterChartComponent } from "@/components/charts/scatter-chart";

export function VisualizationsTab({ model }: { model: Model }) {
    
    const renderCharts = () => {
        switch (model.type) {
            case 'Classification':
                return (
                    <>
                        <Card>
                            <CardHeader>
                                <CardTitle>Performance Metrics</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <BarChartComponent />
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle>Metric Trends</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <LineChartComponent />
                            </CardContent>
                        </Card>
                    </>
                );
            case 'Regression':
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Predicted vs. Actual</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScatterChartComponent />
                        </CardContent>
                    </Card>
                );
             case 'Clustering':
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Cluster Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScatterChartComponent />
                        </CardContent>
                    </Card>
                );
            default:
                return <p>No visualizations available for this model type.</p>;
        }
    }

    return (
        <div className="space-y-6">
             <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                {renderCharts()}
            </div>
        </div>
    );
}
