import { useState, useEffect } from 'react';
import { useLocaleState, useLogout } from 'react-admin';
import { usePsychedSchemaContext } from '@psychedcms/admin-core';

function authHeaders(): Record<string, string> {
    const token = localStorage.getItem('token');
    return {
        Accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
}

export function useDashboardFetch<T>(endpoint: string): {
    data: T | null;
    loading: boolean;
    error: Error | null;
} {
    const { entrypoint } = usePsychedSchemaContext();
    const [locale] = useLocaleState();
    const logout = useLogout();
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!entrypoint) return;

        let cancelled = false;
        setLoading(true);

        fetch(`${entrypoint}/dashboard/${endpoint}?locale=${locale}`, {
            headers: authHeaders(),
        })
            .then((response) => {
                if (response.status === 401) {
                    logout();
                    return;
                }
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.json();
            })
            .then((json?: T) => {
                if (!cancelled && json !== undefined) {
                    setData(json);
                    setError(null);
                }
            })
            .catch((err: unknown) => {
                if (!cancelled) {
                    setError(err instanceof Error ? err : new Error(String(err)));
                }
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [entrypoint, locale, endpoint, logout]);

    return { data, loading, error };
}
