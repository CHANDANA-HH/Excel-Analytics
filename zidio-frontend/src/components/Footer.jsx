const Footer = () => {
    return (
        <footer className="bg-indigo-800 text-white text-sm py-6 px-4 mt-20">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

                {/* Left — Copyright */}
                <p className="text-center md:text-left">
                    © {new Date().getFullYear()} GraphiXcel. All rights reserved.
                </p>

                {/* Right — Optional links */}
                <div className="flex gap-4">
                    <a href="#privacy" className="hover:underline">Privacy Policy</a>
                    <a href="#terms" className="hover:underline">Terms of Use</a>
                    <a href="#contact" className="hover:underline">Contact</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
