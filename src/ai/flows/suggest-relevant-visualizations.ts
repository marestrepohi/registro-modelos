// src/ai/flows/suggest-relevant-visualizations.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow that suggests relevant visualizations
 * for model performance and behavior based on AI analysis.
 *
 * - suggestRelevantVisualizations - The main function to suggest visualizations.
 * - SuggestRelevantVisualizationsInput - The input type for the function.
 * - SuggestRelevantVisualizationsOutput - The output type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SuggestRelevantVisualizationsInputSchema = z.object({
  modelName: z.string().describe('The name of the model.'),
  metricsData: z.string().describe('A JSON string containing the model metrics data.'),
  modelType: z.string().describe('The type of the model (e.g., classification, regression).'),
});
export type SuggestRelevantVisualizationsInput = z.infer<typeof SuggestRelevantVisualizationsInputSchema>;

const SuggestRelevantVisualizationsOutputSchema = z.object({
  suggestedVisualizations: z.array(
    z.string().describe('A list of suggested visualization types (e.g., bar chart, scatter plot).')
  ).describe('An array of suggested visualization types based on the model metrics.'),
});
export type SuggestRelevantVisualizationsOutput = z.infer<typeof SuggestRelevantVisualizationsOutputSchema>;

export async function suggestRelevantVisualizations(input: SuggestRelevantVisualizationsInput): Promise<SuggestRelevantVisualizationsOutput> {
  return suggestRelevantVisualizationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRelevantVisualizationsPrompt',
  input: { schema: SuggestRelevantVisualizationsInputSchema },
  output: { schema: SuggestRelevantVisualizationsOutputSchema },
  prompt: `You are an AI assistant that suggests relevant data visualizations based on model metrics and type.

  Given the following information about a machine learning model, suggest a list of appropriate visualization types that would be helpful for understanding its performance and behavior.

  Model Name: {{{modelName}}}
  Model Type: {{{modelType}}}
  Metrics Data: {{{metricsData}}}

  Consider the model type and the nature of the metrics when suggesting visualizations. For example, for a classification model, a confusion matrix or ROC curve might be appropriate. For a regression model, a scatter plot of predicted vs. actual values might be useful.

  Provide your response as a JSON array of visualization types.
  `
});

const suggestRelevantVisualizationsFlow = ai.defineFlow(
  {
    name: 'suggestRelevantVisualizationsFlow',
    inputSchema: SuggestRelevantVisualizationsInputSchema,
    outputSchema: SuggestRelevantVisualizationsOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
