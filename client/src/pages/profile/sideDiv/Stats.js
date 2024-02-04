import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { api } from "../../../middleware/Api";

function Stats() {
  const [totalEarnings, setTotalEarning] = useState("");

  const getUsersData = async () => {
    try {
      const response = await api(`/user/get_single_user`, "GET", {}, {});
      setTotalEarning(response.totalEarning);

    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);



  function generateMonthLabels(monthCount) {
    const labels = [];
    const currentDate = new Date(); // Get the current date

    for (let i = 0; i < monthCount; i++) {
      const date = new Date(currentDate);
      date.setMonth(currentDate.getMonth() - i); // Subtract months to go back in time
      const monthLabel = date.toLocaleDateString("default", { month: "short" });
      labels.push(monthLabel); // Add the month label to the beginning of the array
    }

    return labels.sort(((a,b)=>a/b))
  }
    useEffect(()=>{
        getUsersData();
      
    },[])

    const labels =generateMonthLabels(12)
    const data = Array.isArray(totalEarnings) ? totalEarnings : [totalEarnings || 0];


    const chartData = {
      labels: labels,
      datasets: [
        {
          label: "Earnings",
        data: data,
          fill: true,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderColor: "rgba(0, 0, 0, 1)",
          borderWidth: 2,
        },
      ],
    };

 

  // Calculates various statistics (total, average, maximum earnings, and the month with the highest earnings)
  //based on data in the 'chartData' object.
  const totalEarning = chartData.datasets[0].data.reduce(
    (sum, earnings) => sum + earnings,
    0
  );

  const averageEarnings = totalEarnings / chartData.labels.length;
  const maxEarnings = Math.max(...chartData.datasets[0].data);
  const maxEarningsIndex = chartData.datasets[0].data.indexOf(maxEarnings);
  const highestEarningMonth = chartData.labels[maxEarningsIndex];

  const chartRef = useRef(null);

  // Utilizes a useEffect hook to create and update a line chart using the Chart.js library based on the 'chartData' dependency,
  //while ensuring the previous chart is destroyed if it exists.
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    const ctx = document.getElementById("salesChart").getContext("2d");
    chartRef.current = new Chart(ctx, {
      type: "line",
      data: chartData,
      options: {
        responsive: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: "Month",
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "Earnings",
            },
          },
        },
      },
    });
  }, [chartData]);



  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4 text-white">Stats</h1>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 mb-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4 text-green-500">
            Total Earnings
          </h2>
          <hr />
          <div className="mt-4">
            <p className="text-lg font-semibold">Ksh {" "} {totalEarnings}</p>
          </div>
        </div>

        {/* Average Earnings per Month */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4 text-blue-500">
            Average Earnings per Month
          </h2>
          <hr />
          <div className="mt-4">
            <p className="text-lg font-semibold">
              Ksh {averageEarnings.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Highest Earning Month */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4 text-red-500">
            Highest Earning Month
          </h2>
          <hr />
          <div className="mt-4">
            <p className="text-lg font-semibold">
              {highestEarningMonth} (Ksh {maxEarnings})
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6 bg-gray-200 rounded-lg">
        <canvas id="salesChart" />
      </div>
      

    </div>
  );
}

export default Stats;
