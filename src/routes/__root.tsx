import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";

// Types
import type { QueryClient } from '@tanstack/react-query';

// Styles
import appCss from '../styles.css?url'


interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Cupid Dart' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },

      // Google Fonts
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?' +
          'family=Germania+One&' +
          'family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&' +
          'family=Geist:wght@100..900&' +
          'display=swap',
      },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackDevtools config={{ position: 'bottom-right' }}
          plugins={[{ name: 'Tanstack Router', render: <TanStackRouterDevtoolsPanel /> }, TanStackQueryDevtools]} />
        <Scripts />
      </body>
    </html>
  )
}
