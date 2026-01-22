import React, { useEffect, useState } from "react";
import bgImage2 from "../../assets/landing_bg_2.jpg";
import { getAPI } from "../../utils/api";
import { Link } from "react-router-dom";
import FeaturedBarberCard from "./components/featured-barber-card/featured-barber-card.component";

export default function BarberSearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [barbers, setBarbers] = useState([]);

  useEffect(() => {
    const getClosestBarbers = async () => {
      try {
        const response = await getAPI("/barbers");
        setBarbers(response.data);
      } catch (err) {}
    };
    getClosestBarbers();
  }, []);

  const filteredBarbers = barbers.filter((barber) =>
    `${barber.name} ${barber.nickname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO SECTION with video */}
      <div
        className="relative h-96 w-full overflow-hidden bg-contain"
        style={{ backgroundImage: `url(${bgImage2})` }}
      >
        {/* <video
          className="absolute inset-0 w-full h-full object-cover"
          src="../../assets/landing_bg_2.jpg"
          autoPlay
          loop
          muted
        /> */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          <h1 className="text-4xl font-bold mb-4">Find a Barber</h1>
          <input
            type="text"
            placeholder="Search by name or nickname"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-lg px-4 py-2 rounded-lg bg-white/80 text-black placeholder-gray-500 focus:outline-none"
          />
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white shadow-md py-4 px-4 flex flex-wrap gap-4 justify-center">
        <select className="px-3 py-2 border rounded-lg">
          {/* <option value="">City</option> */}
          <option value="Denver">Denver</option>
          {/* <option value="Los Angeles">Los Angeles</option>
          <option value="Chicago">Chicago</option> */}
        </select>
        <select className="px-3 py-2 border rounded-lg">
          <option value="">Service</option>
          <option value="Haircuts">Haircuts</option>
          <option value="Beard Trim">Beard Trim</option>
        </select>
        <select className="px-3 py-2 border rounded-lg">
          <option value="">Rating</option>
          <option value="5">5 Stars</option>
          <option value="4.5">4.5+</option>
          <option value="4">4+</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Search
        </button>
      </div>

      <div className="my-5 px-20">
        <h3 className="text-2xl font-bold">Featured Barbers</h3>
        <div
          className="flex flex-row flex-nowrap overflow-x-auto gap-5 mt-5 snap-x 
            snap-mandatory
            scroll-smooth
            [-webkit-overflow-scrolling:touch]"
        >
          {filteredBarbers.map((barber) => (
            <FeaturedBarberCard barber={barber} />
          ))}
        </div>
      </div>

      {/* BARBER LIST */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
        <h3 className="text-2xl font-bold">Results for {searchTerm}:</h3>
        {filteredBarbers.map((barber) => (
          <div
            key={barber.id}
            className="flex items-center bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={barber.picture}
              alt={barber.name}
              className="w-20 h-20 object-cover"
            />
            <div className="flex-1 p-4">
              <h2 className="text-lg font-semibold">
                {barber.nickname || barber.name}
              </h2>
              <p className="text-sm text-gray-600">
                Works at {"Blueprint" /*barber.shop*/}
              </p>
              <p className="text-sm text-gray-600">
                ⭐ {"5" /*barber.rating*/} | {"Denver" /*barber.city*/}
              </p>
              {/* <p className="text-sm text-gray-500">
                {barber.services.join(", ")}
              </p> */}
            </div>
            <div className="px-4">
              <Link
                to={`/barbers/${barber._id}`}
                className="text-blue-600 font-medium hover:underline"
              >
                View →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
