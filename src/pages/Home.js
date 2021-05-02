import Favorites from "../components/Favorites";
import HomeLayout from "../components/layout/HomeLayout";

const Home = () => {
  return (
    <>
      <HomeLayout>
        <Favorites />
      </HomeLayout>
    </>
  );
};

export default Home;
