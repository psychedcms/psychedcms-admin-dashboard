import { useDashboardFetch } from './useDashboardFetch.ts';
import type { DashboardContentItem } from './types.ts';

export function useMyContent() {
    return useDashboardFetch<DashboardContentItem[]>('my-content');
}
