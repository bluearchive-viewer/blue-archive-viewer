import NextHeadSeo from "next-head-seo";
import { config } from "@site.config";

export type MyPageSeoProps = {
  path: string;
  title?: string;
  description?: string;
  ogImagePath?: string;
  noindex?: boolean;
  noTitleTemplate?: boolean;
};

export const MyPageSeo: React.FC<MyPageSeoProps> = (props) => {
  const {
    path,
    title = config.siteMeta.title,
    description = config.siteMeta.description,
    noindex,
    noTitleTemplate,
  } = props;

  const APP_ROOT_URL = process.env.NEXT_PUBLIC_APP_ROOT_URL;

  const pageUrl = APP_ROOT_URL + path;

  return (
    <NextHeadSeo
      title={noTitleTemplate ? title : `${title} - ${config.siteMeta.title}`}
      canonical={pageUrl}
      description={description}
      robots={noindex ? "noindex, nofollow" : undefined}
      og={{
        title,
        description,
        url: pageUrl,
        type: "website",
        siteName: config.siteMeta.title,
      }}
      twitter={{
        card: "summary_large_image",
      }}
    />
  );
};
