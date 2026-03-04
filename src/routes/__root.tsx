import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { FluentProvider, webLightTheme } from '@fluentui/react-components'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack FluentUI',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        href: 'https://tanstack.com/favicon.ico',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Silkscreen:wght@400&display=swap',
      }
    ],
  }),
  shellComponent: RootDocument,
})

const customTheme = {
  ...webLightTheme,
  colorBrandBackground: '#FF5640',
  colorBrandBackgroundHover: '#D4403B',
  colorBrandBackgroundPressed: '#FF5641',
  colorBrandForeground1: '#0F6CBD',
  colorBrandForegroundLink: '#0F6CBD',
  colorBrandStroke1: '#0F6CBD',
  fontFamilyBase: 'Silkscreen, cursive, sans-serif',
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
          <FluentProvider theme={customTheme}>
            {children}
          </FluentProvider>
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
          <Scripts />
      </body>
    </html>
  )
}
