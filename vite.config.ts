import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// https://vitejs.dev/config/
// dotenv.config({path: process.env.NODE_ENV === 'production' ? './.env.prod' : './env.dev'})

export default defineConfig(({command, mode})=> {
  const env = loadEnv(mode, process.cwd());
  return {
    define: {
      'process.env': env
    },
    plugins: [react()],
    base: env.VITE_HOME
  }
})
