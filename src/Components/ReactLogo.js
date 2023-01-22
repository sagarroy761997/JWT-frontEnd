import { useContext, useState } from "react";
import logo from "../logo.svg";
import "../App.css";
import loginContext from "../Context/loginContext";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Modal, Box, Typography } from "@mui/material";
import axios from "axios";

function ReactLogo() {
  const {setIsLogin} = useContext(loginContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');

  const Axios = axios.create({
    withCredentials: true,
  });

  const navigate = useNavigate();

  const logout = async () => {
    await Axios.post("http://localhost:7000/logout").then((fetched) => {
      console.log(fetched.data, fetched.status);
      if (fetched.status === 200) {
        setIsLogin(false);
        navigate("/");
      }
    });
  };
  const auth = async () =>
    await Axios.get("http://localhost:7000/auth").then((fetched) => {
      console.log(fetched.data);
      setEmail(fetched?.data?.[0]?.email)
      setPassword(fetched?.data?.[0]?.password)
    });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Modal
          open={open}
          onClose={handleClose}
        >
          <Box className="modal">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {email}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             {password}
            </Typography>
          </Box>
        </Modal>
        <Button
          className="auth"
          color="warning"
          variant="contained"
          onClick={()=>{
            auth();
            handleOpen();
          }}
        >
          Show Credentials
        </Button>
        <Button
          sx={{ margin: "4px" }}
          color="warning"
          variant="contained"
          onClick={logout}
        >
          Logout
        </Button>
      </header>
    </div>
  );
}

export default ReactLogo;
