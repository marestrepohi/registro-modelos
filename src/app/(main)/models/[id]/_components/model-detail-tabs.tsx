'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Model } from "@/lib/types";
import { OverviewTab } from './overview-tab';
import { MetricsTab } from './metrics-tab';
import { VisualizationsTab } from './visualizations-tab';
import { GovernanceTab } from './governance-tab';
import { AlertsTab } from './alerts-tab';
import { RunAnalysisTab } from './run-analysis-tab';

export default function ModelDetailTabs({ model }: { model: Model }) {
    return (
        <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="metrics">Metrics</TabsTrigger>
                <TabsTrigger value="visualizations">Visualizations</TabsTrigger>
                <TabsTrigger value="governance">Data Governance</TabsTrigger>
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
                <TabsTrigger value="run-analysis">Run Analysis</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-6">
                <OverviewTab model={model} />
            </TabsContent>
            <TabsContent value="metrics" className="mt-6">
                <MetricsTab model={model} />
            </TabsContent>
            <TabsContent value="visualizations" className="mt-6">
                <VisualizationsTab model={model} />
            </TabsContent>
            <TabsContent value="governance" className="mt-6">
                <GovernanceTab model={model} />
            </TabsContent>
            <TabsContent value="alerts" className="mt-6">
                <AlertsTab model={model} />
            </TabsContent>
            <TabsContent value="run-analysis" className="mt-6">
                <RunAnalysisTab />
            </TabsContent>
        </Tabs>
    );
}
