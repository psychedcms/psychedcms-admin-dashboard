import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslate } from 'react-admin';
import { useNavigate } from 'react-router-dom';
import { usePsychedSchemaContext } from '@psychedcms/admin-core';

export function QuickCreateWidget() {
    const { schema } = usePsychedSchemaContext();
    const translate = useTranslate();
    const navigate = useNavigate();

    if (!schema) return null;

    const dashboardResources = Array.from(schema.resources.entries())
        .filter(([, res]) => {
            if (!res.contentType) return false;
            if (!res.contentType.showOnDashboard) return false;
            if (res.contentType.singleton) return false;
            if (res.contentType.aggregateRoot) return false;
            return true;
        })
        .sort(([, a], [, b]) => (a.contentType?.priority ?? 0) - (b.contentType?.priority ?? 0));

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {dashboardResources.map(([slug, res]) => (
                <Button
                    key={slug}
                    variant="outlined"
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={() => navigate(`/${slug}/create`)}
                >
                    {translate(`resources.${slug}.name`, {
                        _: res.contentType?.singularName ?? slug,
                    })}
                </Button>
            ))}
        </Box>
    );
}
