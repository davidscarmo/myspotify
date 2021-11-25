import styles from "./styles.module.scss";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";

type artistProps = {
  name: string;
  artist: string;
  imageUrl: string;
  externalUrl: string;
};

export const CardArtist = (artist: artistProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.imgButtonArea}>
        <Image src={artist.imageUrl} width="200" height="200" />
        <button className={styles.playButton}>
          <a href={artist.externalUrl} target="_blank">
            <FaPlay size={30} color={"#fff"} className={styles.backButton} />
          </a>
        </button>
      </div>
      <div className={styles.artistName}>{artist.name}</div>
    </div>
  );
};
