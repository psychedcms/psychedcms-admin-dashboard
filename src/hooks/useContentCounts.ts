import { useDashboardFetch } from './useDashboardFetch.ts';

export interface ContentCount {
    contentType: string;
    count: number;
}

export function useContentCounts() {
    return useDashboardFetch<ContentCount[]>('content-counts');
}
