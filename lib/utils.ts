import { clsx, type ClassValue } from "clsx";
export const cn = (...inputs: ClassValue[]) => clsx(inputs);
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
export const formatDate = (dateInput: string | Date) => {
  const date = new Date(dateInput);
  const day = date.getDate().toString().padStart(2, "0");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Agu", "Sep", "Oct", "Nov", "Dec"];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};
