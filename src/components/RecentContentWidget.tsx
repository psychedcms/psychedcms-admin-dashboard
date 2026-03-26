import { useTranslate } from 'react-admin';
import { useRecentContent } from '../hooks/useRecentContent.ts';
import { ContentTable } from './ContentTable.tsx';

export function RecentContentWidget() {
    const translate = useTranslate();
    const { data, loading } = useRecentContent();

    return (
        <ContentTable
            title={translate('dashboard.recentContent')}
            data={data}
            loading={loading}
        />
    );
}
