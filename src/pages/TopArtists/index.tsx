import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";

const TopArtists = (props) => {
  const { getTopTwentyArtists } = props.artists;
  console.log(getTopTwentyArtists);
  return (
    <>
      <p>Top Artists</p>
      {getTopTwentyArtists.map((artist) => {
        return (
          <div>
            <div>
              <Image src={artist.imageUrl} width="240" height="240" />
              <Link href={artist.externalUrl}>
                <a>
                  <FaPlay size={20} color={"green"} />
                </a>
              </Link>
            </div>
            <div>{artist.name}</div>
          </div>
        );
      })}
    </>
  );
};

export default TopArtists;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx;
  const cookies = req.cookies;

  const getTopArtists = await fetch(
    "http://localhost:3000/api/getTopArtists?" +
      new URLSearchParams({ accessToken: cookies["next-auth.access-token"] })
  ).then((response) => response.json());
  console.log(getTopArtists);
  return {
    props: { artists: getTopArtists },
  };
};
