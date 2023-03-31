import { Layout } from "@/containers/Layout";
import "@/styles/globals.css";
import "@/styles/icons.css";
import "@/styles/swiper.css";
import "@/styles/font.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
