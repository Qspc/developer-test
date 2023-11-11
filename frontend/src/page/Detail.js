import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function DetailPage() {
  const userId = useLocation().pathname.split('/')[1];
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');
    axios
      .get(`http://localhost:4000/api/v1/job/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data.content);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="flex flex-col gap-2 px-5 py-2">
      {/* back button */}
      <Link to={`/`} className="font-bold text-blueOne">
        🔙 back
      </Link>
      {/* page detail */}
      <div className="border border-blue-100 rounded shadow appearance-none resize-none focus:outline-none focus:shadow-outline">
        <div className="flex flex-col w-full gap-10 p-4 ">
          {/* type, location, title */}
          <div>
            <div>
              {data.type} / {data.location}
            </div>
            <div className="text-3xl font-bold text-blueOne"> {data.title} </div>
          </div>
          {/* description */}
          <div className="flex justify-between">
            {/* description */}
            <div className="w-[60%] text-justify" dangerouslySetInnerHTML={{ __html: data.description }}></div>
            {/* logo & apply */}
            <div className=" w-[30%] flex flex-col gap-8 ">
              <div className="border border-blue-100 rounded shadow appearance-none resize-none focus:outline-none focus:shadow-outline">
                <div className="p-2">
                  <div className="font-bold">{data.company}</div>
                  <a href={`/${data.company_url}`} className="underline text-blueOne">
                    {data.company_url}
                  </a>
                </div>
              </div>
              <div className="border border-blue-100 rounded shadow appearance-none resize-none focus:outline-none focus:shadow-outline">
                <div className="p-4">
                  <div className="font-bold">How to apply</div>
                  <div dangerouslySetInnerHTML={{ __html: data.how_to_apply }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
