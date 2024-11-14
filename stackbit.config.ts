import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';

export default defineStackbitConfig({
  stackbitVersion: '~0.6.0',
  ssgName: 'custom',
  nodeVersion: '18',
  devCommand: 'npm run dev -- --port {PORT} --host 127.0.0.1',
  buildCommand: 'npm run build',
  installCommand: 'npm install',
  dataDir: 'content',
  pagesDir: 'src/pages',
  publishDir: 'public',
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ['content'],
      models: [
        { name: 'page', type: 'page', urlPath: '/{slug}' },
        { name: 'post', type: 'page', urlPath: '/blog/{slug}' },
        { name: 'config', type: 'data' }
      ],
    })
  ],
  modelExtensions: [
    { name: 'page', type: 'page', urlPath: '/{slug}' },
    { name: 'post', type: 'page', urlPath: '/blog/{slug}' },
    { name: 'config', type: 'data' }
  ],
});