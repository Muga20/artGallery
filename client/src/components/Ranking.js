import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

// Define an array called 'collection' containing objects representing items in a collection.
const collection = [
  {
    id: 1,
    name: "Collection 1",
    price: "250",
    volume: "25",
    image:
      "https://i.seadn.io/gcs/files/365d0c7270b8cecd800e84279c01ebd5.jpg?auto=format&dpr=1&w=136&h=136&fr=1",
  },
  {
    id: 2,
    name: "Collection 2",
    price: "250",
    volume: "25",
    image:
      "https://i.seadn.io/gcs/files/8573c42207ea4d7dc1bb6ed5c0b01243.jpg?auto=format&dpr=1&w=136&h=136&fr=1",
  },
  {
    id: 3,
    name: "Collection 3",
    price: "250",
    volume: "25",
    image:
      "https://i.seadn.io/gcs/files/896d7a263307bf77f383e718753659b5.png?auto=format&dpr=1&w=136&h=136&fr=1",
  },
  {
    id: 4,
    name: "Collection 4",
    price: "250",
    volume: "25",
    image:
      "https://i.seadn.io/gcs/files/1619b033c453fe36c5d9e2ac451379a7.png?auto=format&dpr=1&w=136&h=136&fr=1",
  },
  {
    id: 5,
    name: "Collection 5",
    price: "250",
    volume: "25",
    image:
      "https://i.seadn.io/gcs/files/21c3433caf7b08c857043d2a5ede0870.gif?auto=format&dpr=1&w=136&h=136&fr=1",
  },
  {
    id: 6,
    name: "Collection 6",
    price: "250",
    volume: "25",
    image:
      "https://i.seadn.io/gcs/files/c388840a729e6183fc0b3c7f1e9d5838.png?auto=format&dpr=1&w=136&h=136&fr=1",
  },
];

const art = [
  {
    id: 1,
    name: "Art 1",
    price: "250",
    volume: "25",
    image:
      "https://i.seadn.io/gcs/files/365d0c7270b8cecd800e84279c01ebd5.jpg?auto=format&dpr=1&w=136&h=136&fr=1",
  },
  {
    id: 2,
    name: "Art 2",
    price: "250",
    volume: "25",
    image:
      "https://i.seadn.io/gcs/files/8573c42207ea4d7dc1bb6ed5c0b01243.jpg?auto=format&dpr=1&w=136&h=136&fr=1",
  },
  {
    id: 3,
    name: "Art 3",
    price: "250",
    volume: "25",
    image:
      "https://i.seadn.io/gcs/files/896d7a263307bf77f383e718753659b5.png?auto=format&dpr=1&w=136&h=136&fr=1",
  },
  {
    id: 4,
    name: "Art 4",
    price: "250",
    volume: "25",
    image:
      "https://i.seadn.io/gcs/files/1619b033c453fe36c5d9e2ac451379a7.png?auto=format&dpr=1&w=136&h=136&fr=1",
  },
  {
    id: 5,
    name: "Art 5",
    price: "250",
    volume: "25",
    image:
      "https://i.seadn.io/gcs/files/21c3433caf7b08c857043d2a5ede0870.gif?auto=format&dpr=1&w=136&h=136&fr=1",
  },
  {
    id: 6,
    name: "Art 6",
    price: "250",
    volume: "25",
    image:
      "https://i.seadn.io/gcs/files/c388840a729e6183fc0b3c7f1e9d5838.png?auto=format&dpr=1&w=136&h=136&fr=1",
  },
];

const TableHeader = () => (
  <thead>
    <tr className="bg-gray-100">
      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
        Rank
      </th>
      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
        Image
      </th>
      {/* Hidden on mobile */}
      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
        Floor Price
      </th>
      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
        Volume
      </th>
    </tr>
  </thead>
);

export default function Ranking() {
  const [activeTab, setActiveTab] = useState("trending");
  const [activeTrending, setActiveTrending] = useState("days");

  const [selectedCollection, setSelectedCollection] = useState(null);
  const handleCollectionClick = (collection) => {
    setSelectedCollection(collection);
  };

  return (
    <div className="px-4 py-8 sm:px-2 md:px-4 lg:px-6 xl:px-8">
      {/*  
    <div className="flex flex-col md:flex-row md:items-center">
        <div className="bg-gray-100 p-1 rounded-lg shadow-md w-full md:w-40 md:h-14 md:flex md:mr-4">
          <button
            className={`w-full h-12 rounded-lg ${
              activeTab === "trending"
                ? "bg-blue-500 text-white hover:bg-blue-400"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActiveTab("trending")}
          >
            Trending
          </button>
          <button
            className={`w-full h-12 rounded-lg ${
              activeTab === "top"
                ? "bg-blue-500 text-white  hover:bg-blue-400"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActiveTab("top")}
          >
            Top
          </button>
        </div>

        <div className="bg-gray-100 p-1 rounded-lg shadow-md w-full md:w-40 md:h-14 md:flex md:mr-4 mt-4 md:mt-0">
          <button
            className={`w-full h-12 rounded-lg ${
              activeTrending === "days"
                ? "bg-blue-500 text-white  hover:bg-blue-400"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActiveTrending("days")}
          >
            24 Hrs
          </button>
          <button
            className={`w-full h-12 rounded-lg ${
              activeTrending === "weeks"
                ? "bg-blue-500 text-white  hover:bg-blue-400"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActiveTrending("weeks")}
          >
            7 Days
          </button>
        </div>

        <div className="bg-gray-100 p-1 rounded-lg shadow-md w-full md:w-40 md:h-14 md:flex md:mr-4 mt-4 md:mt-0">
          <button className="bg-blue-500  hover:bg-blue-400 w-full h-12 rounded-lg">
            All Chains
          </button>
        </div>

        <div className="bg-gray-100 p-1 rounded-lg shadow-md w-full md:w-40 md:h-14 md:flex md:mr-4 mt-4 md:mt-0">
          <button className="bg-blue-500  hover:bg-blue-400 w-full h-12 rounded-lg">
            View All
          </button>
        </div>
      </div>
  */}

      <div className="px-4 py-8 sm:px-2 md:px-4 lg:px-6 xl:px-8">
        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
          <div className="overflow-x-auto w-full pl-2">
            <table className="table-auto w-full border-collapse">
              <TableHeader />
              <tbody>
                {collection.map((row) => (
                  <tr
                    key={row.id}
                    className="border-gray-200 hover:bg-slate-900  cursor-pointer"
                    onClick={() => handleCollectionClick(row)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {" "}
                      <img
                        src={row.image}
                        alt="Image"
                        className="w-16 h-16 rounded-lg object-cove transition-transform transform scale-100 hover:scale-105"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Ksh {row.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-medium text-lg text-gray-500">
                      Ksh {row.volume}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="overflow-x-auto w-full pl-19">
            <table className="table-auto w-full border-collapse">
              <TableHeader />
              <tbody>
                {art.map((row) => (
                  <tr
                    key={row.rank}
                    className="border-gray-200 hover:bg-slate-900  cursor-pointer"
                    onClick={() => handleCollectionClick(row)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {" "}
                      <img
                        src={row.image}
                        alt="Image"
                        className="w-16 h-16 rounded-lg object-cove transition-transform transform scale-100 hover:scale-105"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Ksh {row.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-medium text-lg text-gray-500">
                      Ksh {row.volume}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
