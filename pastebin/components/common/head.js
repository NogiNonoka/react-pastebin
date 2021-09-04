import Head from "next/head";

export default function MyHead({ title }) {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/icon.png" />
    </Head>
  );
}
