import "../styles/globals.css";
import { Provider as NextAuthProvider } from "next-auth/client";
import { Header } from "../Components/Header";
function MyApp({ Component, pageProps }) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
    </NextAuthProvider>
  );
}

export default MyApp;
