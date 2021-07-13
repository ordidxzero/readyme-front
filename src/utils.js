function getMovieId() {
  const pathname = location.pathname;

  if (pathname === "/index.html") {
    return 1;
  }
  if (pathname === "/kingdom.html") {
    return 2;
  }
  if (pathname === "/gunpowder.html") {
    return 3;
  }
  return 4;
}

export default getMovieId;
