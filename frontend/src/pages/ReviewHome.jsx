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

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev >= reviews.length - 4 ? 0 : prev + 1));
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-gradient-to-br from-[#081F4D] to-[#0B2A5B] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
          What Our Customers Say
        </h2>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${index * 25}%)`,
            }}
          >
            {reviews.map((review) => (
              <div key={review.id} className="w-1/4 px-4 shrink-0">
                <div
                  className="relative bg-white/95 backdrop-blur-md rounded-3xl p-8 h-full
                                shadow-[0_20px_60px_rgba(0,0,0,0.15)]
                                border border-white/20
                                hover:-translate-y-3 hover:shadow-[0_25px_80px_rgba(0,0,0,0.25)]
                                transition-all duration-500"
                >
                  <div className="absolute -top-6 left-6 text-6xl text-[#FF7A00]/15 font-serif">
                    “
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-14 h-14 rounded-full object-cover border-4 border-[#FF7A00] shadow-md"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {review.name}
                      </h4>
                      <p className="text-xs text-gray-500">{review.role}</p>
                    </div>
                  </div>

                  <div className="flex gap-1 text-[#FF7A00] mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FontAwesomeIcon key={i} icon={faStar} />
                    ))}
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {review.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
