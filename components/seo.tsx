import Head from "next/head";

interface ISeoProps {
  title: string;
}

const Seo = ({ title }: ISeoProps) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default Seo;
