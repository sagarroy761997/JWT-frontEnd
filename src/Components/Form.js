import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Snackbar } from "@mui/material";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import loginContext from "../Context/loginContext";
const useStyles = makeStyles({
  root: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: 'black'
  },
  form: {
    backgroundColor: "beige",
    border: "1px solid ",
    marginTop: "6vw",
    display: "flex",
    flexDirection: "column",
    width: "30%",
    justifyContent: "space-between !important",
    alignContent: "center",
    borderRadios: "20px !important",
  },
  formData: {
    margin: "10px !important",
  },
});

const Form = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLogin } = useContext(loginContext);
  const [open, setOpen] = React.useState(false);
  const [notification, setNotification] = useState('')
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    async function loadTable() {
      await axios.get("http://localhost:7000/").then((fetched) => {
        console.log(fetched);
      });
    }
    loadTable();
  }, []);

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };
  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const formData = {
    email: email,
    password: password,
  };

  const login = async () => {
    await axios
      .post("http://localhost:7000/login", formData, {
        withCredentials: true,
      })
      .then((fetched) => {
        console.log(fetched.data);
        if (fetched.data.message ===  
          "email and password are correct") {
          setNotification('logging in');
          setIsLogin(true);
          setTimeout(navigate("/ReactLogo"),9000);
        }
        else{
          console.log(fetched.data)
          setNotification(fetched.data);
        }})
      .catch((err)=> {console.log(err); setNotification(err.response.data)})
      
  };

  const signup = async () => {
    await axios
      .post("http://localhost:7000/signup", formData)
      .then((fetched) => {
        console.log(fetched);
        setIsLogin(fetched.data);
        setNotification('user added')
      });
  };
  const action = (
    <React.Fragment>
      <Button onClick={handleClose}>close</Button>
    </React.Fragment>
  );
  const signupButton = () => {
    signup();
    handleClick();
  }
  const loginButton =() =>{
    login();
    handleClick();
  }
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.form}>
        <TextField
          className={classes.formData}
          id="email"
          label="Email"
          value={email}
          onChange={changeEmail}
        />
        <TextField
          className={classes.formData}
          id="password"
          label="Password"
          value={password}
          onChange={changePassword}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.formData}
          onClick={signupButton}
        >
          Sign Up
        </Button>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message= {notification}
          action={action}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.formData}
          onClick={loginButton}
        >
          Log In
        </Button>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={notification}
          action={action}
        />
      </Box>
    </Box>
  );
};

export default Form;
