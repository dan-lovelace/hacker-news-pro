export function prettyDate(time: number) {
  const date = new Date(Math.round(time) * 1000);
  const diff = (new Date().getTime() - date.getTime()) / 1000;
  const day_diff = Math.floor(diff / 86400);

  if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31) {
    return `on ${date.toLocaleDateString()}`;
  }

  return (
    (day_diff == 0 &&
      ((diff < 60 && "just now") ||
        (diff < 120 && "1 minute ago") ||
        (diff < 3600 && Math.floor(diff / 60) + " minutes ago") ||
        (diff < 7200 && "1 hour ago") ||
        (diff < 86400 && Math.floor(diff / 3600) + " hours ago"))) ||
    (day_diff == 1 && "Yesterday") ||
    (day_diff < 7 && day_diff + " days ago") ||
    (day_diff < 31 && Math.ceil(day_diff / 7) + " weeks ago")
  );
}
