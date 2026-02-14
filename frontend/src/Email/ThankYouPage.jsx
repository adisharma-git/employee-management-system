import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-6">
      <div className="bg-white max-w-xl w-full rounded-2xl shadow-xl p-10 text-center">
        <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-[#021f54]/10">
          <div className="w-12 h-12 rounded-full bg-[#021f54] flex items-center justify-center text-white text-2xl font-bold">
            ✓
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#021f54] mb-4">
          Thank You!
        </h1>

        <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
          We’ve received your request. Our team will get in touch with you
          shortly to help you explore how{" "}
          <span className="font-semibold text-orange-500">WorkAlignr</span>
          can streamline your employee management.
        </p>

        <div className="w-16 h-1 bg-orange-500 mx-auto mb-6 rounded-full"></div>

        <p className="text-sm text-gray-500 mb-8">
          Meanwhile, feel free to explore more about our platform.
        </p>

        <Link
          to="/"
          className="inline-block bg-[#021f54] text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
