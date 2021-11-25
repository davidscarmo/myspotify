import { api } from "../../services/api";
type trackProps = {
  external_urls: { spotify: string };
  id: string;
  name: string;
  artists: [{ name: string }];
  album: { images: [{ url: string }] };
};
export default async function handler(req, res) {
  const { accessToken } = req.query;
  try {
    const response = await api.get("/me/top/tracks?limit=50", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const { items } = response.data;

    const getTopFiftyTracks = items.map((item: trackProps) => {
      return {
        externalUrl: item.external_urls.spotify,
        id: item.id,
        name: item.name,
        artist: item.artists[0].name,
        imageUrl: item.album.images[0].url,
      };
    });
    return res.status(200).json({ tracks: getTopFiftyTracks });
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
}
