import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { CardArtist } from "../../Components/CardArtist";
import styles from "./styles.module.scss";

type artistProps = {
  id: string;
  name: string;
  artist: string;
  imageUrl: string;
  externalUrl: string;
};

type artistsProps = {
  artists: { getTopTwentyArtists: artistProps[] };
};
const TopArtists = (props: artistsProps) => {
  const { getTopTwentyArtists } = props.artists;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {" "}
        <h2>Os seus top artistas de 2021</h2>
        <div className={styles.buttonbackArea}>
          <Link href={"/Home"}>
            <button>
              Voltar <FaArrowLeft />
            </button>
          </Link>
        </div>
      </div>
      <div className={styles.artistsCardArea}>
        {getTopTwentyArtists.map((artist) => {
          return <CardArtist key={artist.id} {...artist} />;
        })}
      </div>
    </div>
  );
};

export default TopArtists;

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

  const cookies = req.cookies;

  const getTopArtists = await fetch(
    `${process.env.BASE_URL}/api/getTopArtists?` +
      new URLSearchParams({ accessToken: cookies["next-auth.access-token"] })
  ).then((response) => response.json());

  return {
    props: { artists: getTopArtists },
  };
};
