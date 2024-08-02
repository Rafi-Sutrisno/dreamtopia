import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> Goals Based Dreams</span>
      </h1>

      <p className="desc text-center">
        Dreamstopia is an open-source tool to discover and share your dreams to
        other people. Dreamstopia encourages everyone from around the world to
        fight for their dreams.
      </p>
      <Feed />
    </section>
  );
};

export default Home;
