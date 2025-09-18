'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { UploadCloud } from "lucide-react";

// This schema is now based on the fields from ModelProperties.json
const formSchema = z.object({
  modelName: z.string().min(3, "Model name must be at least 3 characters."),
  type: z.enum(["Classification", "Regression", "Clustering"]),
  version: z.string().min(1, "Version is required."),
  author: z.string().min(2, "Author name is required."),
  purpose: z.string().min(10, "Purpose must be at least 10 characters."),
});

export function GuidedForm() {
    const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      modelName: "",
      version: "1.0.0",
      author: "",
      purpose: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
        title: "Model Registration Submitted!",
        description: "Your new model is being processed.",
    });
    form.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create with Form</CardTitle>
        <CardDescription>
          Fill out the details below to register your new model. This guided process will help ensure all necessary information is provided.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="modelName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Customer Churn Predictor" {...field} />
                  </FormControl>
                  <FormDescription>A unique and descriptive name for your model.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a model type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Classification">Classification</SelectItem>
                      <SelectItem value="Regression">Regression</SelectItem>
                      <SelectItem value="Clustering">Clustering</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>The category of machine learning problem this model solves.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="version"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Version</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 1.0.0" {...field} />
                  </FormControl>
                  <FormDescription>The version of the model.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="purpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purpose</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the business case and intended use of this model..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A clear description of what this model is for.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author / Team</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Data Science Team" {...field} />
                  </FormControl>
                  <FormDescription>The person or team responsible for this model.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
                <Button type="submit">
                    <UploadCloud className="mr-2 h-4 w-4" />
                    Register Model
                </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
