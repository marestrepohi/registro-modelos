'use client';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { UploadCloud } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Define CustomProperty schema
const customPropertySchema = z.object({ name: z.string(), value: z.string(), type: z.string() });
// This schema is now based on the fields from ModelProperties.json
const formSchema = z.object({
  id: z.string().uuid("Must be a valid UUID"),
  name: z.string().min(1, "Name is required."),
  modelVersionName: z.string().min(1, "Version is required."),
  description: z.string().min(1, "Description is required."),
  scoreCodeType: z.string().min(1),
  algorithm: z.string().min(1),
  function: z.string().min(1),
  modeler: z.string().min(1),
  modelType: z.string().min(1),
  trainCodeType: z.string().min(1),
  targetVariable: z.string().min(1),
  targetEvent: z.string().min(1),
  targetLevel: z.string().min(1),
  tool: z.string().min(1),
  toolVersion: z.string().min(1),
  externalUrl: z.string().url("Must be a valid URL"),
  costPerCall: z.string(),
  immutable: z.boolean(),
  createdBy: z.string().min(1),
  creationTimeStamp: z.string().min(1),
  modifiedBy: z.string().min(1),
  modifiedTimeStamp: z.string().min(1),
  customProperties: z.array(customPropertySchema).optional(),
});

export function GuidedForm() {
    const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
      modelVersionName: "1.0",
      description: "",
      scoreCodeType: "python",
      algorithm: "",
      function: "classification",
      modeler: "",
      modelType: "",
      trainCodeType: "",
      targetVariable: "",
      targetEvent: "",
      targetLevel: "binary",
      tool: "Python 3",
      toolVersion: "3.8",
      externalUrl: "",
      costPerCall: "0",
      immutable: false,
      createdBy: "",
      creationTimeStamp: new Date().toISOString(),
      modifiedBy: "",
      modifiedTimeStamp: new Date().toISOString(),
      customProperties: [],
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
          Fill out all the details below to register your new model.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* ID */}
            <FormField control={form.control} name="id" render={({ field }) => (
              <FormItem>
                <FormLabel>Model ID</FormLabel>
                <FormControl>
                  <Input placeholder="UUID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>
            {/* Name */}
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}/>
            {/* Version */}
            <FormField control={form.control} name="modelVersionName" render={({ field }) => (
              <FormItem>
                <FormLabel>Version</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}/>
            {/* Description */}
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl><Textarea className="resize-none" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}/>
            {/* Algorithm */}
            <FormField control={form.control} name="algorithm" render={({ field }) => (
              <FormItem>
                <FormLabel>Algorithm</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}/>
            {/* Function */}
            <FormField control={form.control} name="function" render={({ field }) => (
              <FormItem>
                <FormLabel>Function</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="classification">Classification</SelectItem>
                    <SelectItem value="regression">Regression</SelectItem>
                    <SelectItem value="clustering">Clustering</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}/>
            {/* Immutable */}
            <FormField control={form.control} name="immutable" render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2">
                <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                <FormLabel>Immutable</FormLabel>
                <FormMessage />
              </FormItem>
            )}/>
            {/* Custom Properties as JSON */}
            <FormField control={form.control} name="customProperties" render={({ field }) => (
              <FormItem>
                <FormLabel>Custom Properties (JSON)</FormLabel>
                <FormControl><Textarea className="font-code" placeholder='[ { "name": "key", "value": "val", "type": "string" } ]' {...field} /></FormControl>
                <FormDescription>Enter as JSON array of objects.</FormDescription>
                <FormMessage />
              </FormItem>
            )}/>
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
