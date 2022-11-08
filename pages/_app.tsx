import { createTheme, ThemeProvider } from "@mui/material/styles";

import type { AppProps } from "next/app";
import { AppLayout } from "../layouts/AppLayout";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#01AB46",
      },
      secondary: {
        main: "#f5f5f5",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </ThemeProvider>
  );
}

