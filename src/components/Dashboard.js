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
  const [chartData, setChartData] = useState(null);
  const [familychartData, setFamilyChartData] = useState(null);
  const [friendschartData, setFriendsChartData] = useState(null);
  const [healthchartData, setHealthChartData] = useState(null);
  const [academicchartData, setAcademicChartData] = useState(null);
  const [careerchartData, setCareerChartData] = useState(null);
  const [selectedChart, setSelectedChart] = useState(0);
  const [grade, setGrade] = useState("All");
  const [loading, setLoading] = useState(true);

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
              backgroundColor: [
                "rgba(255,99,132,0.6)",
                "rgba(54,162,235,0.6)",
                "rgba(255,206,86,0.6)",
                "rgba(75,192,192,0.6)",
                "rgba(153,102,255,0.6)",
                "rgba(255,159,64,0.6)",
                "rgba(255,99,71,0.6)",
                "rgba(0,255,0,0.6)",
                "rgba(75,0,130,0.6)",
                "rgba(255,20,147,0.6)",
              ], // Different colors for each bar
            },
          ],
        });
      })
      .catch((error) => console.error(`Error fetching data for ${label}:`, error));
  };

  useEffect(() => {
    setLoading(true);
    fetchPieChartData(grade);
    fetchBarChartData(`/familyproblem_analytics/`, setFamilyChartData, "family_problem", "Family Problems", grade);
    fetchBarChartData(`/friendsproblem_analytics/`, setFriendsChartData, "friends_problem", "Friends Problems", grade);
    fetchBarChartData(`/healthproblem_analytics/`, setHealthChartData, "health_problem", "Health Problems", grade);
    fetchBarChartData(`/academicproblem_analytics/`, setAcademicChartData, "academic_problem", "Academic Problems", grade);
    fetchBarChartData(`/careerproblem_analytics/`, setCareerChartData, "career_problem", "Career Problems", grade);
  }, [grade]);

  const handlePieClick = (event, elements) => {
    if (elements.length > 0) {
      const index = elements[0].index;
      setSelectedChart(index);
    }
  };

  const getMostFrequentCategory = (chartData) => {
    if (!chartData) return { category: "", count: 0 };
    const maxCount = Math.max(...chartData.datasets[0].data);
    const index = chartData.datasets[0].data.indexOf(maxCount);
    return {
      category: chartData.labels[index],
      count: maxCount,
    };
  };

  const chartMap = [
    { title: "Family Problems Chart", data: familychartData },
    { title: "Friends Problems Chart", data: friendschartData },
    { title: "Health Problems Chart", data: healthchartData },
    { title: "Academic Problems Chart", data: academicchartData },
    { title: "Career Problems Chart", data: careerchartData },
  ];

  const mostFrequentCategory = getMostFrequentCategory(chartMap[selectedChart]?.data);

  return (
    <div style={styles.container}>
      <label htmlFor="grade" style={styles.selectLabel}>Select Grade: </label>
      <select
        id="grade"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        style={styles.select}
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
        <div style={styles.chartContainer}>
          {/* Card displaying the most frequent category */}
          <div style={styles.cardContainer}>
            <div style={styles.card}>
              <h4>{chartMap[selectedChart].title}</h4>
              <p>{chartData.datasets[0].data[selectedChart]}</p>
            </div>
            <div style={styles.card}>
              <h4>Most Frequent Problem</h4>
              <p>{mostFrequentCategory.category}</p>
            </div>
          </div>

          <div style={styles.mainContainer}>
            <div style={styles.chartWrapper}>
              <div style={styles.pieContainer}>
                {chartData && <Pie data={chartData} options={{ onClick: handlePieClick }} />}
              </div>

              {selectedChart !== null && chartMap[selectedChart]?.data && (
                <div style={styles.barContainer}>
                  <h2>{chartMap[selectedChart].title}</h2>
                  <Bar data={chartMap[selectedChart].data} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '5px',
    maxWidth: '1200px',
    margin: 'auto',
    fontFamily: '"Arial", sans-serif',
  },
  selectLabel: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  select: {
    padding: '5px',
    width: '200px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    backgroundColor: '#f4f4f9',
  },
  chartContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: '0px',
    flexWrap: 'wrap',
    gap: '20px',
  },
  card: {
    padding: '5px',
    backgroundColor: '#f4f4f9',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    width: '40%',
    margin: '10px 0',
    textAlign: 'center',
    minWidth: '200px',
  },
  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    flexWrap: 'wrap',
  },
  chartWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '800px',
    flexWrap: 'wrap',
    margin: '0 auto',
  },
  pieContainer: {
    width: '40%',
    minWidth: '300px',
    margin: '10px',
  },
  barContainer: {
    width: '45%',
    minWidth: '350px',
    margin: '20px',
  },

  '@media (max-width: 768px)': {
    chartWrapper: {
      flexDirection: 'column',
    },
    pieContainer: {
      width: '100%',
      margin: '10px 0',
    },
    barContainer: {
      width: '100%',
      margin: '10px 0',
    },
    cardContainer: {
      flexDirection: 'column',
      alignItems: 'stretch',
    },
    card: {
      width: '100%',
      marginBottom: '20px',
    },
  },

  '@media (max-width: 480px)': {
    select: {
      width: '100%',
    },
    container: {
      padding: '10px',
    },
  }
};

export default Dashboard;
