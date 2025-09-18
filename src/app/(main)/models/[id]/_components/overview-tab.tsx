'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitBranch, User, Calendar, FileText, BrainCircuit } from "lucide-react";
import { format } from 'date-fns';
import { useEffect, useState } from "react";

// The shape of our model properties based on ModelProperties.json
interface ModelProperties {
  type: string;
  version: string;
  author: string;
  createdAt: string;
  purpose: string;
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
    
    const isValidDate = !isNaN(new Date(model.createdAt).getTime());


    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Model Type</CardTitle>
                    <BrainCircuit className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{model.type}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Version</CardTitle>
                    <GitBranch className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{model.version}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Author</CardTitle>
                    <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{model.author}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Creation Date</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {isValidDate ? format(new Date(model.createdAt), 'MMM d, yyyy') : 'Invalid Date'}
                    </div>
                </CardContent>
            </Card>
            <Card className="md:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Purpose</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">{model.purpose}</p>
                </CardContent>
            </Card>
        </div>
    );
}
