import {
    Card,
    CardHeader,
    List,
    ListItemButton,
    ListItemText,
    Chip,
    Skeleton,
    Typography,
} from '@mui/material';
import { useTranslate } from 'react-admin';
import { useNavigate } from 'react-router-dom';
import { usePsychedSchemaContext } from '@psychedcms/admin-core';
import { useContentCounts } from '../hooks/useContentCounts.ts';

export function ContentStatsWidget() {
    const translate = useTranslate();
    const navigate = useNavigate();
    const { schema } = usePsychedSchemaContext();
    const { data, loading } = useContentCounts();

    const resolveResourceSlug = (esContentType: string): string => {
        if (!schema) return esContentType + 's';
        for (const [slug, res] of schema.resources.entries()) {
            if (res.contentType && res.contentType.singularName.toLowerCase().replace(/\s+/g, '') === esContentType) {
                return slug;
            }
        }
        return esContentType + 's';
    };

    if (loading) {
        return (
            <Card>
                <CardHeader title={translate('dashboard.contentStats')} />
                <List dense>
                    {Array.from({ length: 4 }).map((_, i) => (
                        <ListItemButton key={i}>
                            <ListItemText primary={<Skeleton width={120} />} secondary={<Skeleton width={40} />} />
                        </ListItemButton>
                    ))}
                </List>
            </Card>
        );
    }

    if (!data || data.length === 0) {
        return (
            <Card>
                <CardHeader title={translate('dashboard.contentStats')} />
                <Typography sx={{ p: 2 }} color="text.secondary">
                    {translate('dashboard.noContent')}
                </Typography>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader title={translate('dashboard.contentStats')} />
            <List dense>
                {data.map((item) => {
                    const resourceSlug = resolveResourceSlug(item.contentType);
                    return (
                        <ListItemButton
                            key={item.contentType}
                            onClick={() => navigate(`/${resourceSlug}`)}
                        >
                            <ListItemText
                                primary={translate(`resources.${resourceSlug}.name`, {
                                    _: item.contentType,
                                })}
                            />
                            <Chip label={item.count} size="small" variant="outlined" />
                        </ListItemButton>
                    );
                })}
            </List>
        </Card>
    );
}
