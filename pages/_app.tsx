import { createTheme, ThemeProvider } from "@mui/material/styles";

import type { AppProps } from "next/app";
import { createContext, useState } from "react";
import { AppLayout } from "../layouts/AppLayout";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

type ContextProps = {
  page: number;
  setPage: (page: number) => void;
};

export const Store = createContext<ContextProps | null>(null);

export default function App({ Component, pageProps }: AppProps) {
  const [page, setPage] = useState(1);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#01AB46",
      },
    },
  });

  return (
    <Store.Provider
      value={{
        page,
        setPage,
      }}
    >
      <ThemeProvider theme={theme}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ThemeProvider>
    </Store.Provider>
  );
}

