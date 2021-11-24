import "../styles/globals.css";
import { Provider as NextAuthProvider } from "next-auth/client";
import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer/Index";

function MyApp({ Component, pageProps }) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </NextAuthProvider>
  );
}

export default MyApp;
