import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/client";
import styles from "./styles.module.scss";
import Image from "next/image";

export default function Login({ session }) {
  return (
    <div className={styles.container}>
      {!session && (
        <>
          <h2 className={styles.title}>
            Faça o login e veja as suas músicas e artistas mais escutados do
            ano.
          </h2>
          <button
            className={styles.loginButton}
            onClick={() => signIn("spotify")}
          >
            {" "}
            <div className={styles.spotifyLogoArea}>
              <Image src={"/spotifyLogo.svg"} width={32} height={32} alt="Spotify Logo" />
            </div>
            <div className={styles.buttonText}> entrar</div>
          </button>
        </>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx;
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/Home",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};
