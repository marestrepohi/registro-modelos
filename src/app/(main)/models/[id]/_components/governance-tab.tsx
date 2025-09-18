'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Model } from "@/lib/types";
import { Database, GitMerge, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function GovernanceTab({ model }: { model: Model }) {

    function getComplianceStatusColor(status: 'Compliant' | 'Non-Compliant' | 'In-Review') {
        switch (status) {
            case 'Compliant':
                return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-400/20';
            case 'Non-Compliant':
                return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-400/20';
            case 'In-Review':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-400/20';
        }
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Database className="h-5 w-5 text-muted-foreground" />
                        <CardTitle>Data Sources</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {model.governance.dataSources.map(source => (
                            <Badge key={source} variant="secondary" className="text-sm font-mono">{source}</Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <GitMerge className="h-5 w-5 text-muted-foreground" />
                        <CardTitle>Data Lineage</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="font-mono text-sm p-4 bg-muted rounded-md">{model.governance.dataLineage}</p>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                        <CardTitle>Compliance Status</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {model.governance.compliance.map(c => (
                            <li key={c.framework} className="flex justify-between items-center p-2 border rounded-md">
                                <span className="font-medium">{c.framework}</span>
                                <Badge className={cn("text-xs", getComplianceStatusColor(c.status))}>{c.status}</Badge>
                            </li>
                        ))}
                         {model.governance.compliance.length === 0 && (
                            <p className="text-sm text-muted-foreground">No compliance frameworks listed for this model.</p>
                        )}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
