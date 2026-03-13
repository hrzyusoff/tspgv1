import { defineConfig } from 'vite'
import path from 'node:path'
import { devtools } from '@tanstack/devtools-vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import netlify from '@netlify/vite-plugin-tanstack-start'

const config = defineConfig({
  plugins: [
    devtools(),
    netlify(),
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    tanstackStart(),
    viteReact(),
  ],
  ssr: {
    resolve: {
      conditions: ['import', 'module', 'browser', 'default'],
    },
    noExternal: [/^@fluentui\//],
  },
})

export default config
