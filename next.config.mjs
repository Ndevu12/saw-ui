/** @type {import('next').NextConfig} */
const nextConfig = {
  // A fully static export: the deploy is files on a CDN, with no server to run, no
  // runtime to patch, and nothing that could start making requests later.
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  // No third-party anything at runtime is a promise this site makes out loud, so the
  // header is enforced rather than trusted. `connect-src 'none'` means the page cannot
  // phone home even if a future dependency tries to.
  // NOTE: static export cannot emit headers; this is mirrored in vercel.json, which is
  // what actually serves them. Kept here so `next dev` behaves like production.
  ...(process.env.NODE_ENV === 'development' ? { async headers() {
    return [{
      source: '/:path*',
      headers: [{
        key: 'Content-Security-Policy',
        value: [
          "default-src 'self'",
          "img-src 'self' data:",
          "style-src 'self' 'unsafe-inline'",
          "script-src 'self' 'unsafe-inline'",
          "font-src 'self'",
          "connect-src 'none'",
          "frame-ancestors 'none'",
          "base-uri 'self'",
          "form-action 'none'",
        ].join('; '),
      }],
    }];
  } } : {}),
};
export default nextConfig;
