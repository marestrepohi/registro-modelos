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
  registeredModelName: z.string().min(3, 'Registered model name is required.'),
});

const placeholderCode = `
# Generated Python code for MLflow model registration will appear here.
`;

export function CodeForm() {
  const [generatedCode, setGeneratedCode] = useState(placeholderCode);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      registeredModelName: 'sk-learn-random-forest-reg-model',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const code = `
from sklearn.datasets import make_regression
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import train_test_split
import mlflow
import mlflow.sklearn

# Note: Ensure your MLflow tracking server is running.
# You can start it with: mlflow server --host 127.0.0.1 --port 8080

# Set the tracking URI if your server is not on localhost
# mlflow.set_tracking_uri("http://127.0.0.1:8080")

print("Starting MLflow run...")

with mlflow.start_run() as run:
    # --- 1. Data Preparation ---
    X, y = make_regression(n_features=4, n_informative=2, random_state=0, shuffle=False)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    # --- 2. Model Training ---
    params = {"max_depth": 2, "random_state": 42}
    model = RandomForestRegressor(**params)
    model.fit(X_train, y_train)

    # --- 3. Logging to MLflow ---
    # Log parameters
    mlflow.log_params(params)

    # Log metrics
    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    mlflow.log_metrics({"mse": mse})
    print(f"Logged MSE: {mse}")

    # --- 4. Log and Register Model ---
    print("Logging and registering the model to MLflow...")
    mlflow.sklearn.log_model(
        sk_model=model,
        artifact_path="sklearn-model", # This is a folder name within the run artifacts
        input_example=X_train,
        registered_model_name="${values.registeredModelName}",
    )

    print("\\nSuccessfully registered model '${values.registeredModelName}'.")
    print(f"Run ID: {run.info.run_id}")

print("\\nScript finished. Check your MLflow UI for the new run and registered model.")
    `;
    setGeneratedCode(code.trim());
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create and Register with MLflow</CardTitle>
        <CardDescription>
          Generate a Python script to train a model and register it with MLflow.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="registeredModelName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registered Model Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., sk-learn-random-forest-reg-model" {...field} />
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
            <FormLabel>Generated MLflow Registration Code</FormLabel>
            <Textarea 
                value={generatedCode}
                readOnly
                placeholder="Your generated Python script will appear here..." 
                className="min-h-[400px] font-code text-sm bg-muted" 
            />
        </div>

        <div className="flex justify-end">
          <Button disabled>
            <UploadCloud className="mr-2 h-4 w-4" />
            Register from Script (Coming Soon)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
