import Button from "@/components/Button";

const HomeView = () => {
  return (
    <div className="hero-section flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to Grammar Correction App
      </h1>
      <h2 className="text-2xl font-semibold mb-2">
        Your perfect grammar companion
      </h2>
      <p className="text-lg mb-6 text-center">
        Improve your writing with our advanced grammar correction tool. Get
        started now and see the difference!
      </p>
      <Button/>
    </div>
  );
};

export default HomeView;
