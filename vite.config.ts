import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { fileURLToPath } from 'url'
import { componentTagger } from 'lovable-tagger'

// Calculate __dirname using fileURLToPath for ES module compatibility
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    componentTagger() // Ensure this plugin is correctly configured and used
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias for src directory
    },
  },
  server: {
    host: true, // Allow access from network
    port: 8080, // Set development server port
  },
  build: {
    sourcemap: true, // Enable source maps for debugging
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Separate vendor libraries
        },
      },
    },
    commonjsOptions: {
      include: [/node_modules/], // Include node_modules for CommonJS
      extensions: ['.js', '.cjs'], // Handle .js and .cjs extensions
    },
  },
  optimizeDeps: {
    exclude: ['lmdb'], // Exclude lmdb from optimization
  },
})