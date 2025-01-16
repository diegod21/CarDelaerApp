import { Suspense } from 'react';
import ResultPage from '@/views/rp';

export async function generateStaticParams() {
  console.log('1');

  const response = await fetch(
    'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json',
  );
  const data = await response.json();
  const makes = data.Results;
  const paths = [];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2014 }, (_, i) => 2015 + i);

  makes.forEach((make) => {
    years.forEach((year) => {
      paths.push({ makeId: make.MakeId.toString(), year: year.toString() });
    });
  });

  return paths;
}

export default function Result({ params }) {
  return (
    <Suspense fallback={<div>Loading vehicle models...</div>}>
      <ResultPage year={params.year} makeId={params.makeId} />
    </Suspense>
  );
}
