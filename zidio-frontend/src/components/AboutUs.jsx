const AboutUs = () => {
    return (
        <section id="about" className="w-full px-6 py-20 bg-white flex flex-col items-center">
            {/* Main About Boxes */}
            <div className="relative w-full max-w-7xl flex flex-col md:flex-row items-stretch justify-center">
                {/* LEFT BOX — Header */}
                <div className="bg-indigo-700 text-white w-full md:w-[35%] rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none p-10 shadow-2xl flex items-center justify-center z-10">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-center leading-tight">ABOUT US</h2>
                </div>

                {/* RIGHT BOX — Description */}
                <div className="bg-white w-full md:w-[65%] rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none p-10 shadow-2xl -mt-4 md:-ml-6 z-10 border border-indigo-100">
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                        At <strong >GraphiXcel</strong>, At GraphiXcel, we believe that raw data should never be a barrier to understanding. Our mission is to simplify data visualization by turning everyday Excel spreadsheets into meaningful 2D and 3D graphs—instantly, intuitively, and beautifully.
                        Designed with both professionals and everyday users in mind, GraphiXcel empowers you to transform complex data into interactive visuals with just a few clicks. No advanced tools, no coding — just seamless, clean, and insightful visuals from your .xlsx, .xls, or .csv files.
                        We are committed to making data accessible, actionable, and aesthetically engaging — because when you see your data clearly, you make better decisions faster.
                    </p>
                </div>
            </div>

            {/*  ROW OF CARDS BELOW */}
            <div className="w-full max-w-7xl mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                {/* Mission */}
                <div className="bg-indigo-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300">
                    <h3 className="text-xl font-semibold text-indigo-700 mb-2">Our Mission</h3>
                    <p className="text-gray-600 text-sm">
                        Simplify data analysis through interactive visual tools that anyone can use — from students to professionals.
                    </p>
                </div>

                {/* Vision */}
                <div className="bg-indigo-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300">
                    <h3 className="text-xl font-semibold text-indigo-700 mb-2">Our Vision</h3>
                    <p className="text-gray-600 text-sm">
                        To become the go-to platform for transforming spreadsheet data into meaningful visual stories.
                    </p>
                </div>

                {/* Why Choose Us */}
                <div className="bg-indigo-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300">
                    <h3 className="text-xl font-semibold text-indigo-700 mb-2">Why Choose Us?</h3>
                    <p className="text-gray-600 text-sm">
                        We combine simplicity, speed, and beauty in one tool — delivering impactful insights with minimal effort.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
