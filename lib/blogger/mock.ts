import type { Article } from "./types";
import { excerpt } from "@/lib/utils";

const stories = [
  [
    "Building the Future: Why Rust is Eating the Enterprise",
    "Programming",
    "Rust is quietly becoming the language teams reach for when reliability and speed are not negotiable.",
    "photo-1518770660439-4636190af475",
  ],
  [
    "The Future of Reactive Systems: Architecture Beyond the Edge",
    "Engineering",
    "The systems we build are learning to react, coordinate, and make decisions closer to where data lives.",
    "photo-1518770660439-4636190af475",
  ],
  [
    "Generative UI: The next frontier in UX design",
    "AI & ML",
    "Interfaces that adapt in real time are reshaping how people think about product experiences.",
    "photo-1634017839464-5c339ebe3cb4",
  ],
  [
    "The Apple Silicon M3: A Developer's Year Later Review",
    "Hardware",
    "A year of living with the platform reveals the meaningful shifts that matter to builders.",
    "photo-1516321318423-f06f85e504b3",
  ],
  [
    "10 Git Aliases that will save you 1 hour a week",
    "Workflow",
    "Small commands, carefully chosen, can remove the friction from everyday development.",
    "photo-1515879218367-8466d910aaa4",
  ],
  [
    "Senior Developer vs Staff Engineer: The subtle differences",
    "Career",
    "Navigating the technical leadership track needs more than just better coding skills.",
    "photo-1504384308090-c894fdcc538d",
  ],
] as const;
export const mockArticles: Article[] = stories.map(
  ([title, label, intro, image], index) => {
    const content = `<p>${intro}</p><p>We move further into the decade, and the work of building software continues to change. The best systems make complexity feel deliberate and humane.</p><h2>The synchronous change</h2><p>Architecture is not just a set of components. It is the confidence that a product can evolve while remaining calm, understandable, and fast for the people using it.</p><pre><code>const signal = createSignal({ mode: "reactive" });\nawait system.publish(signal);</code></pre><h2>Looking ahead</h2><p>The next frontier is less about adding more technology and more about choosing the right amount of it. That is where thoughtful engineering becomes a durable advantage.</p>`;
    return {
      id: `demo-${index + 1}`,
      blogId: `demo-${index % 3}`,
      source:
        index % 3 === 0 ? "legacy" : index % 3 === 1 ? "teknoblog" : "miniblog",
      title,
      content,
      excerpt: excerpt(content),
      published: new Date(Date.now() - index * 86400000 * 3).toISOString(),
      url: `/posts/demo-${index + 1}`,
      cover: `https://images.unsplash.com/${image}?auto=format&fit=crop&w=1400&q=85`,
      labels: [label, index % 2 ? "Technology" : "Developer Experience"],
      author: {
        name: index % 2 ? "Inzaghi Posuma" : "Izzumi Poshaf",
        bio: "Writer, builder, and lifelong learner.",
      },
      views: 1200 + index * 438,
      comments: 4 + index * 3,
    };
  },
);
