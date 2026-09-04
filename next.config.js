/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === 'true'
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: isGithubPages ? '/TaxFunded' : '',
  assetPrefix: isGithubPages ? '/TaxFunded/' : undefined,
  trailingSlash: true,
}
module.exports = nextConfig
