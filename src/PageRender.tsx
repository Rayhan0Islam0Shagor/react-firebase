import React from 'react';
import { useParams } from 'react-router-dom';
import NotFound from './pages/notfound';
import { IParams } from './types';

const generatePage = (name: string) => {
  const page = () => require(`./pages/${name}`).default;

  try {
    return React.createElement(page());
  } catch (err) {
    return <NotFound />;
  }
};

const PageRender = () => {
  const { page, id }: IParams = useParams();

  let name = '';
  if (page) {
    name = id ? `${page}/[id]` : `${page}`;
  }

  return generatePage(name);
};

export default PageRender;
