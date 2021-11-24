import styles from "./styles.module.scss";
import Link from "next/link";
type cardProps = {
  titleNumber: string;
  link: string;
  linkName: string;
  defaultColorCard: boolean;
};
export const CardOption = (card: cardProps) => {
  const getDate = new Date();
  const year = getDate.getFullYear();
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
            {year} <br />
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
