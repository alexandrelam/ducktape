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
        <link rel="icon" href="/ducktape/favicon.ico" />
      </Head>
      {children}
    </>
  );
}
