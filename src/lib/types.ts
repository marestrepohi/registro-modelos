export interface Metric {
  name: string;
  value: number | string;
  change?: string;
}

export interface GovernanceInfo {
  dataSources: string[];
  dataLineage: string;
  compliance: {
    framework: string;
    status: 'Compliant' | 'Non-Compliant' | 'In-Review';
  }[];
}

export interface Alert {
  id: string;
  metric: string;
  threshold: number;
  condition: 'above' | 'below';
  status: 'Active' | 'Triggered' | 'Resolved';
  triggeredAt?: string;
}

export interface Model {
  id: string;
  name: string;
  type: 'Classification' | 'Regression' | 'Clustering';
  version: string;
  author: string;
  createdAt: string;
  purpose: string;
  status: 'Training' | 'Deployed' | 'Archived' | 'Failed';
  metrics: Metric[];
  governance: GovernanceInfo;
  alerts: Alert[];
}
