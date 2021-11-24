import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
type SessionProps = {
  session: { user: { name: string; email: string; image: string } };
};
const PlaylistPage = ({ session }: SessionProps) => {
  const { user } = session;
  return (
    <>
      {" "}
      <div>Playlist Page</div>
      <p>Bem vindo {user.name}</p>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  return {
    props: { session },
  };
};

export default PlaylistPage;
