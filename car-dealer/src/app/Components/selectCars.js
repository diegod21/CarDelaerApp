function SelectCars({ makes, selectedMake, setSelectedMake }) {
  return (
    <select
      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none"
      value={selectedMake}
      onChange={(e) => setSelectedMake(e.target.value)}
    >
      <option value="">Select a make</option>
      {makes.map((make) => (
        <option key={make.MakeId} value={make.MakeId}>
          {make.MakeName}
        </option>
      ))}
    </select>
  );
}

export default SelectCars;
