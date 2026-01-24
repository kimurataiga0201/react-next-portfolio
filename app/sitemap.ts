import { MetadataRoute } from 'next';
import { getAllCategoryList, getAllBlogList } from './_libs/microcms';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL 
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

const buildUrl = (path?: string) => `${baseUrl}${path ?? ''}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogUrls: MetadataRoute.Sitemap = [];
  let categoryUrls: MetadataRoute.Sitemap = [];

  try {
    const blogContents = await getAllBlogList();
    const categoryContents = await getAllCategoryList();

    blogUrls = blogContents.map((content) => ({
      url: buildUrl(`/blog/${content.id}`),
      lastModified: content.revisedAt,
    }));
    categoryUrls = categoryContents.map(
      (content) => ({
        url: buildUrl(`/blog/category/${content.id}`),
        lastModified: content.revisedAt,
      })
    );
  } catch (error) {
    console.error('Failed to fetch content for sitemap:', error);
    // Return basic sitemap if API calls fail
  }

  const now = new Date();

  return [
    {
      url: buildUrl(),
      lastModified: now,
    },
    {
      url: buildUrl('/contact'),
      lastModified: now,
    },
    {
      url: buildUrl('/blog'),
      lastModified: now,
    },
    ...blogUrls,
    ...categoryUrls,
  ];
}
