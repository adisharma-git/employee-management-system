import React from 'react';

const Button = ({ 
  text, 
  onClick, 
  color = 'bg-blue-600', 
  textColor = 'text-white', 
  icon, 
  className = '' 
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-6 py-2 rounded-sm font-semibold transition-all hover:opacity-90 active:scale-95 ${color} ${textColor} ${className}`}
    >
      {icon && <span className="text-xl">{icon}</span>}
      {text}
    </button>
  );
};

export default Button;