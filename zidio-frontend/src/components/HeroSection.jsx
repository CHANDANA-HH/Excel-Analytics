
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/bg.jpeg';

const HeroSection = () => {
  return (
    <section
      className="relative w-full h-[100vh] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-center px-20"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >


      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-800 mb-4">
          From Sheets to Stunning 2D and 3D Charts
        </h1>
        <h2 className="text-3xl md:text-4xl font-extrabold text-indigo-700 mb-4">– GraphiXcel</h2>

        <p className="text-lg md:text-xl text-gray-800 font-medium max-w-2xl mb-6 text-center mx-auto">
          Upload Excel files. Visualize data instantly. Make smarter decisions with intuitive dashboards.
        </p>

        <div className="flex justify-center items-center gap-4 text-gray-700 font-semibold text-lg md:text-xl mb-6">
          <span className="text-3xl font-extrabold text-indigo-800">•</span>
          <span>Upload</span>
          <span className="text-3xl font-extrabold text-indigo-800">•</span>
          <span>Analyze</span>
          <span className="text-3xl font-extrabold text-indigo-800">•</span>
          <span>Visualize</span>
        </div>

        <Link
          to="/upload"
          className="px-8 py-4 bg-indigo-700 text-white rounded-full text-lg font-semibold hover:bg-indigo-800 transition"
        >
          Get Started
        </Link>

      </div>
    </section>
  );
};


export default HeroSection;
