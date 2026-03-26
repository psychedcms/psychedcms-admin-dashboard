import { useDashboardFetch } from './useDashboardFetch.ts';

export interface StatusCount {
    status: string;
    count: number;
}

export function useStatusCounts() {
    return useDashboardFetch<StatusCount[]>('status-counts');
}
