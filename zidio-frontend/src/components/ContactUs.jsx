const ContactUs = () => {
    return (
        <section id="contact" className="w-full bg-indigo-50 py-20 px-6 flex justify-center items-center">
            <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl p-10 md:p-16 grid md:grid-cols-2 gap-10">

                {/* Left side — Heading + description */}
                <div>
                    <h2 className="text-4xl font-extrabold text-indigo-700 mb-4">Contact Us</h2>
                    <p className="text-gray-600 mb-6">
                        Have questions or need help? Fill out the form and we’ll get back to you as soon as possible.
                    </p>

                    <div className="space-y-4 text-gray-700 text-sm">
                        <p><strong>Email:</strong> support@graphixcel.com</p>
                        <p><strong>Phone:</strong> +91 98765 43210</p>
                        <p><strong>Address:</strong> 123, Zidio Street, Data City, India</p>
                    </div>
                </div>

                {/* Right side — Contact Form */}
                <form className="space-y-5">
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <textarea
                        rows="5"
                        placeholder="Your Message"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    ></textarea>
                    <button
                        type="submit"
                        className="w-full py-3 bg-indigo-700 text-white font-semibold rounded-md hover:bg-indigo-800 transition"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    );
};

export default ContactUs;
