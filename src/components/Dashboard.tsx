import { Box, Grid, Typography } from '@mui/material';
import { useTranslate, useGetIdentity } from 'react-admin';
import { QuickCreateWidget } from './QuickCreateWidget.tsx';
import { RecentContentWidget } from './RecentContentWidget.tsx';
import { MyContentWidget } from './MyContentWidget.tsx';
import { ContentStatsWidget } from './ContentStatsWidget.tsx';
import { StatusOverviewWidget } from './StatusOverviewWidget.tsx';

export function Dashboard() {
    const translate = useTranslate();
    const { identity } = useGetIdentity();

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                {translate('dashboard.welcome', { name: identity?.fullName ?? '' })}
            </Typography>
            <QuickCreateWidget />
            <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <RecentContentWidget />
                    <Box sx={{ mt: 3 }}>
                        <MyContentWidget />
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <ContentStatsWidget />
                    <Box sx={{ mt: 3 }}>
                        <StatusOverviewWidget />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
