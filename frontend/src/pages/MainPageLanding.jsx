import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import ToastContainer from "../Toaster/Toast";

export default function MainPageLanding() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = (type, message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const navigate = useNavigate();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsVisible(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const handleSubmit = async () => {
    if (!email) {
      addToast("error", "Please enter your email");
      return;
    }
    setLoading(true);
    try {
      await emailjs.send(
        "service_ipl26up",   
        "template_2qlv5ud", 
        { user_email: email },
        "uF9BCZTT64heEVjiT"  
      );
      navigate("/thank-you");  
    } catch (error) {
      console.error(error);
      addToast("error", "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <section className="relative min-h-screen bg-white pt-24 sm:pt-32 lg:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 flex items-center justify-center overflow-hidden">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <style>{`
        @keyframes shuffle {
          0% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(50px, -40px) rotate(8deg); }
          66% { transform: translate(-40px, 50px) rotate(-8deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }

        .solid-shape {
          position: absolute;
          animation: shuffle 18s ease-in-out infinite;
          pointer-events: none;
          z-index: 0;
          /* Removed blur and glossy gradients */
        }

        .shape-box { border-radius: 20px; }
        .shape-circle { border-radius: 50%; }

        /* Darker Navy Shapes */
        .color-navy { 
          background-color: rgba(2, 31, 84, 0.85); 
          border: 2px solid #021f54;
          box-shadow: 0 15px 35px rgba(2, 31, 84, 0.2);
        }

        /* Darker Orange Shapes */
        .color-orange { 
          background-color: rgba(249, 115, 22, 0.9); 
          border: 2px solid #ea580c;
          box-shadow: 0 15px 35px rgba(249, 115, 22, 0.25);
        }

        .delay-1 { animation-delay: -2s; }
        .delay-2 { animation-delay: -5s; }
        .delay-3 { animation-delay: -10s; }
      `}</style>

      <div className="absolute inset-0 z-0">
        <div className="solid-shape shape-box color-navy w-20 h-20 sm:w-36 sm:h-36 top-[8%] left-[2%] delay-1 opacity-80 sm:opacity-100" />
        <div className="solid-shape shape-circle color-orange w-10 h-10 sm:w-16 sm:h-16 top-[25%] left-[10%] delay-2 opacity-80 sm:opacity-100" />
        <div className="solid-shape shape-box color-orange w-8 h-8 sm:w-10 sm:h-10 top-[16%] left-[18%] delay-3 opacity-80 sm:opacity-100" />

        <div className="solid-shape shape-box color-orange w-24 h-24 sm:w-44 sm:h-44 bottom-[7%] left-[3%] delay-2 opacity-80 sm:opacity-100" />
        <div className="solid-shape shape-circle color-navy w-14 h-14 sm:w-24 sm:h-24 bottom-[28%] left-[12%] delay-1 opacity-80 sm:opacity-100" />
       
        <div className="solid-shape shape-box color-orange w-24 h-24 sm:w-40 sm:h-40 top-[10%] right-[4%] delay-3 opacity-80 sm:opacity-100" />
        <div className="solid-shape shape-circle color-navy w-12 h-12 sm:w-20 sm:h-20 top-[30%] right-[10%] delay-1 opacity-80 sm:opacity-100" />
       
        <div className="solid-shape shape-box color-navy w-20 h-20 sm:w-32 sm:h-32 bottom-[10%] right-[2%] delay-1 opacity-80 sm:opacity-100" />
        <div className="solid-shape shape-circle color-orange w-16 h-16 sm:w-28 sm:h-28 bottom-[26%] right-[12%] delay-2 opacity-80 sm:opacity-100" />
      </div>      
      <div className="relative z-10 max-w-4xl mx-auto text-center w-full">
        <div
          className={`transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#021f54] leading-tight mb-5 sm:mb-7 px-1">
            All-in-One Employee
            <span className="block mt-2 text-orange-500">
              Management <span className="text-[#021f54]">Platform</span>
            </span>
          </h1>

          <p className="text-gray-800 font-medium max-w-2xl mx-auto mb-8 sm:mb-12 text-sm sm:text-lg leading-relaxed px-1">
            Manage attendance, payroll, leaves, and performance with ease using
            our secure and scalable employee management system.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-xl mx-auto w-full">
            <div className="relative w-full">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email"
                className="w-full px-4 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#021f54] bg-white shadow-lg"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full sm:w-auto sm:px-8 bg-[#021f54] text-white py-3.5 sm:py-4 rounded-xl font-semibold hover:bg-[#032a70] transition-all transform hover:scale-105 active:scale-95 shadow-xl"
            >
              {loading ? "Sending..." : "Get Quote!"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}