import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userCheckTkn } from "../api/user.api";
import Loading from './Loading';

const ProtectedRoute = ({ children }) => {
   const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const checkToken = async () => {
         setIsLoading(false);

         const { response, err } = await userCheckTkn();

         if (err) {
            localStorage.removeItem("tkn");
            navigate("/signin");
         }

         if (response) {
            localStorage.setItem("username", response.username);
            setIsLoading(false);
         }
      };

      const tkn = localStorage.getItem("tkn");

      if (tkn) checkToken();
      else navigate("/signin");
   }, [navigate]);
   
   return (
      isLoading ? (
         <Loading/>
      ) : (
         <Box sx={{ height: "100vh" }}>
            {children}
         </Box>
      )
   );
};

export default ProtectedRoute