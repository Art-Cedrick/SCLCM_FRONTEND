// import React, { useState } from "react";
// import axios from "axios"; // Import Axios
// import {
//   Button,
//   FormControl,
//   InputLabel,
//   OutlinedInput,
//   InputAdornment,
//   IconButton,
//   FormGroup,
//   FormControlLabel,
//   Checkbox,
//   TextField,
//   Link,
//   Container,
//   Box,
//   Divider,
//   Typography,
//   GlobalStyles
// } from "@mui/material";
// import { createTheme, ThemeProvider } from '@mui/material/styles'; // Import ThemeProvider and createTheme from MUI
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import logo from "./images/LOGO.jpg"; // Use the exact casing for your logo file
// import newimage from "./images/new.jpg"; // Add the background image here

// // GlobalStyles to apply 'Rozha One' font globally
// const theme = createTheme({
//   typography: {
//     fontFamily: "'Rozha One'", // Set the font globally
//     h6: {
//       fontSize: '1.5rem',  // Adjust size for h6 headings
//     },
//     body1: {
//       fontSize: '1rem', // Default body text size
//     },
//     button: {
//       fontSize: '0.875rem', // Font size for buttons
//     },
//   },
// });

// function CustomUsernameField({ username, setUsername }) {
//   return (
//     <TextField
//       id="input-with-icon-textfield"
//       label="Student/Employee Number"
//       name="username"
//       type="text"  // Change type to "text" to accept characters and numbers
//       size="small"
//       required
//       fullWidth
//       value={username}
//       onChange={(e) => setUsername(e.target.value)}
//       variant="outlined"
//       InputLabelProps={{
//         required: false,
//       }}
//     />
//   );
// }

// function CustomPasswordField({ password, setPassword }) {
//   const [showPassword, setShowPassword] = useState(false);

//   const handleClickShowPassword = () => setShowPassword((prev) => !prev);

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   return (
//     <FormControl fullWidth variant="outlined" size="small" sx={{ my: 2 }}>
//       <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
//       <OutlinedInput
//         id="outlined-adornment-password"
//         type={showPassword ? "text" : "password"}
//         name="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         autoComplete="new-password"
//         endAdornment={
//           <InputAdornment position="end">
//             <IconButton
//               aria-label="toggle password visibility"
//               onClick={handleClickShowPassword}
//               onMouseDown={handleMouseDownPassword}
//               edge="end"
//               size="small"
//             >
//               {showPassword ? <VisibilityOff /> : <Visibility />}
//             </IconButton>
//           </InputAdornment>
//         }
//         label="Password"
//       />
//     </FormControl>
//   );
// }

// function CustomButton() {
//   return (
//     <Button
//       type="submit"
//       variant="outlined"
//       color="info"
//       size="small"
//       disableElevation
//       fullWidth
//       sx={{ my: 2 }}
//     >
//       Sign In
//     </Button>
//   );
// }

// function ForgotPasswordLink() {
//   return (
//     <Link href="/" variant="body2">
//       Forgot password?
//     </Link>
//   );
// }

// function CustomSignInForm() {
//   const [username, setUsername] = useState(""); // Renamed email to username
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(true);

//   const handleRememberMeChange = (event) => {
//     setRememberMe(event.target.checked);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("https://sclcm-backend.onrender.com/login/", {
//         username: username,  // Use the updated variable
//         password: password,
//       });

//       // Store the token and role in local storage
//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("role", response.data.role);

//       // Handle redirect based on role
//       if (response.data.role === "counselor") {
//         window.location.href = "/counselor";
//       } else if (response.data.role === "psychometrician") {
//         window.location.href = "/psychometrician";
//       } else if (response.data.role === "student") {
//         window.location.href = "/student";
//       } else {
//         console.error("Unknown role:", response.data.role);
//       }
//     } catch (error) {
//       console.error("Login failed:", error);
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <Box
//       component="form"
//       onSubmit={handleSubmit}
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         width: "100%",
//         padding: "1px",
//         borderRadius: "8px",
//       }}
//     >
//       <Typography variant="h6" component="div" sx={{ mb: 2 }}>
//         Sign In
//       </Typography>
//       <Divider
//         sx={{
//           width: "100%",
//           mb: 5,
//           bgcolor: "#1E90FF",
//           height: "2px",
//         }}
//       />
//       <CustomUsernameField username={username} setUsername={setUsername} />
//       <CustomPasswordField password={password} setPassword={setPassword} />
//       <FormGroup
//         sx={{
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mt: 2,
//         }}
//       >
//         <FormControlLabel
//           control={
//             <Checkbox
//               checked={rememberMe}
//               onChange={handleRememberMeChange}
//               name="rememberMe"
//               color="primary"
//             />
//           }
//           label="Remember me"
//           sx={{ mr: 8 }}
//         />
//         <ForgotPasswordLink />
//       </FormGroup>
//       <CustomButton />
//     </Box>
//   );
// }

// export default function SlotsSignIn() {
//   return (
//     <ThemeProvider theme={theme}> {/* Wrap the component with ThemeProvider */}
//       <GlobalStyles
//         styles={{
//           body: {
//             fontFamily: "'Rozha One', sans-serif", // Apply font globally
//           },
//         }}
//       />
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//           position: "relative", // To allow absolute positioning of background
//         }}
//       >
//         {/* Pseudo-element for the background image */}
//         <Box
//           sx={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             "::before": {
//               content: '""',
//               position: "absolute",
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               backgroundImage: `url(${newimage})`,
//               backgroundPosition: "center",
//               backgroundRepeat: "no-repeat",
//               backgroundSize: "100% 100%",
//               opacity: 0.7, // Apply opacity only to the background
//               zIndex: -1,
//             },
//           }}
//         />
//         <Container
//           component="main"
//           maxWidth="xs"
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             minHeight: "60vh",
//             px: 1,
//             backgroundColor: "background.paper",
//             borderRadius: "16px",
//             boxShadow: 3,
//             padding: "16px",
//             marginTop: "60px",
//             opacity: "0.8",
//           }}
//         >
//           <Box
//             component="img"
//             src={logo} // Use the imported logo here
//             alt="Auth Header"
//             sx={{
//               width: "60px", // Set a smaller width for the logo
//               height: "auto",
//               mb: 1, // Adjust margin as needed
//             }}
//           />
//           <Box
//             sx={{
//               width: "90%",
//               maxWidth: "350px",
//               padding: "20px",
//               backgroundColor: "background.default",
//               borderRadius: "16px",
//               minHeight: "250px",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "space-between",
//               border: "2px solid #1E90FF",
//               position: "relative", // Make position relative to avoid shifting
//               overflow: "hidden", // Prevent overflow
//             }}
//           >
//             <CustomSignInForm />
//           </Box>
//         </Container>
//       </Box>
//     </ThemeProvider>
//   );
// }
import React, { useState } from "react";
import axios from "axios"; // Import Axios
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Link,
  Container,
  Box,
  Divider,
  Typography,
  GlobalStyles,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles"; // Import ThemeProvider and createTheme from MUI
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import logo from "./images/LOGO.jpg"; // Use the exact casing for your logo file
import newimage from "./images/new.jpg"; // Add the background image here
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirect

// GlobalStyles to apply 'Rozha One' font globally
const theme = createTheme({
  typography: {
    fontFamily: "'Rozha One'", // Set the font globally
    h6: {
      fontSize: "1.5rem", // Adjust size for h6 headings
    },
    body1: {
      fontSize: "1rem", // Default body text size
    },
    button: {
      fontSize: "0.875rem", // Font size for buttons
    },
  },
});

function CustomUsernameField({ username, setUsername }) {
  return (
    <TextField
      id="input-with-icon-textfield"
      label="Student/Employee Number"
      name="username"
      type="text" // Change type to "text" to accept characters and numbers
      size="small"
      required
      fullWidth
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      variant="outlined"
      InputLabelProps={{
        required: false,
      }}
    />
  );
}

function CustomPasswordField({ password, setPassword }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl fullWidth variant="outlined" size="small" sx={{ my: 2 }}>
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="new-password"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              size="small"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
  );
}

