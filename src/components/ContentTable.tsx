import {
    Card,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Skeleton,
    Typography,
} from '@mui/material';
import { useTranslate } from 'react-admin';
import { useNavigate } from 'react-router-dom';
import { usePsychedSchemaContext } from '@psychedcms/admin-core';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale/fr';
import type { DashboardContentItem } from '../hooks/types.ts';

const STATUS_COLORS: Record<string, 'success' | 'default' | 'warning' | 'info'> = {
    published: 'success',
    draft: 'default',
    held: 'warning',
    timed: 'info',
};

interface ContentTableProps {
    title: string;
    data: DashboardContentItem[] | null;
    loading: boolean;
}

function buildContentTypeMap(schema: ReturnType<typeof usePsychedSchemaContext>['schema']): Map<string, string> {
    const map = new Map<string, string>();
    if (!schema) return map;
    for (const [slug, res] of schema.resources.entries()) {
        if (res.contentType) {
            // ES _content_type is the lowercase class short name without spaces (e.g. "eventreport")
            const esKey = res.contentType.singularName.toLowerCase().replace(/\s+/g, '');
            map.set(esKey, slug);
        }
    }
    return map;
}

export function ContentTable({ title, data, loading }: ContentTableProps) {
    const translate = useTranslate();
    const navigate = useNavigate();
    const { schema } = usePsychedSchemaContext();

    const contentTypeMap = buildContentTypeMap(schema);

    const resolveResourceSlug = (esContentType: string): string => {
        return contentTypeMap.get(esContentType) ?? esContentType + 's';
    };

    if (loading) {
        return (
            <Card>
                <CardHeader title={title} />
                <TableContainer>
                    <Table size="small">
                        <TableBody>
                            {Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton /></TableCell>
                                    <TableCell><Skeleton width={60} /></TableCell>
                                    <TableCell><Skeleton width={60} /></TableCell>
                                    <TableCell><Skeleton width={80} /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        );
    }

    if (!data || data.length === 0) {
        return (
            <Card>
                <CardHeader title={title} />
                <Typography sx={{ p: 2 }} color="text.secondary">
                    {translate('dashboard.noContent')}
                </Typography>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader title={title} />
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>{translate('dashboard.title')}</TableCell>
                            <TableCell>{translate('dashboard.type')}</TableCell>
                            <TableCell>{translate('dashboard.status')}</TableCell>
                            <TableCell>{translate('dashboard.date')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => {
                            const resourceSlug = resolveResourceSlug(item.contentType);
                            return (
                                <TableRow
                                    key={item.id}
                                    hover
                                    sx={{ cursor: 'pointer' }}
                                    onClick={() => navigate(`/${resourceSlug}/${encodeURIComponent(item.id)}`)}
                                >
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={translate(`resources.${resourceSlug}.name`, {
                                                _: item.contentType,
                                            })}
                                            size="small"
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={translate(`dashboard.${item.status}`, { _: item.status })}
                                            size="small"
                                            color={STATUS_COLORS[item.status] ?? 'default'}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {item.updatedAt
                                            ? formatDistanceToNow(new Date(item.updatedAt), {
                                                  addSuffix: true,
                                                  locale: fr,
                                              })
                                            : '—'}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
}
