const ViewValue = ({ value }: { value: string | number }) => {
  return <p className='overflow-auto min-h-10 border  text-sm  p-2 rounded'>{value}</p>;
};

export default ViewValue;
