import axios from "axios";
import { Track } from "../Components/types";

export const searchTracks = async (query: string, offset = 0): Promise<Track[]> => {
  const res = await axios.get("https://api.mixcloud.com/search/", {
    params: {
      q: query,
      type: "cloudcast",
      limit: 6,
      offset,
    },
  });

  return res.data.data.map((item: any) => ({
    key: item.key,
    name: item.name,
    url: `https://www.mixcloud.com${item.key}`,
    pictures: item.pictures,
  }));
};
