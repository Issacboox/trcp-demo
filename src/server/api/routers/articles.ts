import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: 'Article 1',
    excerpt: 'excerpt 1',
    content: 'content 1',
  },
  {
    id: 2,
    title: 'Article 2',
    excerpt: 'excerpt 2',
    content: 'content 2',
  },
  {
    id: 3,
    title: 'Article 3',
    excerpt: 'excerpt 3',
    content: 'content 3',
  },
];

export const articleRouter = createTRPCRouter({
  list: publicProcedure.query(() => {
    return articles;
  }),
  byId: publicProcedure.input(z.number()).query(({ input }) => {
    return articles.find(article => article.id === input);
  }),
  add: publicProcedure
    .input(
      z.object({
        title: z.string(),
        excerpt: z.string(),
        content: z.string(),
      }),
    )
    .mutation(({ input }) => {
      const article = {
        id: articles.length + 1,
        ...input,
      };
      articles.push(article);
      return articles;
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        data: z
          .object({
            title: z.string(),
            excerpt: z.string(),
            content: z.string(),
          })
          .partial(), // mean can send some part
      }),
    )
    .mutation(({ input }) => {
      const { id, data } = input;
      const article = articles.find((articles) => articles.id === id);
      if (!article) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Article not found',
        });
      }
      if (data.title)article.title = data.title;
      if (data.excerpt)article.excerpt = data.excerpt;
      if (data.content)article.content = data.content;
      return articles;
    }),
  remove: publicProcedure.input(z.number()).mutation(({ input }) => {
    const index = articles.findIndex(article => article.id === input)
    articles.splice(index, 1);
  }),
});
