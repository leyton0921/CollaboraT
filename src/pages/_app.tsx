// src/pages/_app.tsx
import { AppProps } from 'next/app';
import { ReduxProvider } from '../app/components/ReduxProvider'; // Ajusta la ruta según tu estructura

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <Component {...pageProps} />
    </ReduxProvider>
  );
}

export default MyApp;
