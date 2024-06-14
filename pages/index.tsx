import Head from 'next/head';
import { Menu } from '../components/Menu';

const Home: React.FC = () => {
  return (
    <div className="container">
      <Head>
        <title>Loja Next</title>
      </Head>
      <Menu />
      <main>
        <h1>Página Inicial</h1>
      </main>
    </div>
  );
};

export default Home;
