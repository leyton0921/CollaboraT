// app/layout.tsx
import './globals.css';
import { ReduxProvider } from './components/ReduxProvider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "CollaboraT",
  description: "",
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
