import Head from "next/head";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export function AppLayout({ children }: Props) {
  useEffect(() => {
    const documentHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
    };
    window.addEventListener("resize", documentHeight);
    documentHeight();
  }, []);

  return (
    <>
      <Head>
        <title>DuckTape 🦆</title>
        <meta name="description" content="Next.js App" />
        <link rel="icon" href="/ducktape/favicon.ico" />
      </Head>
      {children}
    </>
  );
}
