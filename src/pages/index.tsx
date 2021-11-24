import { signIn } from "next-auth/client";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      {" "}
      <button onClick={() => signIn("spotify")}>
        Logar com o spotify
      </button>{" "}
    </>
  );
}
