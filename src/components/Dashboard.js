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
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import { FormControl, InputLabel, MenuItem, Select, TextField, Button, ButtonGroup } from "@mui/material";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import { toast, Toaster } from "sonner";
import { UserIcon } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const [chartData, setChartData] = useState(null);
  const [familychartData, setFamilyChartData] = useState(null);
  const [friendschartData, setFriendsChartData] = useState(null);
  const [healthchartData, setHealthChartData] = useState(null);
  const [academicchartData, setAcademicChartData] = useState(null);
  const [careerchartData, setCareerChartData] = useState(null);
  const [selectedChart, setSelectedChart] = useState(null);
  const [grade, setGrade] = useState("All");
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("custom");
  const [hiddenCategories, setHiddenCategories] = useState(new Set());
  const [openCard, setOpenCard] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startDate: "",
      endDate: "",
    },
  });

  const { startDate, endDate } = watch();

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    const now = dayjs();
    
    if (range === "custom") {
      setValue("startDate", "");
      setValue("endDate", "");
    } else {
      if (startDate || endDate) {
        setValue("startDate", "");
        setValue("endDate", "");
      }
      
      switch(range) {
        case "quarterly":
          setValue("startDate", now.subtract(3, "month").format("YYYY-MM-DD"));
          setValue("endDate", now.format("YYYY-MM-DD"));
          break;
        case "yearly":
          setValue("startDate", now.subtract(1, "year").format("YYYY-MM-DD"));
          setValue("endDate", now.format("YYYY-MM-DD"));
          break;
      }
    }
  };

  const filterChartData = (data) => {
    if (!data) return data;
    
    const filteredLabels = data.labels.filter((_, i) => !hiddenCategories.has(i));
    const filteredData = data.datasets[0].data.filter((_, i) => !hiddenCategories.has(i));
    const filteredBackgroundColor = data.datasets[0].backgroundColor.filter((_, i) => !hiddenCategories.has(i));
    
    return {
      labels: filteredLabels,
      datasets: [{
        ...data.datasets[0],
        data: filteredData,
        backgroundColor: filteredBackgroundColor
      }]
    };
  };

  const fetchPieChartData = (grade, startDate, endDate) => {
    const params = {
      ...(grade !== "All" && { grade: grade }),
      ...(startDate && { start_date: dayjs(startDate).format("YYYY-MM-DD") }),
      ...(endDate && { end_date: dayjs(endDate).format("YYYY-MM-DD") })
    };
    
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
                "rgba(44,142,215,0.6)",
                "rgba(34,122,195,0.6)",
                "rgba(24,102,175,0.6)",
                "rgba(14,82,155,0.6)",
                "rgba(4,62,135,0.6)"
              ],
              hoverBackgroundColor: [
                "rgba(44,142,215,0.8)",
                "rgba(34,122,195,0.8)",
                "rgba(24,102,175,0.8)",
                "rgba(14,82,155,0.8)",
                "rgba(4,62,135,0.8)"
              ],
            },
          ],
        });
        setSelectedChart(0);
        setLoading(false);
      })
      .catch((error) => {
        toast.error("There is no data for the selected grade and date range");
        setLoading(false);
      });
  };

  const fetchBarChartData = (endpoint, setter, dataKey, label, grade, startDate, endDate) => {
    const params = {
      ...(grade !== "All" && { grade: grade }),
      ...(startDate && { start_date: dayjs(startDate).format("YYYY-MM-DD") }),
      ...(endDate && { end_date: dayjs(endDate).format("YYYY-MM-DD") })
    };
    
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
                "rgba(44,142,215,0.8)",
                "rgba(34,122,195,0.8)",
                "rgba(24,102,175,0.8)",
                "rgba(14,82,155,0.8)",
                "rgba(4,62,135,0.8)",
                "rgba(34,152,225,0.8)",
                "rgba(54,132,205,0.8)",
                "rgba(74,112,185,0.8)",
                "rgba(94,92,165,0.8)",
                "rgba(114,72,145,0.8)"
              ],
            },
          ],
        });
      })
      .catch((error) => {
        toast.error("There is no data for the selected grade and date range");
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchPieChartData(grade, startDate, endDate);
    fetchBarChartData(`/familyproblem_analytics/`, setFamilyChartData, "family_problem", "Family Problems", grade, startDate, endDate);
    fetchBarChartData(`/friendsproblem_analytics/`, setFriendsChartData, "friends_problem", "Friends Problems", grade, startDate, endDate);
    fetchBarChartData(`/healthproblem_analytics/`, setHealthChartData, "health_problem", "Health Problems", grade, startDate, endDate);
    fetchBarChartData(`/academicproblem_analytics/`, setAcademicChartData, "academic_problem", "Academic Problems", grade, startDate, endDate);
    fetchBarChartData(`/careerproblem_analytics/`, setCareerChartData, "career_problem", "Career Problems", grade, startDate, endDate);
  }, [grade, startDate, endDate]);

  // When a category on the Pie chart is clicked, open a pop-up summary card.
  const handlePieClick = (event, elements) => {
    if (elements.length > 0) {
      const index = elements[0].index;
      setSelectedChart(index);
      setOpenCard(true);
    }
  };

  // Compute the total count, highest and lowest categories from the pie chart data.
  const totalCount = chartData
    ? chartData.datasets[0].data.reduce((sum, count) => sum + count, 0)
    : 0;

  const getHighestCategory = (data) => {
    if (!data) return { category: "", count: 0 };
    const maxCount = Math.max(...data.datasets[0].data);
    const index = data.datasets[0].data.indexOf(maxCount);
    return {
      category: data.labels[index],
      count: maxCount,
    };
  };

  const getLowestCategory = (data) => {
    if (!data) return { category: "", count: 0 };
    const minCount = Math.min(...data.datasets[0].data);
    const index = data.datasets[0].data.indexOf(minCount);
    return {
      category: data.labels[index],
      count: minCount,
    };
  };

  const highestCategory = getHighestCategory(chartData);
  const lowestCategory = getLowestCategory(chartData);

  // Mapping for the detailed bar charts (used later)
  const chartMap = [
    { title: "Family Problems Chart", data: familychartData },
    { title: "Friends Problems Chart", data: friendschartData },
    { title: "Health Problems Chart", data: healthchartData },
    { title: "Academic Problems Chart", data: academicchartData },
    { title: "Career Problems Chart", data: careerchartData },
  ];

  const mostFrequentCategory = getHighestCategory(chartData); // or use a custom function if needed

  return (
    <div style={styles.container}>
      <Toaster richColors position="top-right" />

      {/* Filter Controls */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="select-label" sx={{ backgroundColor: "white" }}>Grade/Year</InputLabel>
          <Select
            labelId="select-label"
            id="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            sx={{ minWidth: 120 }}
            size="small"
          >
            {["All", "Kinder", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12", "1st Year", "2nd Year", "3rd Year", "4th Year"].map((level) => (
              <MenuItem value={level} key={level}>{level}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <ButtonGroup variant="outlined" size="small">
          <Button 
            onClick={() => handleTimeRangeChange("custom")}
            variant={timeRange === "custom" ? "contained" : "outlined"}
          >
            Custom
          </Button>
          <Button 
            onClick={() => handleTimeRangeChange("quarterly")}
            variant={timeRange === "quarterly" ? "contained" : "outlined"}
          >
            Quarterly
          </Button>
          <Button 
            onClick={() => handleTimeRangeChange("yearly")}
            variant={timeRange === "yearly" ? "contained" : "outlined"}
          >
            Yearly
          </Button>
        </ButtonGroup>

        <form style={{ display: "flex", gap: "10px" }} className="space-y-4">
          <div>
            <Controller
              name="startDate"
              control={control}
              rules={{ required: "Start date is required" }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <DatePicker
                  label="Start Date"
                  value={value ? dayjs(value) : null}
                  onChange={(date) => {
                    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : null;
                    onChange(formattedDate);
                    if (timeRange !== "custom") {
                      setTimeRange("custom");
                    }
                  }}
                  slotProps={{ textField: { size: "small", sx: { width: "180px" } } }}
                  renderInput={(params) => (
                    <TextField {...params} error={!!error} helperText={error?.message} fullWidth />
                  )}
                />
              )}
            />
          </div>

          <div>
            <Controller
              name="endDate"
              control={control}
              rules={{
                required: "End date is required",
                validate: (value) => {
                  if (!startDate) return true;
                  return (
                    dayjs(value, "YYYY-MM-DD").isAfter(dayjs(startDate, "YYYY-MM-DD")) ||
                    "End date must be after Start Date"
                  );
                },
              }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <DatePicker
                  label="End Date"
                  value={value ? dayjs(value, "YYYY-MM-DD") : null}
                  onChange={(date) => {
                    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : null;
                    onChange(formattedDate);
                    if (timeRange !== "custom") {
                      setTimeRange("custom");
                    }
                  }}
                  slotProps={{ textField: { size: "small", sx: { width: "180px" } } }}
                  renderInput={(params) => (
                    <TextField {...params} error={!!error} helperText={error?.message} fullWidth />
                  )}
                />
              )}
            />
            {errors.endDate && (
              <p className="mt-1 text-sm text-red-500">{errors.endDate.message}</p>
            )}
          </div>
        </form>
      </div>

      {/* Summary Cards Section */}
      <div style={styles.summaryContainer}>
        <div style={styles.summaryCard}>
          <UserIcon size={48} color="#1b77cc" />
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}>
              <span style={styles.summaryCardTitle}>Total Count</span>
              <span style={styles.summaryCardValue}>{totalCount}</span>
            </div>
        </div>
        <div style={styles.summaryCard}>
          <UserIcon size={48} color="#1b77cc" />
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}>
              <span style={styles.summaryCardTitle}>Total Count</span>
              <span style={styles.summaryCardValue}>{totalCount}</span>
            </div>
        </div>
        <div style={styles.summaryCard}>
          <UserIcon size={48} color="#1b77cc" />
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start"
            }}>
              <span style={styles.summaryCardTitle}>Total Count</span>
              <span style={styles.summaryCardValue}>{totalCount}</span>
            </div>
        </div>
        <div style={styles.summaryCard}>
          <UserIcon size={48} color="#1b77cc" />
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}>
              <span style={styles.summaryCardTitle}>Total Count</span>
              <span style={styles.summaryCardValue}>{totalCount}</span>
            </div>
        </div>
        {/* <div style={styles.summaryCard}>
          <h3 style={styles.summaryCardTitle}>Highest Problem</h3>
          <p style={styles.summaryCardValue}>
            {highestCategory.category} ({highestCategory.count})
          </p>
        </div>
        <div style={styles.summaryCard}>
          <h3 style={styles.summaryCardTitle}>Lowest Problem</h3>
          <p style={styles.summaryCardValue}>
            {lowestCategory.category} ({lowestCategory.count})
          </p>
        </div>
        <div style={styles.summaryCard}>
          <h3 style={styles.summaryCardTitle}>Extra</h3>
          <p style={styles.summaryCardValue}>N/A</p>
        </div> */}
      </div>

      {/* Main Chart Section */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={styles.chartContainer}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 5,
              mb: 2,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <div style={styles.leftColumn}>
              {selectedChart !== null && (
                <div style={styles.card}>
                  <h4>{chartMap[selectedChart].title}</h4>
                  <p style={{ 
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#051535",
                    margin: "10px 0",
                    padding: "8px 16px",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "8px",
                    textAlign: "center"
                  }}>
                    {chartData?.datasets[0].data[selectedChart]}
                  </p>
                </div>
              )}
              <div style={styles.card}>
                <h4>Most Frequent Problem</h4>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <p style={{ backgroundColor: "#051535", padding: "3px 6px", borderRadius: "5px", margin: "auto", color: "white" }}>
                    {mostFrequentCategory.category}
                  </p>
                </div>
              </div>
            </div>

            <div style={styles.rightColumn}>
              <div style={styles.pieContainer}>
                {chartData && 
                  <Pie data={filterChartData(chartData)} options={{ onClick: handlePieClick }} />
                }
              </div>
            </div>
          </Box>

          {selectedChart !== null && chartMap[selectedChart]?.data && (
            <div style={styles.bottomSection}>
              <h2>{chartMap[selectedChart].title}</h2>
              <Bar data={filterChartData(chartMap[selectedChart].data)} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "5px",
    maxWidth: "1200px",
    margin: "auto",
    fontFamily: '"Arial", sans-serif',
    "@media (max-width: 480px)": {
      padding: "10px",
    },
  },
  selectLabel: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  select: {
    padding: "5px",
    width: "200px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    backgroundColor: "#f4f4f9",
    "@media (max-width: 480px)": {
      width: "100%",
    },
  },
  summaryContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "20px",
    justifyContent: "space-between",
  },
  summaryCard: {
    flex: "1 1 200px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    // background: "linear-gradient(135deg, #051535, #102a4d)",
    color: "#fff",
    padding: "10px",
    gap: "30px",
    borderRadius: "12px",
    border: "1px solid rgba(0,0,0,0.1)",
    // create me a shadow that will minimal appearance
    boxShadow: "0 7px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  summaryCardTitle: {
    fontSize: "12px",
    fontWeight: "bold",
    color: "#bfbfbf",
    marginBottom: "10px",
  },
  summaryCardValue: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "black"
  },
  chartContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: "20px",
  },
  topSection: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    marginBottom: "20px",
    "@media (max-width: 768px)": {
      flexDirection: "column",
    },
  },
  leftColumn: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    "@media (max-width: 768px)": {
      width: "100%",
    },
  },
  rightColumn: {
    flex: "1",
    display: "flex",
    justifyContent: "center",
    "@media (max-width: 768px)": {
      width: "100%",
    },
  },
  card: {
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "rgb(236, 236, 236)",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    textAlign: "center",
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    border: "1px solid rgba(0,0,0,0.05)",
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
    },
    "& h2": {
      color: "#2c3e50",
      marginBottom: "15px",
      fontSize: "1.5rem",
      fontWeight: "600",
    },
    "& p": {
      color: "#666",
      fontSize: "1rem",
      lineHeight: "1.5",
    },
    "@media (max-width: 768px)": {
      padding: "15px",
      "& h2": {
        fontSize: "1.3rem",
      },
    },
  },
  pieContainer: {
    width: "100%",
    maxWidth: "400px",
    padding: "10px",
    "@media (max-width: 768px)": {
      maxWidth: "100%",
    },
  },
  bottomSection: {
    width: "100%",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
};

export default Dashboard;
