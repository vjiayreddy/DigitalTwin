import '../styles/globals.css'
import { ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import theme from "../src/config/theme";
import CssBaseline from "@mui/material/CssBaseline";
import createEmotionCache from "../src/config/createEmotionCache";
import { CacheProvider } from "@emotion/react";



const clientSideEmotionCache = createEmotionCache();

function MyApp(props: any) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps
  } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Bin</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>

    </CacheProvider>
  )

}

export default MyApp
