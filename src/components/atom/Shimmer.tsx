import React from 'react';

const Shimmer = () => {
  return (
    <div className="animate-pulse flex space-x-4">
      <div className="w-12 h-10 mr-2 rounded-full bg-slate-400" />
      <div className="w-full h-10 rounded-xl bg-slate-400" />
    </div>
  );
};

export default Shimmer;
