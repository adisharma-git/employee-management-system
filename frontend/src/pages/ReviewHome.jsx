"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function ReviewSection() {
  const reviews = [
    {
      id: 1,
      name: "Emily R.",
      role: "Product Manager",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      text: "Amazing experience and career-changing insights.",
    },
    {
      id: 2,
      name: "James K.",
      role: "Software Engineer",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      text: "Highly professional and structured platform.",
    },
    {
      id: 3,
      name: "Lisa Chen",
      role: "Marketing Director",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      text: "The community support is outstanding.",
    },
    {
      id: 4,
      name: "Michael T.",
      role: "Data Analyst",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      text: "Smooth process and real measurable results.",
    },
    {
      id: 5,
      name: "Anna W.",
      role: "UX Designer",
      image: "https://randomuser.me/api/portraits/women/5.jpg",
      text: "Beautiful design and very helpful structure.",
    },
    {
      id: 6,
      name: "David L.",
      role: "Consultant",
      image: "https://randomuser.me/api/portraits/men/6.jpg",
      text: "Clear roadmap and expert mentorship.",
    },
    {
      id: 7,
      name: "Sarah M.",
      role: "Founder",
      image: "https://randomuser.me/api/portraits/women/7.jpg",
      text: "Practical and actionable growth strategies.",
    },
    {
      id: 8,
      name: "Chris P.",
      role: "Developer",
      image: "https://randomuser.me/api/portraits/men/8.jpg",
      text: "Loved the clean execution and approach.",
    },
    {
      id: 9,
      name: "Olivia N.",
      role: "HR Lead",
      image: "https://randomuser.me/api/portraits/women/8.jpg",
      text: "Strong network building opportunities.",
    },
    {
      id: 10,
      name: "Daniel S.",
      role: "Architect",
      image: "https://randomuser.me/api/portraits/men/9.jpg",
      text: "Highly recommended for professionals.",
    },
  ];

  const [index, setIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsToShow(1);
      else if (window.innerWidth < 1024) setItemsToShow(2);
      else setItemsToShow(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev >= reviews.length - itemsToShow ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [itemsToShow, reviews.length]);

  return (
    <section className="w-full bg-white py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#e9efff] px-5 py-2 text-[#021f54] text-sm font-semibold mb-4">
            <span className="text-pink-500">❤</span>
            SUCCESS STORIES
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] mb-4">
            Trusted by 500+ Companies
          </h2>

          <p className="text-base md:text-lg text-slate-600 font-medium max-w-4xl mx-auto leading-relaxed">
            See what our customers have to say about their experience with our solution, Workalignr.
          </p>
        </div>

        <div className="relative"> 
          <div className="overflow-hidden py-10">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${index * (100 / itemsToShow)}%)`,
              }}
            >
              {reviews.map((review) => (
                <div 
                  key={review.id} 
                  className="px-3 shrink-0"
                  style={{ width: `${100 / itemsToShow}%` }}
                >
                  
                  <div
                    className="relative bg-[#f8fbff] rounded-3xl p-8 h-full border border-[#dbe8ff]
           shadow-[0_10px_28px_0_rgba(2,31,84,0.12)] hover:bg-[#f2f8ff] hover:-translate-y-2 transition-all duration-500"
                  >
                    <div className="absolute -top-4 left-6 text-6xl text-[#021f54]/15 font-serif pointer-events-none">
                      “
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                      <img
                        src={review.image}
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-[#FF7A00]/50 shadow-lg"
                      />
                      <div>
                        <h4 className="font-bold text-[#021f54] text-sm">
                          {review.name}
                        </h4>
                        <p className="text-xs text-slate-600">{review.role}</p>
                      </div>
                    </div>

                    <div className="flex gap-1 text-[#FF7A00] mb-4 text-xs">
                      {[...Array(5)].map((_, i) => (
                        <FontAwesomeIcon key={i} icon={faStar} />
                      ))}
                    </div>

                    <p className="text-slate-700 text-sm leading-relaxed">
                      {review.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}