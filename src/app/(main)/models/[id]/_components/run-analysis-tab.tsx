'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChartComponent } from "@/components/charts/line-chart";
import { File, GitCommit, Tag, BookOpen, FileJson } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data representing a single MLflow run, inspired by the mlruns structure.
const runData = {
  id: 'bc6dc2a4f38d47b4b0c99d154bbc77ad',
  name: 'graceful-elk-962',
  startTime: '2024-05-21T10:30:00Z',
  endTime: '2024-05-21T10:32:15Z',
  parameters: [
    { key: 'max_depth', value: '2' },
    { key: 'random_state', value: '42' },
  ],
  metrics: [
    { key: 'mse', value: 0.035, timestamp: '2024-05-21T10:31:55Z' },
  ],
  tags: [
    { key: 'mlflow.user', value: 'studio-user' },
    { key: 'mlflow.source.name', value: 'register_model.py' },
    { key: 'mlflow.source.type', value: 'LOCAL' },
  ],
  artifacts: [
    'python_env.yaml',
    'requirements.txt',
    'MLmodel',
    'model.pkl',
    'input_example.json',
    'conda.yaml',
  ],
  inputExample: {
    "columns": ["feature_1", "feature_2", "feature_3", "feature_4"],
    "data": [
      [0.2, 0.8, 0.5, 0.1],
      [0.9, 0.1, 0.3, 0.7],
      [0.5, 0.5, 0.9, 0.2]
    ]
  }
};

export function RunAnalysisTab() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                         <GitCommit className="h-5 w-5 text-muted-foreground" />
                        <CardTitle>Run Details</CardTitle>
                    </div>
                    <CardDescription>
                        Displaying analysis for run: <span className="font-mono text-primary">{runData.name} ({runData.id.slice(0,12)}...)</span>
                    </CardDescription>
                </CardHeader>
                 <CardContent>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {runData.metrics.map(metric => (
                             <Card key={metric.key}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium uppercase">{metric.key}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{metric.value.toFixed(4)}</div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                     <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-muted-foreground" />
                                <CardTitle>Training Summary</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground space-y-2">
                            <p>
                                This run trained a <span className="font-semibold text-foreground">RandomForestRegressor</span> model using <span className="font-semibold text-foreground">scikit-learn</span>.
                                The process involved several key steps managed by MLflow:
                            </p>
                            <ol className="list-decimal list-inside space-y-1 pl-2">
                                <li><strong>Data Preparation:</strong> A synthetic regression dataset was generated and split into training and testing sets.</li>
                                <li><strong>Model Training:</strong> A Random Forest model was initialized with parameters <code className="bg-muted px-1 py-0.5 rounded font-mono text-xs">max_depth=2</code> and <code className="bg-muted px-1 py-0.5 rounded font-mono text-xs">random_state=42</code>, and then fitted to the training data.</li>
                                <li><strong>Logging:</strong> Key hyperparameters and the resulting Mean Squared Error (MSE) metric were logged to the MLflow tracking server.</li>
                                <li><strong>Model Registration:</strong> The trained model was logged and registered with the MLflow Model Registry, including an input example to define the model's signature.</li>
                            </ol>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Metric History (MSE)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <LineChartComponent />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                             <CardTitle>Parameters</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Parameter</TableHead>
                                        <TableHead>Value</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {runData.parameters.map(param => (
                                        <TableRow key={param.key}>
                                            <TableCell className="font-medium">{param.key}</TableCell>
                                            <TableCell>{param.value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <File className="h-5 w-5 text-muted-foreground" />
                                <CardTitle>Artifacts</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                             <ul className="space-y-2 text-sm">
                                {runData.artifacts.map(artifact => (
                                    <li key={artifact} className="flex items-center gap-2 font-mono p-2 bg-muted rounded-md text-muted-foreground">
                                        <File className="h-4 w-4" />
                                        {artifact}
                                    </li>
                                ))}
                            </ul>
                            <Accordion type="single" collapsible className="w-full mt-4">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>
                                        <div className="flex items-center gap-2 font-mono text-sm">
                                            <FileJson className="h-4 w-4" /> Expand input_example.json
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <ScrollArea className="h-48 w-full bg-muted rounded-md">
                                            <pre className="p-4 text-xs font-mono">{JSON.stringify(runData.inputExample, null, 2)}</pre>
                                        </ScrollArea>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                             <div className="flex items-center gap-2">
                                <Tag className="h-5 w-5 text-muted-foreground" />
                                <CardTitle>Tags</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Key</TableHead>
                                        <TableHead>Value</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {runData.tags.map(tag => (
                                        <TableRow key={tag.key}>
                                            <TableCell className="font-medium">{tag.key}</TableCell>
                                            <TableCell>{tag.value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

    