/// <reference types="vitest" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    test: {
        globals: true,
        environment: 'happy-dom',
        deps: {
            inline: ['@vueuse/core', '@vue', 'moment', 'moment-timezone'],
        },
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            '~components': resolve(__dirname, './src/components'),
            '~composables': resolve(__dirname, './src/composables'),
            '~types': resolve(__dirname, './src/types'),
            '~stores': resolve(__dirname, './src/stores'),
        },
    },
})
