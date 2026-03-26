import { useDashboardFetch } from './useDashboardFetch.ts';
import type { DashboardContentItem } from './types.ts';

export function useRecentContent() {
    return useDashboardFetch<DashboardContentItem[]>('recent-content');
}
