'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function MLflowTab() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>MLflow Experiments</CardTitle>
                <CardDescription>
                    Embedded view of the MLflow tracking server.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <iframe
                    src="http://10.151.4.91:5000/#/experiments/"
                    className="w-full h-[800px] border rounded-md"
                    title="MLflow Experiments"
                ></iframe>
            </CardContent>
        </Card>
    );
}
