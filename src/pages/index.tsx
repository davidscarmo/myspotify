import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/client";

export default function Home({ session }) {
  return (
    <>
      {!session && (
        <button onClick={() => signIn("spotify")}>Logar com o spotify</button>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/PlaylistPage",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};
