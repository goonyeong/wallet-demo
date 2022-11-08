// React & Next
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// Style
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "styles/theme";
import GlobalStyle from "styles/globalStyles";
import "../styles/fonts.css";
// Mobx
import { observer } from "mobx-react-lite";
import {
  rootStore,
  StoreProvider,
  useStore,
  reHydrateLocalStorage,
  reHydrateSessionStorage,
} from "store";
// Components
import Layout from "components/layout";
import Seo from "components/seo";

function MyApp({ Component, pageProps }: AppProps) {
  const { themeStore } = useStore();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        cacheTime: 1000 * 5,
        staleTime: 1000 * 2,
        useErrorBoundary: true,
      },
    },
  });

  useEffect(() => {
    reHydrateLocalStorage([rootStore.themeStore]);
    reHydrateSessionStorage([rootStore.userStore]);
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <StoreProvider value={rootStore}>
            <ThemeProvider theme={themeStore.theme === "light" ? lightTheme : darkTheme}>
              <GlobalStyle />
              <Layout>
                <Seo title="Next app" />
                <Component {...pageProps} />
              </Layout>
            </ThemeProvider>
          </StoreProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default observer(MyApp);
