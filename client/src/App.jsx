import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthRoute from "./components/AuthRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  const theme = createTheme({
    palette: { mode: "dark" }
  })


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover
      />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <HomePage/>
            </ProtectedRoute>
          }/>
          <Route path="/signin" element={
            <AuthRoute>
              <SignInPage/>
            </AuthRoute>
          }/>
          <Route path="/signup" element={
            <AuthRoute>
              <SignUpPage/>
            </AuthRoute>
          }/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
