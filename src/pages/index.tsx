import Collections from 'components/home/collections';
import Header from 'components/home/Header';
import InputForm from 'components/home/InputForm';

const Home = () => {
  return (
    <div className="w-full mx-auto max-w-7xl">
      <Header />
      <InputForm />
      <Collections />
    </div>
  );
};

export default Home;
