import {
    Card,
    CardHeader,
    List,
    ListItem,
    ListItemText,
    Chip,
    Skeleton,
    Typography,
} from '@mui/material';
import { useTranslate } from 'react-admin';
import { useStatusCounts } from '../hooks/useStatusCounts.ts';

const STATUS_COLORS: Record<string, 'success' | 'default' | 'warning' | 'info'> = {
    published: 'success',
    draft: 'default',
    held: 'warning',
    timed: 'info',
};

export function StatusOverviewWidget() {
    const translate = useTranslate();
    const { data, loading } = useStatusCounts();

    if (loading) {
        return (
            <Card>
                <CardHeader title={translate('dashboard.statusOverview')} />
                <List dense>
                    {Array.from({ length: 4 }).map((_, i) => (
                        <ListItem key={i}>
                            <ListItemText primary={<Skeleton width={100} />} />
                        </ListItem>
                    ))}
                </List>
            </Card>
        );
    }

    if (!data || data.length === 0) {
        return (
            <Card>
                <CardHeader title={translate('dashboard.statusOverview')} />
                <Typography sx={{ p: 2 }} color="text.secondary">
                    {translate('dashboard.noContent')}
                </Typography>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader title={translate('dashboard.statusOverview')} />
            <List dense>
                {data.map((item) => (
                    <ListItem key={item.status}>
                        <ListItemText
                            primary={
                                <Chip
                                    label={translate(`dashboard.${item.status}`, { _: item.status })}
                                    color={STATUS_COLORS[item.status] ?? 'default'}
                                    size="small"
                                />
                            }
                        />
                        <Chip label={item.count} size="small" variant="outlined" />
                    </ListItem>
                ))}
            </List>
        </Card>
    );
}
