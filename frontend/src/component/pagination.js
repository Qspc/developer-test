export default function Pagination({ handleNext, handlePrev }) {
  return (
    <div className="flex gap-4">
      <button
        className="px-6 py-2 font-bold text-center text-white duration-300 ease-in-out border-2 border-solid rounded cursor-pointer hover:shadow-sm font-700 hover:bg-blue-500 bg-blueOne hover:border-blue-500 hover:scale-90"
        onClick={handlePrev}
      >
        Prev
      </button>
      <button
        className="px-6 py-2 font-bold text-center text-white duration-300 ease-in-out border-2 border-solid rounded cursor-pointer hover:shadow-sm font-700 hover:bg-blue-500 bg-blueOne hover:border-blue-500 hover:scale-90"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
}
