'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Model } from "@/lib/types";
import { GitBranch, User, Calendar, FileText, CheckCircle } from "lucide-react";
import { format } from 'date-fns';

export function OverviewTab({ model }: { model: Model }) {
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
                    <div className="text-2xl font-bold">{format(new Date(model.createdAt), 'MMM d, yyyy')}</div>
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

// Dummy icon to prevent errors if not present in lucide-react
const BrainCircuit = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 2a10 10 0 0 0-3.93 19.07"/><path d="M12 2a10 10 0 0 1 3.93 19.07"/><path d="M12 2v20"/><path d="M2 12h20"/><path d="M5 5a7 7 0 0 1 14 0"/><path d="M5 19a7 7 0 0 0 14 0"/><path d="M12 2a7 7 0 0 0-7 7"/><path d="M12 2a7 7 0 0 1 7 7"/><path d="M12 22a7 7 0 0 1-7-7"/><path d="M12 22a7 7 0 0 0 7-7"/></svg>
  );
  
