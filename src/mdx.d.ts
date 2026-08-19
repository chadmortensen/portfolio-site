declare module "*.mdx" {
  import type { ComponentType } from "react";

  export const frontmatter: {
    title: string;
    subtitle?: string;
  };

  const Content: ComponentType<{
    components?: Record<string, ComponentType<Record<string, unknown>>>;
  }>;

  export default Content;
}
