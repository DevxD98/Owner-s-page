import React from 'react';

type StatCardProps = {
  title: string;
  value: number | string;
};

const StatCard = ({ title, value }: StatCardProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center">
      <h3 className="text-gray-800 font-medium text-center">{title}</h3>
      <p className="text-4xl font-bold mt-2">{value}</p>
    </div>
  );
};

export default StatCard;