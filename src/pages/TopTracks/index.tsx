import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaPlay, FaArrowLeft } from "react-icons/fa";
import { CardTrack } from "../../Components/CardTrack";
import getTopTracks from "../api/getTopTracks";
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
        <h2>Se liga no seu top 50 de 2021</h2>
        <div>
          <Link href={"/Home"}>
            <button>
              Voltar <FaArrowLeft />
            </button>
          </Link>
        </div>
      </div>

      <div className={styles.trackCardArea}>
        {tracks.map((track: trackProps, index) => {
          return (
            <CardTrack
              key={track.id}
              artist={track.artist}
              name={track.name}
              index={index}
              imageUrl={track.imageUrl}
              externalUrl={track.externalUrl}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TopTracks;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx;
  const cookies = req.cookies;

  const getTopTracks = await fetch(
    "http://localhost:3000/api/getTopTracks?" +
      new URLSearchParams({ accessToken: cookies["next-auth.access-token"] })
  ).then((response) => response.json());
  console.log(getTopTracks);
  return {
    props: { getTopTracks },
  };
};
