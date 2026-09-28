export interface ArticleHeading {
  id: string;
  text: string;
  level: number;
}

export function getArticleHeadings(root: ParentNode): ArticleHeading[] {
  const elements = Array.from(root.querySelectorAll("h1, h2, h3, h4, h5, h6"));
  const usedIds = new Set(
    Array.from(root.querySelectorAll("[id]"), (element) => element.id),
  );

  return elements.map((element, index) => {
    let id = element.id;
    if (!id) {
      const baseId = `article-heading-${index + 1}`;
      id = baseId;
      let suffix = 2;
      while (usedIds.has(id)) {
        id = `${baseId}-${suffix}`;
        suffix += 1;
      }
      usedIds.add(id);
    }

    return {
      id,
      text: element.textContent?.trim() ?? "",
      level: Number(element.tagName.slice(1)),
    };
  });
}
