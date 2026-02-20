import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";

export default function MainPageLanding() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async () => {
    if (!email) {
      alert("Please enter your email");
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
      alert("Something went wrong ❌");
    }
    setLoading(false);
  };

  return (
    <section className="relative min-h-screen bg-white pt-36 pb-24 px-6 flex items-center justify-center overflow-hidden">
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
        <div className="solid-shape shape-box color-navy w-36 h-36 top-[5%] left-[2%] delay-1" />
        <div className="solid-shape shape-circle color-orange w-16 h-16 top-[25%] left-[12%] delay-2" />
        <div className="solid-shape shape-box color-orange w-10 h-10 top-[15%] left-[20%] delay-3" />

        <div className="solid-shape shape-box color-orange w-44 h-44 bottom-[5%] left-[5%] delay-2" />
        <div className="solid-shape shape-circle color-navy w-24 h-24 bottom-[30%] left-[15%] delay-1" />
       
        <div className="solid-shape shape-box color-orange w-40 h-40 top-[8%] right-[5%] delay-3" />
        <div className="solid-shape shape-circle color-navy w-20 h-20 top-[30%] right-[12%] delay-1" />
       
        <div className="solid-shape shape-box color-navy w-32 h-32 bottom-[10%] right-[3%] delay-1" />
        <div className="solid-shape shape-circle color-orange w-28 h-28 bottom-[25%] right-[15%] delay-2" />
      </div>      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div
          className={`transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#021f54] leading-tight mb-7">
            All-in-One Employee
            <span className="block mt-2 text-orange-500">
              Management <span className="text-[#021f54]">Platform</span>
            </span>
          </h1>

          <p className="text-gray-800 font-medium max-w-2xl mx-auto mb-12 text-base sm:text-lg leading-relaxed">
            Manage attendance, payroll, leaves, and performance with ease using
            our secure and scalable employee management system.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
            <div className="relative w-full">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email"
                className="w-full px-5 py-4 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#021f54] bg-white shadow-lg"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-[#021f54] text-white py-4 rounded-xl font-semibold hover:bg-[#032a70] transition-all transform hover:scale-105 active:scale-95 shadow-xl"
            >
              {loading ? "Sending..." : "Get a Quote!"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}