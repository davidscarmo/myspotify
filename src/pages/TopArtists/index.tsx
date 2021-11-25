import { GetServerSideProps } from "next";
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
  console.log(getTopTwentyArtists);
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
  const cookies = req.cookies;

  const getTopArtists = await fetch(
    "http://localhost:3000/api/getTopArtists?" +
      new URLSearchParams({ accessToken: cookies["next-auth.access-token"] })
  ).then((response) => response.json());
  console.log(getTopArtists);
  return {
    props: { artists: getTopArtists },
  };
};
