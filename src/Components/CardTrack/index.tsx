import styles from "./styles.module.scss";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
type trackProps = {
  name: string;
  artist: string;
  externalUrl: string;
  imageUrl: string;
  index: number;
};
export const CardTrack = (track: trackProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageArea}>
        <Image
          src={track.imageUrl}
          width="100"
          height="100"
          className={styles.image}
          alt={`Capa da ${track.name}`}
        />
      </div>
      <div className={styles.titleArtistArea}>
        <div className={styles.trackTitle}>
          <span> {track.index + 1}</span> -{" "}
          {track.name.length > 30 ? track.name.substring(0, 30) : track.name}
        </div>
        <div className={styles.artist}>{track.artist}</div>
      </div>
      <div className={styles.playButtonArea}>
        <a href={track.externalUrl} rel="noreferrer" target="_blank">
          <button>
            <FaPlay size={20} color={"#fff"} />
          </button>
        </a>
      </div>
    </div>
  );
};
