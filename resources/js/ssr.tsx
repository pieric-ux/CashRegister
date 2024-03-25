import ReactDOMServer from 'react-dom/server';
import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { route } from '../../vendor/tightenco/ziggy';
import { type RouteName } from 'ziggy-js';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) =>
            resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
        setup: ({ App, props }) => {
            // @ts-expect-error : Laravel Config
            global.route<RouteName> = (name, params, absolute) =>
                route(name, params, absolute, {
                    // @ts-expect-error : Laravel Config
                    ...page.props.ziggy,
                    // @ts-expect-error : Laravel Config
                    location: new URL(page.props.ziggy.location),
                });

            return <App {...props} />;
        },
    }),
);
