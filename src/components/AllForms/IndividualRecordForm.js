import React, {useEffect} from "react";
import {
  Typography,
  Paper,
  Card,
  CardContent,
  Stack,
  TextField,
  Button,
  Divider,
  Select,
  InputLabel,
  MenuItem,
  FormControl
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import AxiosInstance from "./Axios";
import { useMutation, useQueryClient } from "react-query";
import { useStudentInfoStore } from "../../store/useStudentInfoStore";
import { set } from "date-fns";
import { Toaster, toast } from "sonner";

const IndividualRecordForm = ({initialData, onClose}) => {

  const queryClient = useQueryClient();
  const { studentInfo, setStudentInfo } = useStudentInfoStore();

  const defaultValues = {
    sr_code: studentInfo.sr_code || "",
    lastname: studentInfo.lastname || "",
    firstname: studentInfo.firstname || "",
    middlename: studentInfo.middlename || "",
    year: studentInfo.year || "",
    section: studentInfo.section || "",
    completeAddress: studentInfo.completeAddress || "",
    fatherName: studentInfo.fatherName || "",
    fatherOccupation: studentInfo.fatherOccupation || "",
    fatherContactNumber: studentInfo.fatherContactNumber || "",
    fatherEmailAddress: studentInfo.fatherEmailAddress || "",
    motherName:   studentInfo.motherName || "",
    motherOccupation: studentInfo.motherOccupation || "",
    motherContactNumber: studentInfo.motherContactNumber || "",
    motherEmailAddress: studentInfo.motherEmailAddress || "",
    parents: studentInfo.parents || "",
    living_with: studentInfo.living_with || "",
    relationship: studentInfo.relationship || "",
    club: studentInfo.club || "",
  };


  const { control, handleSubmit, reset } = useForm({defaultValues: initialData || defaultValues});

  useEffect(() => {
    if (initialData) reset(initialData);

  }, [initialData, reset]);


  useEffect(() => {

    const fetchInfoData = async () => {

      const response = await AxiosInstance.get(`/record/`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        }
      });
      setStudentInfo(response.data);
      console.log(response.data);
      return response.data;
    }

    fetchInfoData();
    
  }, []);

