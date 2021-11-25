import styles from "./styles.module.scss";
import { destroyCookie } from "nookies";
import { signOut, useSession } from "next-auth/client";

export const Header = () => {
  const handleLogout = async () => {
    signOut({ callbackUrl: "/", redirect: true });
    destroyCookie({}, "next-auth.access-token", { path: "/" });
  };
  const [session] = useSession();
  return (
    <header className={styles.Header}>
      <div className={styles.logoArea}>
        <h1>
          my<span>Spotify </span>
        </h1>
      </div>
      <div className={styles.userInfoLogOutArea}>
        {!!session && (
          <div>
            {session.user.name} <span>|</span>{" "}
            <button onClick={() => handleLogout()}> Sair</button>
          </div>
        )}
      </div>
    </header>
  );
};
