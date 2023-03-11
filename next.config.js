/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  distDir: 'build',
}
const removeImports = require('next-remove-imports')()

module.exports = removeImports(nextConfig)
