import { getModels } from '@/lib/data';
import { ModelCard } from '@/components/model-card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
  const models = await getModels();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Models</h1>
        <Button asChild>
          <Link href="/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Model
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {models.map(model => (
          <ModelCard key={model.id} model={model} />
        ))}
      </div>
    </div>
  );
}
