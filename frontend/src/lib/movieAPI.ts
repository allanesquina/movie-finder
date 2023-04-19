import axios from "axios";
export async function fetchMovie(title: string) {
  const response = await axios({
    method: "get",
    url: "http://localhost:3000/v1/search/",
    params: {
      q: title,
    },
  });

  return response.data;
}
