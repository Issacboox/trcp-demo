import Link from 'next/link';
import { type ReactNode } from 'react';

interface LayoutPops {
  children: ReactNode;
}

const NormalLayout = ({ children }: LayoutPops) => {
  return (
    <>
      <header>
        <ul>
          <li>
            <Link href="/articles">Article</Link>
          </li>
          <li>
            <Link href="/articles/hello">Article</Link>
          </li>
        </ul>
      </header>
      <main>{children}</main>
      <footer>Footer</footer>
    </>
  );
};

export default NormalLayout;
