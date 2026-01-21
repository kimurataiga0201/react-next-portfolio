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

export type News = {
  title: string;
  description: string;
  content: string;
  thumbnail?: MicroCMSImage;
  category: Category;
} & MicroCMSListContent;

export type Skill = {
  category: string;
  title: string;
  items: string[];
  icon: string;
  color: string;
  order: number;
} & MicroCMSListContent;

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN || '';
const apiKey = process.env.MICROCMS_API_KEY || '';

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

export const getNewsList = async (queries?: MicroCMSQueries) => {
  if (!client) {
    throw new Error('microCMS client is not initialized. Please set MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY.');
  }
  const listData = await client.getList<News>({
    endpoint: 'news',
    queries,
  });
  return listData;
};

export const getNewsDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  if (!client) {
    throw new Error('microCMS client is not initialized. Please set MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY.');
  }
  const detailData = await client.getListDetail<News>({
    endpoint: 'news',
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

export const getAllNewsList = async () => {
  if (!client) {
    throw new Error('microCMS client is not initialized. Please set MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY.');
  }
  const listData = await client.getAllContents<News>({
    endpoint: 'news',
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
