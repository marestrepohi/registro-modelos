'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Model, Alert as AlertType } from "@/lib/types";
import { Bell, PlusCircle, AlertTriangle, CheckCircle, BellRing } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

function getStatusInfo(status: AlertType['status']) {
    switch (status) {
        case 'Active':
            return { icon: CheckCircle, color: 'text-green-500', bgColor: 'bg-green-100 dark:bg-green-900/20' };
        case 'Triggered':
            return { icon: AlertTriangle, color: 'text-red-500', bgColor: 'bg-red-100 dark:bg-red-900/20' };
        case 'Resolved':
            return { icon: BellRing, color: 'text-yellow-500', bgColor: 'bg-yellow-100 dark:bg-yellow-900/20' };
        default:
            return { icon: Bell, color: 'text-muted-foreground', bgColor: 'bg-muted' };
    }
}


export function AlertsTab({ model }: { model: Model }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Alerting Rules</CardTitle>
                    <CardDescription>Configure and view alerts for model performance metrics.</CardDescription>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            New Alert Rule
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                        <DialogTitle>Create New Alert Rule</DialogTitle>
                        <DialogDescription>
                            Get notified when a model metric crosses a specific threshold.
                        </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="metric" className="text-right">Metric</Label>
                                <Select>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select a metric" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {model.metrics.map(m => <SelectItem key={m.name} value={m.name}>{m.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="condition" className="text-right">Condition</Label>
                                 <Select>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select a condition" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="above">Goes Above</SelectItem>
                                        <SelectItem value="below">Falls Below</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="threshold" className="text-right">Threshold</Label>
                                <Input id="threshold" type="number" className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                        <Button type="submit">Create Rule</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Status</TableHead>
                            <TableHead>Metric</TableHead>
                            <TableHead>Condition</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {model.alerts.map(alert => {
                             const { icon: Icon, color, bgColor } = getStatusInfo(alert.status);
                            return (
                                <TableRow key={alert.id}>
                                    <TableCell>
                                        <Badge variant="outline" className={cn("text-xs", bgColor, color, `border-current`)}>
                                            <Icon className={cn("mr-1.5 h-3.5 w-3.5", color)} />
                                            {alert.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-medium">{alert.metric}</TableCell>
                                    <TableCell>Falls below {alert.threshold}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">Edit</Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                         {model.alerts.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                    No alerts configured for this model.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
