import { getYear } from "../../utils/getYear";
import styles from "./styles.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>mySpotify - {getYear()}</p>
    </footer>
  );
};
