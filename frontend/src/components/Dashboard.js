import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import AxiosInstance from "./AllForms/Axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [familychartData, setfamilyChartData] = useState(null);
  const [friendschartData, setfriendsChartData] = useState(null);
  const [healthchartData, sethealthChartData] = useState(null);
  const [academicchartData, setacademicChartData] = useState(null);
  const [careerchartData, setcareerChartData] = useState(null);

  useEffect(() => {
    AxiosInstance.get(`/familyproblem_analytics/`).then((response) => {
      console.log(response.data);
      const labels = response.data.map((item) => item.family_problem);
      const counts = response.data.map((item) => item.count);

      setfamilyChartData({
        labels,
        datasets: [
          {
            label: "Family Problems",
            data: counts,
            backgroundColor: "rgba(75,192,192,0.6)",
          },
        ],
      });
    });
  }, []);

  useEffect(() => {
    AxiosInstance.get(`/friendsproblem_analytics/`).then((response) => {
      console.log(response.data);
      const labels = response.data.map((item) => item.friends_problem);
      const counts = response.data.map((item) => item.count);

      setfriendsChartData({
        labels,
        datasets: [
          {
            label: "Friends Problems",
            data: counts,
            backgroundColor: "rgba(75,192,192,0.6)",
          },
        ],
      });
    });
  }, []);

  useEffect(() => {
    AxiosInstance.get(`/healthproblem_analytics/`).then((response) => {
      console.log(response.data);
      const labels = response.data.map((item) => item.health_problem);
      const counts = response.data.map((item) => item.count);

      sethealthChartData({
        labels,
        datasets: [
          {
            label: "Health Problems",
            data: counts,
            backgroundColor: "rgba(75,192,192,0.6)",
          },
        ],
      });
    });
  }, []);

  useEffect(() => {
    AxiosInstance.get(`/academicproblem_analytics/`).then((response) => {
      console.log(response.data);
      const labels = response.data.map((item) => item.academic_problem);
      const counts = response.data.map((item) => item.count);

      setacademicChartData({
        labels,
        datasets: [
          {
            label: "Academic Problems",
            data: counts,
            backgroundColor: "rgba(75,192,192,0.6)",
          },
        ],
      });
    });
  }, []);

  useEffect(() => {
    AxiosInstance.get(`/careerproblem_analytics/`).then((response) => {
      console.log(response.data);
      const labels = response.data.map((item) => item.career_problem);
      const counts = response.data.map((item) => item.count);

      setcareerChartData({
        labels,
        datasets: [
          {
            label: "Career Problems",
            data: counts,
            backgroundColor: "rgba(75,192,192,0.6)",
          },
        ],
      });
    });
  }, []);

  return (
    <div>
        {familychartData ? (
    <div style={{ width: "70%", height: "400px", margin: "0 auto" }}>
      <h2>Family Problems Chart</h2>
      <Bar data={familychartData} />
    </div>
  ) : (
    <p>Loading...</p>
  )}

  {friendschartData ? (
    <div style={{ width: "70%", height: "400px", margin: "0 auto" }}>
      <h2>Friends Problems Chart</h2>
      <Bar data={friendschartData} />
    </div>
  ) : (
    <p>Loading...</p>
  )}

{healthchartData ? (
    <div style={{ width: "70%", height: "400px", margin: "0 auto" }}>
      <h2>Health Problems Chart</h2>
      <Bar data={healthchartData} />
    </div>
  ) : (
    <p>Loading...</p>
  )}

{academicchartData ? (
    <div style={{ width: "70%", height: "400px", margin: "0 auto" }}>
      <h2>Academic Problems Chart</h2>
      <Bar data={academicchartData} />
    </div>
  ) : (
    <p>Loading...</p>
  )}

{careerchartData ? (
    <div style={{ width: "70%", height: "400px", margin: "0 auto" }}>
      <h2>Career Problems Chart</h2>
      <Bar data={careerchartData} />
    </div>
  ) : (
    <p>Loading...</p>
  )}
    </div>
  )
};

export default Dashboard;
