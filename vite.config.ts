import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// https://vitejs.dev/config/
dotenv.config({path: process.env.NODE_ENV === 'production' ? './.env.prod' : './env.dev'})

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env
  }
})
