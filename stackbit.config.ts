import { defineStackbitConfig } from '@stackbit/types'
import { GitContentSource } from '@stackbit/cms-git'

export default defineStackbitConfig({
  stackbitVersion: '~0.6.0',
  ssgName: 'custom',
  nodeVersion: '20',
  devCommand: 'npm run dev -- --port {PORT} --host 127.0.0.1',
  buildCommand: 'npm run build',
  installCommand: 'npm install',
  dataDir: 'content',
  pagesDir: 'src/pages',
  publishDir: 'dist',
  experimental: {
    ssg: {
      name: 'vite',
      passthrough: ['/*'],
      directRoutes: {
        '/': 'index.html',
      },
    },
  },
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ['content'],
      models: [
        {
          name: 'page',
          type: 'page',
          urlPath: '/{slug}',
          fields: [
            { type: 'string', name: 'title', required: true },
            { type: 'string', name: 'description' },
            { type: 'image', name: 'image' },
            { type: 'datetime', name: 'date' },
            { type: 'string', name: 'layout', default: 'page' },
          ],
        },
        {
          name: 'post',
          type: 'page',
          urlPath: '/blog/{slug}',
          fields: [
            { type: 'string', name: 'title', required: true },
            { type: 'string', name: 'description' },
            { type: 'image', name: 'image' },
            { type: 'datetime', name: 'date' },
            { type: 'string', name: 'author' },
            { type: 'list', name: 'tags', items: { type: 'string' } },
            { type: 'string', name: 'layout', default: 'post' },
          ],
        },
      ],
    }),
  ],
})
