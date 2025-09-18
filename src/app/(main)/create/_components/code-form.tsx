'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Code, UploadCloud } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const formSchema = z.object({
  library: z.enum(['scikit-learn', 'tensorflow', 'pytorch']),
  modelType: z.string().min(1, 'Please select a model type.'),
  features: z.string().min(1, 'Please enter feature names.'),
  target: z.string().min(1, 'Please enter the target variable name.'),
});

const placeholderCode = `
# Generated Python code will appear here
# based on your selections above.

def example_function():
    pass
`;

export function CodeForm() {
  const [generatedCode, setGeneratedCode] = useState(placeholderCode);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      features: '',
      target: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const code = `
# Generated with Modelo Maestro
# Library: ${values.library}
# Model Type: ${values.modelType}

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load your data
# data = pd.read_csv('your_data.csv')

# Define features and target
features = [${values.features.split(',').map(f => `'${f.trim()}'`).join(', ')}]
target = '${values.target}'

# X = data[features]
# y = data[target]

# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize and train the model
# model = RandomForestClassifier(n_estimators=100, random_state=42)
# model.fit(X_train, y_train)

# Make predictions
# predictions = model.predict(X_test)

# Evaluate the model
# accuracy = accuracy_score(y_test, predictions)
# print(f"Model Accuracy: {accuracy}")

print("Code generated successfully. Fill in the data loading and execution steps.")
    `;
    setGeneratedCode(code.trim());
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create with Code</CardTitle>
        <CardDescription>
          Generate a Python script skeleton by filling out the options below.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="library"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ML Library</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a library" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="scikit-learn">Scikit-learn</SelectItem>
                      <SelectItem value="tensorflow" disabled>TensorFlow (coming soon)</SelectItem>
                      <SelectItem value="pytorch" disabled>PyTorch (coming soon)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="modelType"
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
                      <SelectItem value="RandomForestClassifier">Random Forest Classifier</SelectItem>
                      <SelectItem value="LinearRegression">Linear Regression</SelectItem>
                      <SelectItem value="KMeans">K-Means Clustering</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feature Names</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., age, income, city (comma-separated)" {...field} />
                  </FormControl>
                   <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="target"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Variable Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., churn_status" {...field} />
                  </FormControl>
                   <FormMessage />
                </FormItem>
              )}
            />
             <div className="flex justify-start">
                <Button type="submit" variant="outline">
                    <Code className="mr-2 h-4 w-4" />
                    Generate Code
                </Button>
            </div>
          </form>
        </Form>
        
        <div className="space-y-2">
            <FormLabel>Generated Code</FormLabel>
            <Textarea 
                value={generatedCode}
                readOnly
                placeholder="import sklearn..." 
                className="min-h-[400px] font-code text-sm bg-muted" 
            />
        </div>

        <div className="flex justify-end">
          <Button>
            <UploadCloud className="mr-2 h-4 w-4" />
            Register Model
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
