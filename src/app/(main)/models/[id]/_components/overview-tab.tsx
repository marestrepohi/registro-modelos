'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitBranch, User, Calendar, FileText, BrainCircuit } from "lucide-react";
import { format } from 'date-fns';
import { useEffect, useState } from "react";

// The shape of our model properties based on ModelProperties.json
interface CustomProperty {
    name: string;
    value: string;
    type: string;
}

interface ModelProperties {
    creationTimeStamp: string;
    createdBy: string;
    modifiedTimeStamp: string;
    modifiedBy: string;
    id: string;
    name: string;
    description: string;
    scoreCodeType: string;
    algorithm: string;
    function: string;
    modeler: string;
    modelType: string;
    trainCodeType: string;
    targetVariable: string;
    targetEvent: string;
    targetLevel: string;
    tool: string;
    toolVersion: string;
    externalUrl: string;
    costPerCall: string;
    immutable: boolean;
    modelVersionName: string;
    "custom properties": CustomProperty[];
}

export function OverviewTab() {
    const [model, setModel] = useState<ModelProperties | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchModelProperties() {
            try {
                const response = await fetch('/ModelProperties.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: ModelProperties = await response.json();
                setModel(data);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }

        fetchModelProperties();
    }, []);

    if (loading) {
        return <div>Loading overview...</div>;
    }

    if (error) {
        return <div>Error loading model properties: {error}</div>;
    }

    if (!model) {
        return <div>No model properties found.</div>;
    }
    
        // Prepare entries excluding description and custom properties
        const entries = Object.entries(model).filter(
            ([key]) => key !== 'description' && key !== 'custom properties'
        );


        return (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {entries.map(([key, value]) => {
                        const displayValue = key.toLowerCase().includes('timestamp')
                            ? format(new Date(value as string), 'MMM d, yyyy HH:mm')
                            : String(value);
                        return (
                            <Card key={key}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">{key}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{displayValue}</div>
                                </CardContent>
                            </Card>
                        );
                    })}
                    {/* Description full width */}
                    <Card className="md:col-span-3">
                        <CardHeader className="flex items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{model.description}</p>
                        </CardContent>
                    </Card>
                    {/* Custom properties full width */}
                    <Card className="md:col-span-3">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Custom Properties</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                                {model['custom properties'].map(prop => (
                                    <li key={prop.name}>
                                        <strong>{prop.name}:</strong> {prop.value}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
        );
}
