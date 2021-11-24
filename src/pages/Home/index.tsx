import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import nookies from "nookies";
import Link from "next/link";
type SessionProps = {
  session: { user: { name: string; email: string; image: string } };
};
const Home = ({ session }: SessionProps) => {
  const { user } = session;
  return (
    <>
      {" "}
      <div>Profile Page </div>
      <p>Bem vindo {user.name}</p>
      <Link href={"/TopArtists"}>
        <a>Ver meus Top Artists</a>
      </Link>
      <br />
      <Link href={"/TopTracks"}>
        <a>Ver Músicas Mais Ouvidas</a>
      </Link>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx;
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // we need to refresh the access token because when you log in
  // the acess-token that comes doesn't have all permissions
  const cookies = req.cookies;

  const getRefreshAccessToken = await fetch(
    "http://localhost:3000/api/getRefreshAccessToken?" +
      new URLSearchParams({ refreshToken: cookies["next-auth.refreshToken"] })
  ).then((response) => response.json());

  const { accessToken } = getRefreshAccessToken;

  nookies.set(ctx, "next-auth.access-token", accessToken, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });

  return {
    props: { session },
  };
};

export default Home;
