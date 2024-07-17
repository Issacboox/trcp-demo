'use client';
import { useState } from 'react';
import { api } from '~/utils/api';
// import { Button } from '~/features/components/ui/Button';

interface ArticleDetailProps {
  id: number;
  title: string;
  content: string;
  excerpt: string;
}

const ArticleDetails = ({ id }: ArticleDetailProps) => {
  const { data: article, isLoading } = api.article.byId.useQuery(id);

  if (isLoading) return <div>Loading...</div>;
  if (!article) return <div>No article</div>;

  return (
    <div className="m-5 flex cursor-pointer items-center justify-center rounded-lg bg-slate-100 p-5">
      <ul className="w-[370px]">
        <li>Id: {article.id}</li>
        <li>Title: {article.title}</li>
        <li>Content: {article.content}</li>
        <li>Excerpt: {article.excerpt}</li>
      </ul>
    </div>
  );
};

const IndexPage = () => {
  const utils = api.useContext();
  const list = utils.article.list;
  const [currentId, setCurrentId] = useState(-1);

  const { data: articles, isLoading } = api.article.list.useQuery();
  const { mutateAsync: addArticle } = api.article.add.useMutation({
    onSuccess() {
      list.invalidate();
    },
  });
  const { mutateAsync: updateArticle } = api.article.update.useMutation({
    onSuccess() {
      list.invalidate();
    },
  });
  const { mutateAsync: removeArticle } = api.article.remove.useMutation({
    onSuccess() {
      list.invalidate();
    },
  });

  const dateString = new Date().toISOString();

  const add = () => {
    addArticle({
      title: `My title : ${dateString}`,
      content: `My content : ${dateString}`,
      excerpt: `My author : ${dateString}`,
    });
  };

  const update = (id: number) => {
    updateArticle({
      id,
      data: {
        title: `My title : ${dateString}`,
        content: `My content : ${dateString}`,
        excerpt: `My author : ${dateString}`,
      },
    });
  };

  const remove = (id: number) => {
    removeArticle(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (!articles) return <div>No articles</div>;

  return (
    <div>
      <div className="mb-3 mt-3 flex items-center justify-center">
        <button
          onClick={add}
          className="rounded bg-black px-4 py-2 text-sm text-white hover:bg-slate-400"
        >
          Add
        </button>
      </div>
      <ul className="flex flex-col items-center justify-center gap-2">
        {articles.map((article) => (
          <li
            key={article.id}
            className="flex items-center justify-center gap-2 text-sm"
          >
            {article.title}
            <button
              onClick={() => update(article.id)}
              className="rounded bg-amber-400 px-4 py-2 text-sm text-white hover:bg-slate-400"
            >
              Edit
            </button>
            <button
              onClick={() => setCurrentId(article.id)}
              className="rounded bg-lime-600 px-4 py-2 text-sm text-white hover:bg-slate-400"
            >
              Detail
            </button>
            <button
              onClick={() => remove(article.id)}
              className="rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-slate-400"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {currentId !== -1 && (
        <ArticleDetails
          id={currentId}
          title={''}
          content={''}
          excerpt={''}
        ></ArticleDetails>
      )}
    </div>
  );
};

export default IndexPage;
