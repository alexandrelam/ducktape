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
        <meta
          name="description"
          content="Share 2 seconds videos /w your friends"
        />
        <meta name="author" content="Alexandre Lam" />
        <meta name="keyword" content="🦆" />
        <link rel="icon" href="/ducktape/favicon.ico" />
      </Head>
      {children}
    </>
  );
}
