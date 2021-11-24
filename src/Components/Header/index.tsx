import styles from "./styles.module.scss";

export const Header = () => {
  return (
    <header className={styles.Header}>
      <div className={styles.logoArea}>
        <h1>
          my<span>Spotify </span>
        </h1>
      </div>
      <div className={styles.userInfoLogOutArea}>
        <div>
          David Carmo <span>|</span> <a> Sair</a>
        </div>
      </div>
    </header>
  );
};
