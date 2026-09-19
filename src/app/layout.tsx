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
  title: 'saw — find and remove hidden harmful software',
  description:
    'saw finds harmful code hidden in software you installed — in your project, in the packages ' +
    'it uses, and on this computer. It prepares a repair you review, locks down the computer, ' +
    'and checks new code before it becomes official.',
  applicationName: 'saw',
  authors: [{ name: 'Jean Paul Elisa NIYOKWIZERWA' }],
  openGraph: {
    type: 'website',
    url: SITE,
    siteName: 'saw',
    title: 'saw — find and remove hidden harmful software',
    description:
      'saw finds harmful code hidden in software you installed — in your project, in the packages ' +
      'it uses, and on this computer. It prepares a repair you review, locks down the computer, ' +
      'and checks new code before it becomes official.',
  },
  twitter: { card: 'summary_large_image', title: 'saw — find and remove hidden harmful software' },
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
