import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Model } from '@/lib/types';
import { GitBranch, BrainCircuit, Users, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

function getStatusColor(status: Model['status']) {
  switch (status) {
    case 'Deployed':
      return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-400/20';
    case 'Training':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-400/20';
    case 'Failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-400/20';
    case 'Archived':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700/20 dark:text-gray-400 border-gray-200 dark:border-gray-500/20';
    default:
      return 'bg-secondary text-secondary-foreground';
  }
}

function getMetricIcon(change?: string) {
    if (!change) return null;
    if (change.startsWith('+')) return <ArrowUp className="h-4 w-4 text-green-500" />;
    if (change.startsWith('-')) return <ArrowDown className="h-4 w-4 text-red-500" />;
    return null;
}

export function ModelCard({ model }: { model: Model }) {
  const primaryMetric = model.metrics[0];

  return (
    <Link href={`/models/${model.id}`}>
      <Card className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{model.name}</CardTitle>
            <Badge className={cn("text-xs", getStatusColor(model.status))}>
              {model.status}
            </Badge>
          </div>
          <CardDescription>{model.purpose}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow space-y-4">
          <div className="flex items-center text-sm text-muted-foreground gap-4">
            <span className="flex items-center gap-1.5"><BrainCircuit className="w-4 h-4" /> {model.type}</span>
            <span className="flex items-center gap-1.5"><GitBranch className="w-4 h-4" /> v{model.version}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
             <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {model.author}</span>
          </div>
        </CardContent>
        <CardFooter>
          {primaryMetric && (
            <div className="text-sm">
                <span className="text-muted-foreground">{primaryMetric.name}: </span>
                <strong className="font-semibold">{primaryMetric.value}</strong>
                {primaryMetric.change && (
                     <span className="inline-flex items-center gap-1 ml-2 text-xs">
                        {getMetricIcon(primaryMetric.change)}
                        {primaryMetric.change}
                    </span>
                )}
            </div>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
