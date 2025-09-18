import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeForm } from './_components/code-form';
import { GuidedForm } from './_components/guided-form';

export default function CreateModelPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Create a New Model</h1>
        <p className="text-muted-foreground">
          Choose your preferred method to register a new machine learning model.
        </p>
      </div>

      <Tabs defaultValue="form" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="form">Guided Form</TabsTrigger>
          <TabsTrigger value="code">From Code</TabsTrigger>
        </TabsList>
        <TabsContent value="form">
          <GuidedForm />
        </TabsContent>
        <TabsContent value="code">
          <CodeForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
