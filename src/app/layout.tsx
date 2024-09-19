// app/layout.tsx
import './globals.jsx';
import { ReduxProvider } from './components/ReduxProvider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "CollaboraT",
  description: "Encuentra rápidamente clínicas cercanas a tu ubicación basadas en tu EPS, que pueden atenderte en caso de urgencia.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
