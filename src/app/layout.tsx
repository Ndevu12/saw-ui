import type { Metadata, Viewport } from 'next';

/* Fonts are SELF-HOSTED, not linked from a font CDN. This site tells visitors that it
   loads nothing from anywhere else; a stylesheet request to a third party would make
   that a lie in the first 200ms of the page. @fontsource ships the files into our own
   bundle. Only the weights actually used are imported. */
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-sans-condensed/600.css';
import '@fontsource/ibm-plex-sans-condensed/700.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import '@fontsource/ibm-plex-mono/600.css';

import './globals.css';

const SITE = 'https://saw.ndevuspace.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: 'saw — supply-chain worm hunter',
  description:
    'saw hunts supply-chain worms in repositories, lockfiles, installed packages and on the ' +
    'host, remediates on a pull request, hardens the machine, and gates CI.',
  applicationName: 'saw',
  authors: [{ name: 'Jean Paul Elisa NIYOKWIZERWA' }],
  openGraph: {
    type: 'website',
    url: SITE,
    siteName: 'saw',
    title: 'saw — supply-chain worm hunter',
    description:
      'saw hunts supply-chain worms in repositories, lockfiles, installed packages and on the ' +
      'host, remediates on a pull request, hardens the machine, and gates CI.',
  },
  twitter: { card: 'summary_large_image', title: 'saw — supply-chain worm hunter' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#090e14' },
    { media: '(prefers-color-scheme: light)', color: '#f6f8f7' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:rounded-br-md focus:bg-mint focus:px-5 focus:py-3 focus:font-semibold focus:text-ground"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
