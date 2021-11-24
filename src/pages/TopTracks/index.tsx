import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";
const TopTracks = (props) => {
  const { tracks } = props.getTopTracks;
  return (
    <>
      <div> Top Tracks</div>
      {tracks.map((track) => {
        return (
          <div>
            <Image src={track.imageUrl} width="100" height="100" />
            <div>
              <div>{track.name}</div>
              <div>{track.artist}</div>
            </div>
            <Link href={track.externalUrl}>
              <a>
                <FaPlay size={20} color={"green"} />
              </a>
            </Link>
          </div>
        );
      })}
    </>
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
