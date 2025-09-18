import type { Model } from './types';

export const models: Model[] = [
  {
    id: 'fraud-detection-v2',
    name: 'Fraud Detection V2',
    type: 'Classification',
    version: '2.1.0',
    author: 'Data Science Team',
    createdAt: '2023-10-26',
    purpose: 'To detect fraudulent transactions in real-time.',
    status: 'Deployed',
    metrics: [
      { name: 'Accuracy', value: 0.98, change: '+0.2%' },
      { name: 'Precision', value: 0.95, change: '-0.1%' },
      { name: 'Recall', value: 0.97, change: '+0.5%' },
      { name: 'F1 Score', value: 0.96, change: '+0.1%' },
    ],
    governance: {
      dataSources: ['transactions_db', 'user_activity_log'],
      dataLineage: 'Raw transactions -> Feature Engineering -> Model',
      compliance: [
        { framework: 'GDPR', status: 'Compliant' },
        { framework: 'PCI DSS', status: 'Compliant' },
      ],
    },
    alerts: [
      { id: 'alert-1', metric: 'Accuracy', threshold: 0.9, condition: 'below', status: 'Active' },
      { id: 'alert-2', metric: 'Precision', threshold: 0.85, condition: 'below', status: 'Triggered', triggeredAt: '2023-11-15T10:30:00Z' },
    ],
  },
  {
    id: 'customer-churn-prediction',
    name: 'Customer Churn Prediction',
    type: 'Classification',
    version: '1.0.0',
    author: 'Marketing Analytics',
    createdAt: '2023-09-15',
    purpose: 'Predicts which customers are likely to churn.',
    status: 'Deployed',
    metrics: [
      { name: 'Accuracy', value: 0.89, change: '+1.0%' },
      { name: 'Precision', value: 0.85 },
      { name: 'Recall', value: 0.91 },
      { name: 'AUC', value: 0.92, change: '+0.5%' },
    ],
    governance: {
      dataSources: ['crm_data', 'subscription_history'],
      dataLineage: 'CRM & Subscription Data -> Preprocessing -> Model',
      compliance: [
        { framework: 'GDPR', status: 'Compliant' },
      ],
    },
    alerts: [
       { id: 'alert-3', metric: 'Recall', threshold: 0.88, condition: 'below', status: 'Active' },
    ],
  },
  {
    id: 'house-price-estimator',
    name: 'House Price Estimator',
    type: 'Regression',
    version: '3.5.2',
    author: 'Real Estate Team',
    createdAt: '2024-01-20',
    purpose: 'Estimates house prices based on features.',
    status: 'Training',
    metrics: [
      { name: 'RMSE', value: 25000, change: '-$500' },
      { name: 'MAE', value: 18000, change: '-$250' },
      { name: 'R-squared', value: 0.91, change: '+0.01' },
    ],
    governance: {
      dataSources: ['zillow_api', 'local_listings_csv'],
      dataLineage: 'External & Internal Listings -> Data Cleaning -> Model',
      compliance: [],
    },
    alerts: [],
  },
  {
    id: 'product-recommender',
    name: 'Product Recommender',
    type: 'Clustering',
    version: '0.9.0',
    author: 'E-commerce Division',
    createdAt: '2023-12-01',
    purpose: 'Provides product recommendations to users.',
    status: 'Archived',
    metrics: [
      { name: 'Silhouette Score', value: 0.78 },
      { name: 'Latency', value: '150ms' },
    ],
    governance: {
      dataSources: ['user_browsing_history', 'purchase_data'],
      dataLineage: 'User Data -> Collaborative Filtering -> Model',
      compliance: [
        { framework: 'GDPR', status: 'In-Review' },
      ],
    },
    alerts: [],
  },
];

export async function getModels(): Promise<Model[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return models;
}

export async function getModelById(id: string): Promise<Model | undefined> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return models.find(model => model.id === id);
}
