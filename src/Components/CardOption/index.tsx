import styles from "./styles.module.scss";
import Link from "next/link";
import { getYear } from "../../utils/getYear";

type cardProps = {
  titleNumber: string;
  link: string;
  linkName: string;
  defaultColorCard: boolean;
};
export const CardOption = (card: cardProps) => {
  return (
    <>
      <div
        className={`${styles.cardContainer} ${
          card.defaultColorCard ? "" : styles.cardNotDefaultColorContainer
        }`}
      >
        <div className={styles.cardTitleArea}>
          <div className={styles.cardTitle}>
            Top <br />
            {card.titleNumber} <br />
            {getYear()} <br />
          </div>
        </div>
        <div
          className={`${styles.cardLink} ${
            card.defaultColorCard ? "" : styles.cardNotDefaultColorLink
          }`}
        >
          <Link href={`/${card.link}`}>
            <a>{card.linkName}</a>
          </Link>
        </div>
      </div>
    </>
  );
};
