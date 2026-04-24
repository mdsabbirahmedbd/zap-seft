import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useLoaderData } from "react-router";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function FlyToDistrict({ position }) {
  const map = useMap();
  if (position) {
    map.flyTo(position, 10, { duration: 1 });
  }
  return null;
}

const Covarage = () => {
  const bdCenter = [23.685, 90.3563];
  const Services = useLoaderData();
  const [search,setSearch] =  useState("")
  const [flyTo,setFlyto] = useState(null)
  const [filtred,setFiltred] = useState(Services)


  const handleSearch = e => {
    e.preventDefault()
    const match = Services.filter((item) => item.district.toLowerCase().includes(search.toLowerCase()))
    setFiltred(match)
    if(match[0]){
        setFlyto([match[0].latitude,match[0].longitude])
    }
  }

  


  return (
    <div className=" mx-auto py-16 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-[#033F3A]">
        We are available in 64 districts
      </h1>
      <form onSubmit={handleSearch}>
<div className="flex items-center lg:w-1/2 bg-[#F3F5F9] px-3 py-1 my-6 rounded-full shadow-sm">
        <FaSearch className="text-gray-500 text-2xl" />
        <input
          type="text"
          placeholder="Search here"
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent ml-3 outline-none"
        />
        <button type="submit" className="bg-[#CAEB66] cursor-pointer  px-6 py-3 rounded-full font-semibold">
          Search
        </button>
      </div>
      </form>
      <div className="w-full h-px bg-gray-200 my-12"></div>

      {/* Second Title */}
      <h2 className="text-2xl font-bold text-[#033F3A] mb-4">
        We deliver almost all over Bangladesh
      </h2>

      {/* Map */}
      <div className="w-full  rounded-xl shadow">
        <div className="w-full h-[600px]">
          <MapContainer
            center={bdCenter}
            zoom={7}
            scrollWheelZoom={true}
            style={{ width: "100%", height: "100%" }}
          >
            <FlyToDistrict position={flyTo} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap contributors"
            />

            {/* Show markers for each district */}
            {filtred.map((servic, idx) => (
              <Marker key={idx} position={[servic.latitude, servic.longitude]}>
                <Popup>
                  <strong>{servic.district}</strong>
                  <br />
                  {servic.covered_area.join(", ")}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Covarage;
