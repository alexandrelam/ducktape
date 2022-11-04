import Head from "next/head";

type Props = {
  children: React.ReactNode;
};

export function AppLayout({ children }: Props) {
  return (
    <>
      <Head>
        <title>DuckTape 🦆</title>
        <meta name="description" content="Next.js App" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  );
}
