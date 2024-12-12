import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import AxiosInstance from "./AllForms/Axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const [chartData, setChartData] = useState(null); // Pie chart data
  const [familychartData, setFamilyChartData] = useState(null); // Family bar chart data
  const [friendschartData, setFriendsChartData] = useState(null); // Friends bar chart data
  const [healthchartData, setHealthChartData] = useState(null); // Health bar chart data
  const [academicchartData, setAcademicChartData] = useState(null); // Academic bar chart data
  const [careerchartData, setCareerChartData] = useState(null); // Career bar chart data
  const [selectedChart, setSelectedChart] = useState(0); // Selected pie chart slice index
  const [grade, setGrade] = useState("All"); // Selected grade
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch data for the pie chart
  const fetchPieChartData = (grade) => {
    const params = grade !== "All" ? { grade } : {};
    AxiosInstance.get(`/routineinterview_analytics/`, { params })
      .then((response) => {
        const data = response.data;
        const labels = [
          "Family Problems",
          "Friends Problems",
          "Health Problems",
          "Academic Problems",
          "Career Problems",
        ];
        const counts = [
          data.family_problem_count,
          data.friends_problem_count,
          data.health_problem_count,
          data.academic_problem_count,
          data.career_problem_count,
        ];
        setChartData({
          labels,
          datasets: [
            {
              label: "Routine Interview Analytics",
              data: counts,
              backgroundColor: [
                "rgba(255,99,132,0.6)",
                "rgba(54,162,235,0.6)",
                "rgba(255,206,86,0.6)",
                "rgba(75,192,192,0.6)",
                "rgba(153,102,255,0.6)",
              ],
              hoverBackgroundColor: [
                "rgba(255,99,132,0.8)",
                "rgba(54,162,235,0.8)",
                "rgba(255,206,86,0.8)",
                "rgba(75,192,192,0.8)",
                "rgba(153,102,255,0.8)",
              ],
            },
          ],
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching analytics data:", error);
        setLoading(false);
      });
  };

  // Fetch data for individual bar charts
  const fetchBarChartData = (endpoint, setter, dataKey, label, grade) => {
    const params = grade !== "All" ? { grade } : {};
    AxiosInstance.get(endpoint, { params })
      .then((response) => {
        const labels = response.data.map((item) => item[dataKey]);
        const counts = response.data.map((item) => item.count);

        setter({
          labels,
          datasets: [
            {
              label,
              data: counts,
              backgroundColor: "rgba(75,192,192,0.6)",
            },
          ],
        });
      })
      .catch((error) => console.error(`Error fetching data for ${label}:`, error));
  };

  // Fetch all data when the grade changes
  useEffect(() => {
    setLoading(true);
    fetchPieChartData(grade);
    fetchBarChartData(`/familyproblem_analytics/`, setFamilyChartData, "family_problem", "Family Problems", grade);
    fetchBarChartData(`/friendsproblem_analytics/`, setFriendsChartData, "friends_problem", "Friends Problems", grade);
    fetchBarChartData(`/healthproblem_analytics/`, setHealthChartData, "health_problem", "Health Problems", grade);
    fetchBarChartData(`/academicproblem_analytics/`, setAcademicChartData, "academic_problem", "Academic Problems", grade);
    fetchBarChartData(`/careerproblem_analytics/`, setCareerChartData, "career_problem", "Career Problems", grade);
  }, [grade]);

  // Handle clicking a pie chart slice
  const handlePieClick = (event, elements) => {
    if (elements.length > 0) {
      const index = elements[0].index;
      setSelectedChart(index);
    }
  };

  // Function to get the highest category from the selected chart data
  const getMostFrequentCategory = (chartData) => {
    if (!chartData) return { category: "", count: 0 };
    const maxCount = Math.max(...chartData.datasets[0].data);
    const index = chartData.datasets[0].data.indexOf(maxCount);
    return {
      category: chartData.labels[index],
      count: maxCount,
    };
  };

  // Map for bar chart data and titles
  const chartMap = [
    { title: "Family Problems Chart", data: familychartData },
    { title: "Friends Problems Chart", data: friendschartData },
    { title: "Health Problems Chart", data: healthchartData },
    { title: "Academic Problems Chart", data: academicchartData },
    { title: "Career Problems Chart", data: careerchartData },
  ];

  const mostFrequentCategory = getMostFrequentCategory(chartMap[selectedChart]?.data);

  return (
    <div>
      <label htmlFor="grade">Select Grade: </label>
      <select
        id="grade"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        style={{ marginBottom: "20px" }}
      >
        {["All", "Kinder", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12", "1st Year", "2nd Year", "3rd Year", "4th Year"].map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* Card displaying the most frequent category */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px" }}>
            <div style={{ width: "22%", padding: "20px", backgroundColor: "#f4f4f9", borderRadius: "8px" }}>
              <h4>{chartMap[selectedChart].title}</h4>
              <p>{chartData.datasets[0].data[selectedChart]}</p>
            </div>
            <div style={{ width: "30%", padding: "20px", backgroundColor: "#f4f4f9", borderRadius: "8px" }}>
              <h4>Most Frequent Problem</h4>
              <p>{mostFrequentCategory.category}</p>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px" }}>
            <div style={{ width: "34%" }}>
              {chartData && <Pie data={chartData} options={{ onClick: handlePieClick }} />}
            </div>

            {selectedChart !== null && chartMap[selectedChart]?.data && (
              <div style={{ width: "56%" }}>
                <h2>{chartMap[selectedChart].title}</h2>
                <Bar data={chartMap[selectedChart].data} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
