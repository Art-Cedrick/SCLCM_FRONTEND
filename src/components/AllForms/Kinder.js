import React, { useEffect } from "react";
import {
  Typography,
  Paper,
  Box,
  Card,
  CardContent,
  Stack,
  Button,
  TextField,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form"; // Import Controller
import SingleSelect from "./Forms/SingleSelect"; // Ensure this path is correct
import AxiosInstance from "./Axios"; // Axios instance
import { useMutation, useQueryClient } from "react-query";

const Kinder = ({ initialData, onClose }) => {
  const queryClient = useQueryClient();
  const defaultValues = {
    name: "",
    sex: "",
    dateofbirth: "",
    address: "",
    pregm: "",
    presgm: "",
    prefm: "",
    presfm: "",
    presh: "",
    pressh: "",
    presrl: "",
    preel: "",
    presel: "",
    prec: "",
    presc: "",
    prescalesum: "",
    prestandardscore: "",
    preverbalint: "",
    postgm: "",
    postsgm: "",
    postfm: "",
    postsfm: "",
    postsh: "",
    postssh: "",
    postrl: "",
    postsrl: "",
    postel: "",
    postsel: "",
    postc: "",
    postsc: "",
    postscalesum: "",
    poststandardscore: "",
    postverbalint: "",
  };

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const mutation = useMutation(
    (data) =>
      initialData
        ? AxiosInstance.put(`/kinder/${initialData.id}/`, data)
        : AxiosInstance.post(`/kinder/`, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("kinderData");
        console.log("Data invalidated");
        queryClient.refetchQueries("kinderData");
        console.log("Data refetched");
        reset();
        onClose();
        console.log("Data submitted and table refreshed");
      },
      onError: (error) => {
        console.error("Error submitting data", error);
      },
    }
  );

  const submission = (data) => mutation.mutate(data);

  return (
    <form onSubmit={handleSubmit(submission)}>
      <Card elevation={3} sx={{ maxWidth: "900px", margin: "20px auto" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            Kinder
          </Typography>
          <Paper
            elevation={3}
            sx={{
              padding: "40px",
              borderRadius: "8px",
              backgroundColor: "#f7f9fc",
              minHeight: "50vh",
            }}
          >
            <Stack spacing={2}>
              {/* First Row: Student Name */}
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Student Name"
                    {...field}
                    fullWidth
                    sx={{
                      minWidth: "200px",
                      marginBottom: { xs: 2, sm: 0 },
                    }}
                  />
                )}
              />

              {/* Second Row: Sex, Date of Birth, Address */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="sex"
                  control={control}
                  render={({ field }) => (
                    <SingleSelect
                      label="Sex"
                      {...field}
                      options={["M", "F"]}
                      sx={{
                        minWidth: "200px",
                        marginBottom: { xs: 2, sm: 0 },
                      }}
                    />
                  )}
                />
                <Controller
                  name="dateofbirth"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Date of Birth"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      {...field}
                      fullWidth
                      sx={{
                        minWidth: "200px",
                        marginBottom: { xs: 2, sm: 0 },
                      }}
                    />
                  )}
                />
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Address"
                      {...field}
                      fullWidth
                      sx={{
                        minWidth: "200px",
                        marginBottom: { xs: 2, sm: 0 },
                      }}
                    />
                  )}
                />
              </Stack>

              {/* Pre fields */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="pregm"
                  control={control}
                  render={({ field }) => (
                    <TextField label="Pre GM" {...field} fullWidth />
                  )}
                />
                <Controller
                  name="presgm"
                  control={control}
                  render={({ field }) => (
                    <TextField label="PreSGM" {...field} fullWidth />
                  )}
                />
                <Controller
                  name="prefm"
                  control={control}
                  render={({ field }) => (
                    <TextField label="PreFM" {...field} fullWidth />
                  )}
                />
              </Stack>

              {/* Pre-SFM, Pre-SH, Pre-SSH */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="presfm"
                  control={control}
                  render={({ field }) => (
                    <TextField label="Pre SFM" {...field} fullWidth />
                  )}
                />
                <Controller
                  name="presh"
                  control={control}
                  render={({ field }) => (
                    <TextField label="Pre SH" {...field} fullWidth />
                  )}
                />
                <Controller
                  name="pressh"
                  control={control}
                  render={({ field }) => (
                    <TextField label="PreSSH" {...field} fullWidth />
                  )}
                />
              </Stack>

              {/* Pre RL, Pre EL, Pre SEL */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="presrl"
                  control={control}
                  render={({ field }) => (
                    <TextField label="Pre SRL" {...field} fullWidth />
                  )}
                />
                <Controller
                  name="preel"
                  control={control}
                  render={({ field }) => (
                    <TextField label="Pre EL" {...field} fullWidth />
                  )}
                />
                <Controller
                  name="presel"
                  control={control}
                  render={({ field }) => (
                    <TextField label="Pre SEL" {...field} fullWidth />
                  )}
                />
              </Stack>

              {/* Pre C, Pre SC, Pre Scale Sum */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="prec"
                  control={control}
                  render={({ field }) => (
                    <TextField label="Pre C" {...field} fullWidth />
                  )}
                />
                <Controller
                  name="presc"
                  control={control}
                  render={({ field }) => (
                    <TextField label="Pre SC" {...field} fullWidth />
                  )}
                />
                <Controller
                  name="prescalesum"
                  control={control}
                  render={({ field }) => (
                    <TextField label="Pre Scale Sum" {...field} fullWidth />
                  )}
                />
              </Stack>

              {/* Pre Standard Score, Pre Verbal Int, Post GM */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="prestandardscore"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Pre Standard Score"
                      {...field}
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="preverbalint"
                  control={control}
                  render={({ field }) => (
                    <TextField label="Pre Verbal Int" {...field} fullWidth />
                  )}
                />
                <Controller
                  name="postgm"
                  control={control}
                  render={({ field }) => (
                    <TextField label="Post GM" {...field} fullWidth />
                  )}
                />
              </Stack>

              {/* PostSGM, Post FM, Post SFM */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="postsgm"
                  control={control}
                  render={({ field }) => (
                    <TextField label="PostSGM" {...field} fullWidth />
                  )}
                />
                <Controller
                  name="postfm"
                  control={control}
                  render={({ field }) => (
                    <TextField label="Post FM" {...field} fullWidth />
                  )}
                />
                <Controller
                  name="postsfm"
                  control={control}
                  render={({ field }) => (
                    <TextField label="PostSFM" {...field} fullWidth />
                  )}
                />
              </Stack>

              {/* Post SH, Post SSH, Post RL */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="postsh"
                  control={control}
                  render={({ field }) => (
                    <TextField label="Post SH" {...field} fullWidth />
                  )}
                />
                <Controller
                  name="postssh"
                  control={control}
                  render={({ field }) => (
                    <TextField label="PostSSH" {...field} fullWidth />
                  )}
                />
                <Controller
                  name="postrl"
                  control={control}
                  render={({ field }) => (
                    <TextField label="Post RL" {...field} fullWidth />
                  )}
                />
              </Stack>

              {/* PostSRL, Post EL, Post SEL */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="postsrl"
                  control={control}
                  render={({ field }) => (
                    <TextField label="PostSRL" {...field} fullWidth />
                  )}
                />
                <Controller
                  name="postel"
                  control={control}
                  render={({ field }) => (
                    <TextField label="Post EL" {...field} fullWidth />
                  )}
                />
                <Controller
                  name="postsel"
                  control={control}
                  render={({ field }) => (
                    <TextField label="PostSEL" {...field} fullWidth />
                  )}
                />
              </Stack>

              {/* Post C, Post SC, Post Scale Sum */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="postc"
                  control={control}
                  render={({ field }) => (
                    <TextField label="Post C" {...field} fullWidth />
                  )}
                />
                <Controller
                  name="postsc"
                  control={control}
                  render={({ field }) => (
                    <TextField label="Post SC" {...field} fullWidth />
                  )}
                />
                <Controller
                  name="postscalesum"
                  control={control}
                  render={({ field }) => (
                    <TextField label="Post Scale Sum" {...field} fullWidth />
                  )}
                />
              </Stack>

              {/* Post Standard Score, Post Verbal Int */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="poststandardscore"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Post Standard Score"
                      {...field}
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="postverbalint"
                  control={control}
                  render={({ field }) => (
                    <TextField label="Post Verbal Int" {...field} fullWidth />
                  )}
                />
              </Stack>

              {/* Submit Button */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 2,
                }}
              >
                {/* <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ marginTop: "10px" }}
                >
                  Submit
                </Button> */}
              </Box>
            </Stack>
          </Paper>
        </CardContent>
      </Card>
    </form>
  );
};

export default Kinder;
