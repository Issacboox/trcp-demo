import Layout from '~/features/components/layout/Admin';
import { type NextPageWithLayout } from '../_app';

const IndexPage: NextPageWithLayout = () => {
  return <div>Index Page</div>;
};

IndexPage.getLayout = Layout;

export default IndexPage;
