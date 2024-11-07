import { defineStackbitConfig } from '@stackbit/types';

export default defineStackbitConfig({
  stackbitVersion: '~0.6.0',
  ssgName: 'custom',
  nodeVersion: '18',
  devCommand: 'npm run dev',
  buildCommand: 'npm run build',
  installCommand: 'npm install',
  dataDir: 'content',
  pagesDir: 'src/pages',
  publicDir: 'public',
  contentSources: [
    {
      name: 'local',
      type: 'files',
      directory: 'content'
    }
  ],
  env: [
    {
      name: 'VAR_NAME',
      value: 'somevalue',
      type: 'string',
      required: true
    }
  ],
  assets: {
    referenceType: 'static',
    staticDir: 'public',
    uploadDir: 'images',
    publicPath: '/'
  }
});
