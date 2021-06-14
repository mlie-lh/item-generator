import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
const {resolve} = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  alias: {
    '@': resolve(__dirname, 'src')
  },
  plugins: [vue(),vueJsx()],
  base:'./'
})
