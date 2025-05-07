// src/pages/Cat.jsx
import React from "react";

const Cat = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-100 to-pink-200">
      <h1
        className="text-4xl font-bold mb-6"
        // style={{ fontFamily: "sans-serif" }}
      >
        Tan Quoc cutephomaique 🐱💜
      </h1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 300"
        width="300"
        height="300"
      >
        <path
          d="M320 200 Q340 180 330 150 Q320 130 300 140 Q310 170 290 190"
          fill="#c084fc"
          stroke="#a855f7"
          strokeWidth="5"
        />
        <ellipse cx="200" cy="200" rx="90" ry="60" fill="#c084fc" />
        <ellipse
          cx="200"
          cy="215"
          rx="80"
          ry="50"
          fill="#a855f7"
          opacity="0.3"
        />
        <circle cx="140" cy="130" r="50" fill="#c084fc" />
        <circle cx="145" cy="135" r="45" fill="#a855f7" opacity="0.2" />
        <polygon points="110,90 120,50 130,90" fill="#c084fc" />
        <polygon points="170,90 160,50 150,90" fill="#c084fc" />
        <polygon points="118,85 120,60 125,85" fill="#f9a8d4" />
        <polygon points="152,85 158,60 160,85" fill="#f9a8d4" />
        <circle cx="125" cy="130" r="8" fill="#000" />
        <circle cx="155" cy="130" r="8" fill="#000" />
        <circle cx="127" cy="128" r="2" fill="#fff" />
        <circle cx="157" cy="128" r="2" fill="#fff" />
        <polygon points="140,145 135,150 145,150" fill="#f472b6" />
        <path
          d="M135 150 Q140 155 145 150"
          stroke="#000"
          strokeWidth="2"
          fill="none"
        />
        <line
          x1="110"
          y1="140"
          x2="80"
          y2="135"
          stroke="#000"
          strokeWidth="2"
        />
        <line
          x1="110"
          y1="145"
          x2="80"
          y2="145"
          stroke="#000"
          strokeWidth="2"
        />
        <line
          x1="170"
          y1="140"
          x2="200"
          y2="135"
          stroke="#000"
          strokeWidth="2"
        />
        <line
          x1="170"
          y1="145"
          x2="200"
          y2="145"
          stroke="#000"
          strokeWidth="2"
        />
        <circle cx="160" cy="250" r="15" fill="#c084fc" />
        <circle cx="240" cy="250" r="15" fill="#c084fc" />
      </svg>
    </div>
  );
};

export default Cat;
