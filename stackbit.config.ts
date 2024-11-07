<<<<<<< HEAD
// stackbit.config.ts
import { defineStackbitConfig } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
    stackbitVersion: "~0.6.0",
    contentSources: [
        new GitContentSource({
            rootPath: __dirname,
            contentDirs: ["content"],
            models: [
                {
                    name: "Page",
                    type: "page",
                    urlPath: "/{slug}",
                    filePath: "content/pages/{slug}.json",
                    fields: [{ name: "title", type: "string", required: true }]
                }
            ],
            assetsConfig: {
                referenceType: "static",
                staticDir: "public",
                uploadDir: "images",
                publicPath: "/"
            }
        })
    ]
});
=======
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
>>>>>>> e7887728432c13dadd0d6eb840d2973eb74933e9