useEffect(() => {
  if (studentInfo) {
    reset({
      ...defaultValues, 
      ...studentInfo,     
    });
  }
}, [studentInfo, reset]);

  const mutation = useMutation(
    (data) => 
      studentInfo.sr_code
        ? 
        AxiosInstance.patch(`/record/`, {
          lastname: data.lastname,
          firstname: data.firstname,
          middlename: data.middlename,
          year: data.year,
          section: data.section,
          completeAddress: data.completeAddress,
          fatherName: data.fatherName,
          fatherOccupation: data.fatherOccupation,
          fatherContactNumber: data.fatherContactNumber,
          fatherEmailAddress: data.fatherEmailAddress,
          motherName: data.motherName,
          motherOccupation: data.motherOccupation,
          motherContactNumber: data.motherContactNumber,
          motherEmailAddress: data.motherEmailAddress,
          parents: data.parents,
          living_with: data.living_with,
          relationship: data.relationship,
          club: data.club,
        },
      {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        }
      }
      )  
        : 
       
        AxiosInstance.post(`/individual_record_form/`, {
          lastname: data.lastname,
          firstname: data.firstname,
          middlename: data.middlename,
          year: data.year,
          section: data.section,
          completeAddress: data.completeAddress,
          fatherName: data.fatherName,
          fatherOccupation: data.fatherOccupation,
          fatherContactNumber: data.fatherContactNumber,
          fatherEmailAddress: data.fatherEmailAddress,
          motherName: data.motherName,
          motherOccupation: data.motherOccupation,
          motherContactNumber: data.motherContactNumber,
          motherEmailAddress: data.motherEmailAddress,
          parents: data.parents,
          living_with: data.living_with,
          relationship: data.relationship,
          sr_code: data.sr_code,
          club: data.club,
        },
      {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        }
      })
      , {
        onSuccess: (response) => {
          if (response.data && response.data.errors) {
            toast.error("Error: " + response.data.errors);
          } else {
            queryClient.invalidateQueries("IRFData");
            queryClient.refetchQueries("IRFData");
            reset();
            // onClose();
            localStorage.setItem("firstname", response.data.firstname);
            localStorage.setItem("lastname", response.data.lastname);
            localStorage.setItem("middlename", response.data.middlename);
            localStorage.setItem("year", response.data.year);
            localStorage.setItem("section", response.data.section);
            localStorage.setItem("completeAddress", response.data.completeAddress);
            localStorage.setItem("sr_code", response.data.sr_code);
            toast.success("Data submitted successfully");
            setStudentInfo(response.data);
          }
        },
        onError: (error) => {
          toast.error("Error submitting data");
          console.error("Error submitting data", error);
        },
        }
  );
  

  const submission = (data) => mutation.mutate(data);

  return (
    <form onSubmit={handleSubmit(submission)} >
      <Toaster richColors position="top-right"/>
        <Paper
          elevation={0}
          sx={{
            paddingY: "20px",
            borderRadius: "8px",
            minHeight: "60vh",
          }}
        >
          <Stack spacing={2}>
            {/* First Row: Last Name, First Name, and Middle Name */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
                name="sr_code"
                control={control}
                render={({field}) => (
              <TextField
                {...field}
                label="Student Number"
                placeholder=""
                sx={{ flex: 1 }}
              />
                )}
                />
              <Controller
                name="lastname"
                control={control}
                render={({field}) => (
              <TextField
                {...field}
                label="Last Name"
                placeholder=""
                sx={{ flex: 1 }}
              />
                )}
                />
              <Controller
                name="firstname"
                control={control}
                render={({field}) => (  
              <TextField
                {...field}
                label="First Name"
                placeholder=""
                sx={{ flex: 1 }}
              />
              )}
              />
              <Controller
                name="middlename"
                control={control}
                render={({field}) => (
              <TextField
                {...field}
                label="Middle Name"
                placeholder=""
                sx={{ flex: 1 }}
              />
                )}
                />
            </Stack>

            {/* Second Row: Year, Section, and Complete Address */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Controller
                name="year"
                control={control}
                render={({field}) => (
              <TextField
                {...field}
                label="Year"
                placeholder=""
                sx={{ flex: 1 }}
              />
                )}
                />
              <Controller
                name="section"
                control={control}
                render={({field}) => (  
              <TextField
                {...field}
                label="Section"
                placeholder=""
                sx={{ flex: 1 }}
              />
                )}
                />
              <Controller
                name="completeAddress"
                control={control}
                render={({field}) => (  
              <TextField
                {...field}                
                label="Complete Address"
                placeholder=""
                sx={{ flex: 1 }}
              />
                )}
                />
            </Stack>

            <Divider sx={{ marginY: 2 }} />

            {/* Father's Information Section */}
            <Typography variant="h7" gutterBottom textAlign={"left"}>
              Father:
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Controller
                name="fatherName"
                control={control}
                render={({field}) => (
              <TextField
                {...field}
                label="Name"
                placeholder=""
                sx={{ flex: 1 }}
              />
                )}
                />
              <Controller
                name="fatherOccupation"
                control={control}
                render={({field}) => (  
              <TextField
              {...field}
                label="Occupation"
                placeholder=""
                sx={{ flex: 1 }}
              />
                )}
                />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Controller
                name="fatherContactNumber"
                control={control}
                render={({field}) => (
              <TextField
              {...field}
                label="Contact Number"
                placeholder=""
                sx={{ flex: 1 }}
              />
                )}
                />
              <Controller
                name="fatherEmailAddress"
                control={control}
                render={({field}) => (
              <TextField
              {...field}
                label="Email Address"
                placeholder=""
                sx={{ flex: 1 }}
              />
                )}
                />
            </Stack>

            <Divider sx={{ marginY: 2 }} />

            {/* Mother's Information Section */}
            <Typography variant="h7" gutterBottom textAlign={"left"}> 
              Mother:
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Controller
                name="motherName"
                control={control}
                render={({field}) => (
              <TextField
              {...field}
                label="Name"
                placeholder=""
                sx={{ flex: 1 }}
              />
                )}
                />
              <Controller  
                name="motherOccupation"
                control={control}
                render={({field}) => (
              <TextField
              {...field}
                label="Occupation"
                placeholder=""
                sx={{ flex: 1 }}
              />
                )}
                />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Controller
                name="motherContactNumber"
                control={control}
                render={({field}) => (
              <TextField
              {...field}
                label="Contact Number"
                placeholder=""
                sx={{ flex: 1 }}
              />
                )}
                />
              <Controller
                name="motherEmailAddress"
                control={control}
                render={({field}) => (  
              <TextField
                {...field}
                label="Email Address"
                placeholder=""
                sx={{ flex: 1 }}
              />
                )}
                />
            </Stack>

            <Divider sx={{ marginY: 2 }} />

            {/* Parents Section */}
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Typography variant="h7" gutterBottom>
                Parents:
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                alignItems="flex-start"
              >
                  <Controller
                    name = "parents"
                    control={control}
                    render={({field}) => (
                    <FormControl fullWidth sx={{width:"150px"}}>
                    <InputLabel>Parents</InputLabel>
                    <Select
                      label = "Parents"
                      {...field} >
                      <MenuItem value={"Living Together"}>Living Together</MenuItem>
                      <MenuItem value={"Separated"}>Separated</MenuItem>
                    </Select> </FormControl> )} />
              </Stack>
            </Stack>
            <Divider sx={{ marginY: 2 }} />

            {/* Living With Section */}
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Typography variant="h7" gutterBottom>
                Living With:
              </Typography>
              <Stack direction="column" spacing={1} alignItems="flex-start">
                <Stack direction="row" spacing={1} alignItems="center">
                <Controller
                    name = "living_with"
                    control={control}
                    render={({field}) => (
                    <FormControl fullWidth sx={{width:"150px"}}>
                    <InputLabel>Living With</InputLabel>
                    <Select
                      label = "Living With"
                      {...field} >
                      <MenuItem value={"Both Parents"}>Both Parents</MenuItem>
                      <MenuItem value={"Mother Only"}>Mother Only</MenuItem>
                      <MenuItem value={"Father Only"}>Father Only</MenuItem>
                      <MenuItem value={"Relatives"}>Relatives</MenuItem>
                    </Select> </FormControl> )} />
                </Stack>
              </Stack>
              <Stack direction="column" spacing={2} alignItems="center">
                <Controller
                  name="relationship"
                  control={control}
                  render={({field}) => (
                <TextField
                    {...field}
                    placeholder="Relationship"
                    variant="standard"
                    sx={{ flex: 1 }} // Adjust width as needed
                  />
                  )}
                  />
                </Stack>
            </Stack>

            <Divider sx={{ marginY: 2 }} />
            <Typography variant="h7" gutterBottom align="center" textAlign={"left"}>
            Club Membership / Position Handled:
        </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Controller
                name="club"
                control={control}
                render={({field}) => (
              <TextField
                {...field}
                label="Club membership/posistion handled"
                placeholder=""
                sx={{ flex: 1 }}
              />
                )}
                />
              </Stack>

            {/* Submit Button at the end of Living With section, aligned to flex-end */}
            <Stack
              direction="row"
              justifyContent="flex-end"
              sx={{ marginTop: 10 }}
            >
              <Button
                variant="contained"
                color="primary"
                type="submit">
                Submit
              </Button>
            </Stack>
          </Stack>
        </Paper>
    
    </form>
  );
};

export default IndividualRecordForm;