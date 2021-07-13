import axios from "axios";

const client = axios.create({ baseURL: process.env.API_URL });

client.interceptors.request.use(config => {
  const ls = localStorage.getItem("readyme");
  if (ls === null) {
    return config;
  }
  const user = JSON.parse(ls);
  config.headers.Authorization = user.access_token;
  return config;
});

export function weatherApi(city_name = "Seoul") {
  return client.get("/weather", {
    params: { api_key: process.env.WEATHER_API_KEY, city_name },
  });
}

export function movieApi(movie_id) {
  return client.get(`/movie/${movie_id}`);
}

export function reviewApi(movie_id) {
  const getReview = (size = 10, page = 1) =>
    client.get(`/movie/${movie_id}/review`, { params: { size, page } });
  const postReview = text => client.post(`/movie/${movie_id}/review`, { text });
  const patchReview = (review_id, text) =>
    client.patch(`/movie/${movie_id}/review/${review_id}`, { text });
  const deleteReview = review_id =>
    client.delete(`/movie/${movie_id}/review/${review_id}`);
  return { getReview, postReview, patchReview, deleteReview };
}

export function signUpApi(payload) {
  return client.post(`/account/register`, payload);
}

export function signInApi(payload) {
  return client.post(`/account/login`, payload);
}
