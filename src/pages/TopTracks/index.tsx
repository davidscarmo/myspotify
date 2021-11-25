import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { CardTrack } from "../../Components/CardTrack";
import styles from "./styles.module.scss";
type trackProps = {
  id: string;
  name: string;
  artist: string;
  externalUrl: string;
  imageUrl: string;
};
type tracksProps = {
  getTopTracks: { tracks: trackProps[] };
};
const TopTracks = (props: tracksProps) => {
  const { tracks } = props.getTopTracks;
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {" "}
        <h2>Confira o seu top 50 de 2021</h2>
        <div className={styles.buttonbackArea}>
          <Link href={"/Home"}>
            <button>
              Voltar <FaArrowLeft />
            </button>
          </Link>
        </div>
      </div>

      <div className={styles.trackCardArea}>
        {tracks.map((track: trackProps, index) => {
          return <CardTrack key={track.id} index={index} {...track} />;
        })}
      </div>
    </div>
  );
};

export default TopTracks;

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
  console.log(session);
  const cookies = req.cookies;

  const getTopTracks = await fetch(
    `${process.env.BASE_URL}/api/getTopTracks?` +
      new URLSearchParams({ accessToken: cookies["next-auth.access-token"] })
  ).then((response) => response.json());
  return {
    props: { getTopTracks },
  };
};
