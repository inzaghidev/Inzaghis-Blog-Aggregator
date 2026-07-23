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
