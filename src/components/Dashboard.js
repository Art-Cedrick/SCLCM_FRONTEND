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
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  ButtonGroup,
  Box,
  useMediaQuery,
} from "@mui/material";
import dayjs from "dayjs";
import { toast, Toaster } from "sonner";
import { ChartPie, TrendingDown, TrendingUp, UserIcon } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [chartData, setChartData] = useState(null);
  const [familychartData, setFamilyChartData] = useState(null);
  const [friendschartData, setFriendsChartData] = useState(null);
  const [healthchartData, setHealthChartData] = useState(null);
  const [academicchartData, setAcademicChartData] = useState(null);
  const [careerchartData, setCareerChartData] = useState(null);
  const [selectedChart, setSelectedChart] = useState(null);
  const [grade, setGrade] = useState("All");
  const [ studentCount,setStudentCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("custom");
  const [hiddenCategories, setHiddenCategories] = useState(new Set());
  const [openCard, setOpenCard] = useState(false);

  const {
    control,
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

  // -------------------------------
  // HELPER FUNCTIONS
  // -------------------------------
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
      switch (range) {
        case "quarterly":
          setValue("startDate", now.subtract(3, "month").format("YYYY-MM-DD"));
          setValue("endDate", now.format("YYYY-MM-DD"));
          break;
        case "yearly":
          setValue("startDate", now.subtract(1, "year").format("YYYY-MM-DD"));
          setValue("endDate", now.format("YYYY-MM-DD"));
          break;
        default:
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
      datasets: [
        {
          ...data.datasets[0],
          data: filteredData,
          backgroundColor: filteredBackgroundColor,
        },
      ],
    };
  };

  // Get the highest item from a bar chart
  const getBarHighest = (barData) => {
    if (!barData || !barData.datasets?.[0]?.data?.length) {
      return { label: "", value: 0 };
    }
    const data = barData.datasets[0].data;
    const labels = barData.labels;
    const maxValue = Math.max(...data);
    const index = data.indexOf(maxValue);
    return {
      label: labels[index],
      value: maxValue,
    };
  };

  // Get the second-lowest item from a bar chart (i.e. the second smallest unique value)
  const getBarLowest = (barData) => {
    if (!barData || !barData.datasets?.[0]?.data?.length) {
      return { label: "", value: 0 };
    }
    const data = barData.datasets[0].data;
    const labels = barData.labels;
    // Get unique values in ascending order
    const uniqueValues = [...new Set(data)].sort((a, b) => a - b);
    if (uniqueValues.length < 2) {
      return { label: "", value: 0 };
    }
    const secondMinValue = uniqueValues[1];
    const index = data.indexOf(secondMinValue);
    return {
      label: labels[index],
      value: secondMinValue,
    };
  };

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

  // -------------------------------
  // DATA FETCHING
  // -------------------------------
  const fetchPieChartData = (grade, startDate, endDate) => {
    const params = {
      ...(grade !== "All" && { grade }),
      ...(startDate && { start_date: dayjs(startDate).format("YYYY-MM-DD") }),
      ...(endDate && { end_date: dayjs(endDate).format("YYYY-MM-DD") }),
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
                "rgba(4,62,135,0.6)",
              ],
              hoverBackgroundColor: [
                "rgba(44,142,215,0.8)",
                "rgba(34,122,195,0.8)",
                "rgba(24,102,175,0.8)",
                "rgba(14,82,155,0.8)",
                "rgba(4,62,135,0.8)",
              ],
            },
          ],
        });
        setSelectedChart(0);
        setLoading(false);
      })
      .catch(() => {
        toast.error("There is no data for the selected grade and date range");
        setLoading(false);
      });
  };

  const fetchBarChartData = (endpoint, setter, dataKey, label, grade, startDate, endDate) => {
    const params = {
      ...(grade !== "All" && { grade }),
      ...(startDate && { start_date: dayjs(startDate).format("YYYY-MM-DD") }),
      ...(endDate && { end_date: dayjs(endDate).format("YYYY-MM-DD") }),
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
                "rgba(114,72,145,0.8)",
              ],
            },
          ],
        });
      })
      .catch(() => {
        toast.error("There is no data for the selected grade and date range");
      });
  };

  const fetchTotalStudent = async () => {
    AxiosInstance
    .get('https://sclcm-backend.onrender.com/api/individual_record_form/')
    .then((response) => {
      // Assuming the API returns an array of records
      const data = response.data;
      const count = Array.isArray(data) ? data.length : 0;
      setStudentCount(count);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }

  // -------------------------------
  // EFFECTS
  // -------------------------------
  useEffect(() => {
    setLoading(true);
    fetchTotalStudent();
    fetchPieChartData(grade, startDate, endDate);
    // Bar Charts
    fetchBarChartData(`/familyproblem_analytics/`, setFamilyChartData, "family_problem", "Family Problems", grade, startDate, endDate);
    fetchBarChartData(`/friendsproblem_analytics/`, setFriendsChartData, "friends_problem", "Friends Problems", grade, startDate, endDate);
    fetchBarChartData(`/healthproblem_analytics/`, setHealthChartData, "health_problem", "Health Problems", grade, startDate, endDate);
    fetchBarChartData(`/academicproblem_analytics/`, setAcademicChartData, "academic_problem", "Academic Problems", grade, startDate, endDate);
    fetchBarChartData(`/careerproblem_analytics/`, setCareerChartData, "career_problem", "Career Problems", grade, startDate, endDate);
  }, [grade, startDate, endDate]);

  // -------------------------------
  // EVENT HANDLERS
  // -------------------------------
  const handlePieClick = (event, elements) => {
    if (elements.length > 0) {
      const index = elements[0].index;
      setSelectedChart(index);
      setOpenCard(true);
    }
  };

  // -------------------------------
  // PIE CHART SUMMARIES
  // -------------------------------
  const totalCount = chartData ? chartData.datasets[0].data.reduce((sum, count) => sum + count, 0) : 0;
  const highestCategory = getHighestCategory(chartData);
  const lowestCategory = getLowestCategory(chartData);

  // -------------------------------
  // BAR CHART SUMMARIES
  // -------------------------------
  const chartMap = [
    { title: "Family Problems Chart", data: familychartData },
    { title: "Friends Problems Chart", data: friendschartData },
    { title: "Health Problems Chart", data: healthchartData },
    { title: "Academic Problems Chart", data: academicchartData },
    { title: "Career Problems Chart", data: careerchartData },
  ];

  const mostFrequentCategory = highestCategory;
  const barData = selectedChart !== null ? chartMap[selectedChart]?.data : null;
  const barHighest = getBarHighest(barData);
  const barLowest = getBarLowest(barData);
  const isMobile = useMediaQuery("(max-width: 768px)"); 

  console.log(isMobile);
  return (
    <div style={styles.container}>
      <Toaster richColors position="top-right" />

      {/* FILTER CONTROLS */}
      <div style={styles.filterContainer}>
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
            {[
              "All",
              "Kinder",
              "Grade 1",
              "Grade 2",
              "Grade 3",
              "Grade 4",
              "Grade 5",
              "Grade 6",
              "Grade 7",
              "Grade 8",
              "Grade 9",
              "Grade 10",
              "Grade 11",
              "Grade 12",
              "1st Year",
              "2nd Year",
              "3rd Year",
              "4th Year",
            ].map((level) => (
              <MenuItem value={level} key={level}>{level}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <ButtonGroup variant="outlined" size="small">
          <Button onClick={() => handleTimeRangeChange("custom")} variant={timeRange === "custom" ? "contained" : "outlined"}>Custom</Button>
          <Button onClick={() => handleTimeRangeChange("quarterly")} variant={timeRange === "quarterly" ? "contained" : "outlined"}>Quarterly</Button>
          <Button onClick={() => handleTimeRangeChange("yearly")} variant={timeRange === "yearly" ? "contained" : "outlined"}>Yearly</Button>
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
                    if (timeRange !== "custom") setTimeRange("custom");
                  }}
                  slotProps={{ textField: { size: "small", sx: { width: "180px" } } }}
                  renderInput={(params) => <TextField {...params} error={!!error} helperText={error?.message} fullWidth />}
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
                  return dayjs(value, "YYYY-MM-DD").isAfter(dayjs(startDate, "YYYY-MM-DD")) || "End date must be after Start Date";
                },
              }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <DatePicker
                  label="End Date"
                  value={value ? dayjs(value, "YYYY-MM-DD") : null}
                  onChange={(date) => {
                    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : null;
                    onChange(formattedDate);
                    if (timeRange !== "custom") setTimeRange("custom");
                  }}
                  slotProps={{ textField: { size: "small", sx: { width: "180px" } } }}
                  renderInput={(params) => <TextField {...params} error={!!error} helperText={error?.message} fullWidth />}
                />
              )}
            />
            {errors.endDate && <p className="mt-1 text-sm text-red-500">{errors.endDate.message}</p>}
          </div>
        </form>
      </div>

      {/* LOADING OR MAIN CONTENT */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* SUMMARY CARDS (Based on PIE) */}
          <div style={styles.summaryContainer}>
            <div style={styles.summaryCard}>
              <ChartPie size={48} color="#1b77cc" />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                <span style={styles.summaryCardTitle}>Total Category Count</span>
                <span style={styles.summaryCardValue}>{totalCount}</span>
              </div>
            </div>
            <div style={styles.summaryCard}>
              <TrendingUp size={48} color="#1b77cc" />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                <span style={styles.summaryCardTitle}>Highest Category</span>
                <span style={styles.summaryCardValue}>{highestCategory.count}</span>
              </div>
            </div>
            {/* <div style={styles.summaryCard}>
              <TrendingDown size={48} color="#1b77cc" />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                <span style={styles.summaryCardTitle}>Lowest Category</span>
                <span style={styles.summaryCardValue}>{lowestCategory.count}</span>
              </div>
            </div> */}
            <div style={styles.summaryCard}>
              <UserIcon size={48} color="#1b77cc" />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                <span style={styles.summaryCardTitle}>Total Student</span>
                <span style={styles.summaryCardValue}>{studentCount}</span>
              </div>
            </div>
          </div>

          {/* PIE CHART + MISC INFO */}
          <div style={styles.chartContainer}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: "center",
                gap: 5,
                mb: 2,
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
                      textAlign: "center",
                    }}>
                      {chartData?.datasets[0].data[selectedChart]}
                    </p>
                  </div>
                )}
                <div style={styles.card}>
                  <h4>Most Frequent Problem</h4>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <p style={{
                      backgroundColor: "#051535",
                      padding: "3px 6px",
                      borderRadius: "5px",
                      margin: "auto",
                      color: "white",
                    }}>
                      {mostFrequentCategory.category}
                    </p>
                  </div>
                </div>
              </div>
              <div style={styles.rightColumn}>
                <div style={styles.pieContainer}>
                  {chartData && (
                    <Pie data={filterChartData(chartData)} options={{ onClick: handlePieClick }} />
                  )}
                </div>
              </div>
            </Box>

            {/* BAR CHART & SUMMARY CARDS (Highest/Lowest/Second Lowest) */}
            {selectedChart !== null && chartMap[selectedChart]?.data && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 2,
                  mt: 2,
                }}
              >
                {/* Bar Chart Card */}
                <Box sx={{ flex: 3 }}>
                  <div style={styles.card}>
                    <h2>{chartMap[selectedChart].title}</h2>
                    <Bar 
                      height={isMobile ? 300 : 110}
                      data={filterChartData(chartMap[selectedChart].data)} 
                    />
                  </div>
                </Box>
                {/* Summary Cards Column for Bar Chart */}
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: { xs: "column", md: "column" },
                    gap: 2,
                  }}
                >
                  {/* Highest Problem Card */}
                  {barHighest.label && barHighest.value > 0 ? (
                    <div
                      style={{
                        flex: "1 1 200px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        padding: "20px",
                        borderRadius: "12px",
                        backgroundColor: "#fff",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <TrendingUp size={25} color="#1b77cc" style={{ marginRight: "10px" }} />
                        <span
                          style={{
                            fontSize: "16px",
                            fontWeight: 600,
                            color: "#333",
                          }}
                        >
                          Highest Problem
                        </span>
                      </div>
                      <div
                        style={{
                          marginTop: "10px",
                          background: "linear-gradient(90deg, rgba(44,142,215,1) 0%, rgba(34,122,195,1) 100%)",
                          borderRadius: "8px",
                          padding: "12px 16px",
                          color: "#fff",
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        <span
                          style={{
                            display: "block",
                            fontSize: "20px",
                            fontWeight: "bold",
                            marginBottom: "5px",
                          }}
                        >
                          {barHighest.label}
                        </span>
                        <span
                          style={{
                            display: "block",
                            fontSize: "26px",
                            fontWeight: "bold",
                            letterSpacing: "1px",
                          }}
                        >
                          {barHighest.value}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div style={styles.summaryCard}>
                      <TrendingUp size={48} color="#1b77cc" />
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                        <span style={styles.summaryCardTitle}>Highest Problem</span>
                        <span style={styles.summaryCardValue}>No data available</span>
                      </div>
                    </div>
                  )}

                  {/* Second Lowest Problem Card */}
                  {barLowest.label && barLowest.value > 0 ? (
                    <div
                      style={{
                        flex: "1 1 200px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        padding: "20px",
                        borderRadius: "12px",
                        backgroundColor: "#fff",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <TrendingDown size={25} color="#1b77cc" style={{ marginRight: "10px" }} />
                        <span
                          style={{
                            fontSize: "16px",
                            fontWeight: 600,
                            color: "#333",
                          }}
                        >
                          Second Lowest Problem
                        </span>
                      </div>
                      <div
                        style={{
                          marginTop: "10px",
                          background: "linear-gradient(90deg, rgba(255,99,71,1) 0%, rgba(220,20,60,1) 100%)",
                          borderRadius: "8px",
                          padding: "12px 16px",
                          color: "#fff",
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        <span
                          style={{
                            display: "block",
                            fontSize: "20px",
                            fontWeight: "bold",
                            marginBottom: "5px",
                          }}
                        >
                          {barLowest.label}
                        </span>
                        <span
                          style={{
                            display: "block",
                            fontSize: "26px",
                            fontWeight: "bold",
                            letterSpacing: "1px",
                          }}
                        >
                          {barLowest.value}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div style={styles.summaryCard}>
                      <TrendingDown size={48} color="#1b77cc" />
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                        <span style={styles.summaryCardTitle}>Second Lowest Problem</span>
                        <span style={styles.summaryCardValue}>No data available</span>
                      </div>
                    </div>
                  )}
                </Box>
              </Box>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "5px",
    maxWidth: "1400px",
    margin: "auto",
    fontFamily: '"Arial", sans-serif',
  },
  filterContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "10px",
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
    color: "#fff",
    padding: "10px",
    borderRadius: "12px",
    border: "1px solid rgba(0,0,0,0.1)",
    boxShadow: "0 7px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
    backgroundColor: "#ffffff",
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
    color: "black",
  },
  chartContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: "20px",
  },
  leftColumn: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  rightColumn: {
    flex: "1",
    display: "flex",
    justifyContent: "center",
  },
  card: {
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "rgb(236, 236, 236)",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    textAlign: "center",
    border: "1px solid rgba(0,0,0,0.05)",
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  },
  pieContainer: {
    width: "100%",
    maxWidth: "400px",
    padding: "10px",
  },
};

export default Dashboard;
