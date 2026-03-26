import { registerPlugin } from '@psychedcms/admin-core';
import { Dashboard } from './components/Dashboard.tsx';
import { frMessages } from './i18n/fr.ts';
import { enMessages } from './i18n/en.ts';

registerPlugin({
    dashboard: Dashboard,
    i18nMessages: { fr: frMessages, en: enMessages },
});
