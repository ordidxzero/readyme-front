import getMovieId from "./utils";
import { movieApi } from "./client";

const movieTitle = document.querySelector("h1.main__column__info__title");
const moviePoster = document.querySelector("img.img-wrapper__movie-poster");
const movieStar = document.querySelector(
  "span.main__column__info__detail__star"
);
const movieYear = document.querySelector(
  "span.main__column__info__detail__year"
);
const movieSeason = document.querySelector(
  "span.main__column__info__detail__season"
);
const movieQuality = document.querySelector(
  "span.main__column__info__detail__quality"
);
const movieDescription = document.querySelector(
  "p.main__column__info__description"
);
const moviePlayButton = document.querySelector(
  "span.main__column__action__play-button"
);

function paintMovie(data) {
  const {
    title,
    image,
    star,
    year,
    season,
    quality,
    description,
    current_see,
  } = data;
  moviePoster.src = image;
  movieStar.innerText = star;
  movieTitle.innerText = title;
  movieYear.innerText = year;
  movieSeason.innerText = `${season} Season`;
  movieQuality.innerText = quality;
  movieDescription.innerText = description;
  moviePlayButton.innerText = `Play ${current_see}`;
}

if ([1, 2, 3].includes(getMovieId())) {
  movieApi(getMovieId()).then(res => {
    const data = res.data.data;
    return paintMovie(data);
  });
}
