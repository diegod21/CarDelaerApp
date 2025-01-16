'use client';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      Loading...
    </div>
  );
}

function rp({ params, makeId, year }) {
  const [models, setModels] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchModels() {
      try {
        const response = await fetch(
          `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`,
        );
        const data = await response.json();
        setModels(data.Results || []);
      } catch (err) {
        setError('Failed to fetch vehicle models.');
      }
    }

    fetchModels();
  }, [makeId, year]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Vehicle Models for {year}
        </h1>

        <div className="mb-6">
          <Link href="/" passHref>
            <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition duration-300">
              Go Back
            </button>
          </Link>
        </div>

        {/* Envolver com Suspense */}
        <Suspense fallback={<LoadingFallback />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {models.length > 0 ? (
              models.map((model) => (
                <div
                  key={model.Model_ID}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    {model.Model_Name}
                  </h2>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-lg text-gray-500">
                No models found.
              </div>
            )}
          </div>
        </Suspense>
      </div>
    </div>
  );
}

export default rp;
