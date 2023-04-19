export function calcRating(ratings: any, maxStars: number) {
  const rating = ratings?.length > 0 ? ratings[0] : null;
  if (!rating) return 0;

  const split = rating.Value.split("/");

  const value = parseFloat(split[0]);
  const max = parseInt(split[1]);
  const starValue = Math.floor((maxStars * value) / max);

  return starValue;
}

export function normalizeGenre(genre: string) {
  if (!genre) return [];

  return genre.split(",");
}
