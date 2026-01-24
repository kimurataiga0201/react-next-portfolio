import { createClient } from 'microcms-js-sdk';
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSListContent,
} from 'microcms-js-sdk';

export type Member = {
  name: string;
  position: string;
  profile: string;
  image: MicroCMSImage;
} & MicroCMSListContent;

export type Category = {
  name: string;
} & MicroCMSListContent;

export type Blog = {
  title: string;
  description: string;
  content: string;
  thumbnail?: MicroCMSImage;
  category?: Category;
} & MicroCMSListContent;

export type Skill = {
  category: string;
  title: string;
  items: string[];
  icon: string;
  color: string;
  order: number;
} & MicroCMSListContent;

export type Work = {
  title: string;
  description: string;
  thumbnail?: MicroCMSImage;
  url?: string;
  github?: string;
  tags: string[];
  order: number;
} & MicroCMSListContent;

export type Hobby = {
  title: string;
  description: string;
  content: string;
  thumbnail?: MicroCMSImage;
  order: number;
} & MicroCMSListContent;

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN || process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN || '';
const apiKey = process.env.MICROCMS_API_KEY || process.env.NEXT_PUBLIC_MICROCMS_API_KEY || '';

const client = serviceDomain && apiKey 
  ? createClient({
      serviceDomain,
      apiKey,
    })
  : null;

export const getMembersList = async (queries?: MicroCMSQueries) => {
  if (!client) {
    throw new Error('microCMS client is not initialized. Please set MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY.');
  }
  const listData = await client.getList<Member>({
    endpoint: 'members',
    queries,
  });
  return listData;
};

export const getBlogList = async (queries?: MicroCMSQueries) => {
  if (!client) {
    throw new Error('microCMS client is not initialized. Please set MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY.');
  }
  const listData = await client.getList<Blog>({
    endpoint: 'blog',
    queries,
  });
  return listData;
};

export const getBlogDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  if (!client) {
    throw new Error('microCMS client is not initialized. Please set MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY.');
  }
  const detailData = await client.getListDetail<Blog>({
    endpoint: 'blog',
    contentId,
    queries,
    customRequestInit: {
      next: {
        revalidate: queries?.draftKey === undefined ? 60 : 0,
      },
    },
  });

  return detailData;
};

export const getCategoryDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  if (!client) {
    throw new Error('microCMS client is not initialized. Please set MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY.');
  }
  const detailData = await client.getListDetail<Category>({
    endpoint: 'categories',
    contentId,
    queries,
  });

  return detailData;
};

export const getAllBlogList = async () => {
  if (!client) {
    throw new Error('microCMS client is not initialized. Please set MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY.');
  }
  const listData = await client.getAllContents<Blog>({
    endpoint: 'blog',
  });

  return listData;
};

export const getAllCategoryList = async () => {
  if (!client) {
    throw new Error('microCMS client is not initialized. Please set MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY.');
  }
  const listData = await client.getAllContents<Category>({
    endpoint: 'categories',
  });

  return listData;
};

export const getSkillsList = async (queries?: MicroCMSQueries) => {
  if (!client) {
    throw new Error('microCMS client is not initialized. Please set MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY.');
  }
  const listData = await client.getList<Skill>({
    endpoint: 'skills',
    queries,
  });
  return listData;
};

export const getWorksList = async (queries?: MicroCMSQueries) => {
  if (!client) {
    throw new Error('microCMS client is not initialized. Please set MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY.');
  }
  const listData = await client.getList<Work>({
    endpoint: 'works',
    queries,
  });
  return listData;
};

export const getHobbiesList = async (queries?: MicroCMSQueries) => {
  if (!client) {
    throw new Error('microCMS client is not initialized. Please set MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY.');
  }
  const listData = await client.getList<Hobby>({
    endpoint: 'hobbies',
    queries,
  });
  return listData;
};
