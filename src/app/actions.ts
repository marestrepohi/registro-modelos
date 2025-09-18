// src/app/actions.ts
'use server';

import { suggestRelevantVisualizations } from '@/ai/flows/suggest-relevant-visualizations';
import type { SuggestRelevantVisualizationsInput } from '@/ai/flows/suggest-relevant-visualizations';

export async function getVisualizationSuggestions(input: SuggestRelevantVisualizationsInput) {
  try {
    const result = await suggestRelevantVisualizations(input);
    if (result && result.suggestedVisualizations) {
        return { success: true, suggestions: result.suggestedVisualizations };
    }
    return { success: false, error: 'Received an empty response from AI.' };
  } catch (error) {
    console.error('Error getting visualization suggestions:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `Failed to get suggestions: ${errorMessage}` };
  }
}
