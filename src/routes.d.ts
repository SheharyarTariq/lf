declare module '@/routes' {
    import { ReactElement } from 'react';

    type Page = {
        icon: ReactElement;
        name: string;
        path: string;
        element: ReactElement;
    };

    type Route = {
        layout: string;  // The layout type (e.g., "dashboard")
        pages: Page[];   // Array of pages under this layout
    };

    const routes: Route[];

    export default routes;
}