function CustomButton() {
  return (
    <Button
      type="submit"
      variant="outlined"
      color="info"
      size="small"
      disableElevation
      fullWidth
      sx={{ my: 2 }}
    >
      Sign In
    </Button>
  );
}

function ForgotPasswordLink() {
  return (
    <Link href="/" variant="body2">
      Forgot password?
    </Link>
  );
}

function CustomSignInForm() {
  const [username, setUsername] = useState(""); // Renamed email to username
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://sclcm-backend.onrender.com/login/",
        {
          username: username, // Use the updated variable
          password: password,
        }
      );

      // Store the token and role in local storage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      // Handle redirect based on role
      if (response.data.role === "counselor") {
        navigate("/counselor/dashboard"); // Redirect to counselor dashboard
      } else if (response.data.role === "psychometrician") {
        navigate("/psychometrician/dashboard"); // Redirect to psychometrician dashboard
      } else if (response.data.role === "student") {
        navigate("/student/studentappointment"); // Redirect to student forms page
      } else {
        console.error("Unknown role:", response.data.role);
        alert("Role not recognized");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        padding: "1px",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h6" component="div" sx={{ mb: 2 }}>
        Sign In
      </Typography>
      <Divider
        sx={{
          width: "100%",
          mb: 5,
          bgcolor: "#1E90FF",
          height: "2px",
        }}
      />
      <CustomUsernameField username={username} setUsername={setUsername} />
      <CustomPasswordField password={password} setPassword={setPassword} />
      <FormGroup
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={handleRememberMeChange}
              name="rememberMe"
              color="primary"
            />
          }
          label="Remember me"
          sx={{ mr: 8 }}
        />
        <ForgotPasswordLink />
      </FormGroup>
      <CustomButton />
    </Box>
  );
}

export default function SlotsSignIn() {
  return (
    <ThemeProvider theme={theme}>
      {" "}
      {/* Wrap the component with ThemeProvider */}
      <GlobalStyles
        styles={{
          body: {
            fontFamily: "'Rozha One', sans-serif", // Apply font globally
          },
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          position: "relative", // To allow absolute positioning of background
        }}
      >
        {/* Pseudo-element for the background image */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            "::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${newimage})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              opacity: 0.7, // Apply opacity only to the background
              zIndex: -1,
            },
          }}
        />
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "60vh",
            px: 1,
            backgroundColor: "background.paper",
            borderRadius: "16px",
            boxShadow: 3,
            padding: "16px",
            marginTop: "60px",
            opacity: "0.8",
          }}
        >
          <Box
            component="img"
            src={logo} // Use the imported logo here
            alt="Auth Header"
            sx={{
              width: "60px", // Set a smaller width for the logo
              height: "auto",
              mb: 1, // Adjust margin as needed
            }}
          />
          <Box
            sx={{
              width: "90%",
              maxWidth: "350px",
              padding: "20px",
              backgroundColor: "background.default",
              borderRadius: "16px",
              minHeight: "250px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "2px solid #1E90FF",
              position: "relative", // Make position relative to avoid shifting
              overflow: "hidden", // Prevent overflow
            }}
          >
            <CustomSignInForm />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
