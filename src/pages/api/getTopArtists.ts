import { api } from "../../services/api";
type artistProps = {
  external_urls: { spotify: string };
  id: string;
  name: string;
  images: [{ url: string }];
};
export default async function handler(req, res) {
  const { accessToken } = req.query;
  console.log(accessToken);
  try {
    const response = await api.get("/me/top/artists?limit=20", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const { items } = response.data;

    const getTopTwentyArtists = items.map((item: artistProps) => {
      return {
        externalUrl: item.external_urls.spotify,
        id: item.id,
        name: item.name,
        imageUrl: item.images[0].url,
      };
    });
    return res.status(200).json({ getTopTwentyArtists });
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({ error: err.message });
  }
}
