'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import SelectCars from '@/app/Components/selectCars';
import SelectedYear from '@/app/Components/selectYear';

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      Loading...
    </div>
  );
}

function Filter() {
  const [makes, setMakes] = useState([]);
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [isClient, setIsClient] = useState(false);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2014 }, (_, i) => 2015 + i);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);

      async function fetchMakes() {
        const response = await fetch(
          'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json',
        );
        const data = await response.json();
        setMakes(data.Results);
      }
      fetchMakes();
    }
  }, []);

  if (!isClient) {
    return <LoadingFallback />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Filter Vehicles</h1>
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Vehicle Make
          </label>
          {/* Suspense adicionado aqui */}
          <Suspense fallback={<LoadingFallback />}>
            <SelectCars
              makes={makes}
              selectedMake={selectedMake}
              setSelectedMake={setSelectedMake}
            />
          </Suspense>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Model Year
          </label>
          <SelectedYear
            years={years}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
        </div>

        <Link
          href={
            selectedMake && selectedYear
              ? `/result/${selectedMake}/${selectedYear}`
              : '#'
          }
          passHref
        >
          <div
            className={`block text-center py-2 px-4 rounded bg-blue-500 text-white font-medium ${
              selectedMake && selectedYear
                ? 'hover:bg-blue-600'
                : 'opacity-50 cursor-not-allowed'
            }`}
            onClick={(e) => {
              if (!selectedMake || !selectedYear) e.preventDefault();
            }}
          >
            Next
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Filter;
