import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../component/pagination';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('');
  const [type, setType] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // page
  const [totalPages, setTotalPages] = useState(1); // total page
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');
    axios
      .get('http://localhost:4000/api/v1/job', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data.content);
        setFilter(res.data.content);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleFilter = () => {
    if (type) {
      const newData = data.filter((item) => item.type === 'Full time');
      setFilter(newData);
    }
    if (!search && !!country) setFilter(data);

    const newData = data.filter((item) => Object.values(item.title).join('').toLowerCase().includes(search.toLowerCase()) && Object.values(item.location).join('').toLowerCase().includes(country.toLowerCase()));
    // const newData = data.filter((item) => Object.values(item.title).join('').toLowerCase().includes(search.toLowerCase()));
    setFilter(newData);
    setCurrentPage(1);
  };

  const PER_PAGE = 5;
  const startIndex = (currentPage - 1) * PER_PAGE;
  const endIndex = startIndex + PER_PAGE;
  const page = Math.ceil(filter.length / PER_PAGE);
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < page) {
      setCurrentPage(currentPage + 1);
    }
  };
  const itemsToShow = filter.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col min-h-screen gap-5 px-5 bg-blueTwo">
      {/* title */}
      <div className="text-4xl font-bold text-center">Job List</div>
      {/* filter */}
      <div className="flex items-center gap-4 align-middle">
        {/* filter name */}
        <input
          value={search}
          placeholder="filter by title"
          onChange={(e) => setSearch(e.target.value)}
          className="w-64 px-2 py-2 text-gray-700 border border-blue-100 rounded shadow appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 "
        />
        <input
          value={country}
          placeholder="filter by city"
          onChange={(e) => setCountry(e.target.value)}
          className="w-64 px-2 py-2 text-gray-700 border border-blue-100 rounded shadow appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 "
        />
        {/* filter full time */}
        <div>
          <input value={type} type="checkbox" onChange={() => setType(!type)} /> full time only
        </div>
        {/* button ssearch */}
        <button
          onClick={handleFilter}
          className="px-6 py-2 font-bold text-center text-white duration-300 ease-in-out border-2 border-solid rounded cursor-pointer hover:shadow-sm font-700 hover:bg-blue-500 bg-blueOne hover:border-blue-500 hover:scale-90"
        >
          Search
        </button>
      </div>
      {/* list job */}
      <div className="flex h-[500px] flex-col items-center w-full gap-4 py-4 align-middle justify-between bg-white border border-blue-100 rounded shadow appearance-none resize-none focus:outline-none focus:shadow-outline">
        {/* card */}
        <div className="w-[90%] h-full flex flex-col justify-center items-center align-middle gap-4 ">
          {itemsToShow.map((data, index) => (
            <Link className="flex justify-between w-full px-4 py-2 border border-solid rounded-md shadow-md" to={`/${data.id}`} key={index}>
              <div>
                <div className="font-bold text-blueOne "> {data.title} </div>
                <div>
                  {data.company} - <span className="font-bold">{data.type}</span>
                </div>
              </div>
              <div> {data.location} </div>
            </Link>
          ))}
        </div>
        {/* pagination */}
        <Pagination handleNext={handleNext} handlePrev={handlePrev} />
      </div>
    </div>
  );
}
