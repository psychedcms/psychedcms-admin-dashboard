import { useTranslate } from 'react-admin';
import { useMyContent } from '../hooks/useMyContent.ts';
import { ContentTable } from './ContentTable.tsx';

export function MyContentWidget() {
    const translate = useTranslate();
    const { data, loading } = useMyContent();

    return (
        <ContentTable
            title={translate('dashboard.myContent')}
            data={data}
            loading={loading}
        />
    );
}
