import {useEffect} from 'react';
import '../styles/globals/globals.scss';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import Layout from '../components/Layout';
import {ThemeProvider} from '@mui/material/styles';
import theme from '../styles/globals/theme';
import Header from '../components/Header';
import Footer from '../components/Footer';
import createEmotionCache from '../styles/globals/createEmotionCache';
import {CacheProvider} from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import {AppProvider} from '../context';
import LogRocket from 'logrocket';
import {SessionProvider, signIn, signOut, useSession} from 'next-auth/react';
import RequireAuth from '../components/RequireAuth';

const clientSideEmotionCache = createEmotionCache();

export default function App({Component, pageProps}: AppProps) {
  useEffect(() => {
    LogRocket.init('p8xor5/weddingsite');
  });

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Head>
        <title>dubois.wedding</title>
        <meta name="description" content="DuBois Wedding Site" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppProvider>
          <SessionProvider>
            <Header />
            <Layout>
              <Component id="layout" {...pageProps} />
            </Layout>
            <Footer />
          </SessionProvider>
        </AppProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
