import { getModelById } from '@/lib/data';
import ModelDetailTabs from './_components/model-detail-tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CirclePlay, Upload, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

function getStatusColor(status: string) {
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

export default async function ModelDetailPage({ params }: { params: { id: string } }) {
    const model = await getModelById(params.id);

    if (!model) {
        return (
            <div className="text-center">
                <h1 className="text-2xl font-bold">Model not found</h1>
                <p className="text-muted-foreground">The model with ID "{params.id}" does not exist.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-4">
                        <h1 className="text-3xl font-bold tracking-tight">{model.name}</h1>
                        <Badge className={cn("text-sm", getStatusColor(model.status))}>{model.status}</Badge>
                    </div>
                    <p className="text-muted-foreground">{model.purpose}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <CirclePlay className="mr-2 h-4 w-4" />
                        Retrain
                    </Button>
                    <Button>
                        <Upload className="mr-2 h-4 w-4" />
                        Deploy
                    </Button>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Archive Model</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">Delete Model</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            
            <ModelDetailTabs model={model} />
        </div>
    );
}
