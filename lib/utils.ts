import { clsx, type ClassValue } from "clsx";
export const cn = (...inputs: ClassValue[]) => clsx(inputs);
export const randomItems = <T>(items: readonly T[], count: number): T[] => {
  const shuffled = [...items];
  const length = Math.min(shuffled.length, Math.max(0, Math.floor(count)));

  for (let index = 0; index < length; index++) {
    const randomIndex = index + Math.floor(Math.random() * (shuffled.length - index));
    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled.slice(0, length);
};
export const readingTime = (html: string) =>
  `${Math.max(
    1,
    Math.ceil(
      html
        .replace(/<[^>]*>/g, "")
        .trim()
        .split(/\s+/).length / 220,
    ),
  )} min read`;
export const excerpt = (html: string, max = 150) => {
  const text = html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? `${text.slice(0, max).trim()}…` : text;
};
export const formatDate = (dateInput: string | Date, includeYear = true) => {
  const date = new Date(dateInput);
  const day = date.getDate().toString().padStart(2, "0");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return includeYear ? `${day} ${month} ${year}` : `${day} ${month}`;
};
