export interface DashboardContentItem {
    id: string;
    contentType: string;
    status: string;
    title: string;
    slug: string;
    updatedAt: string | null;
    createdAt: string | null;
    author: { id: string; username: string } | null;
}
