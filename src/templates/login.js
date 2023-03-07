
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Paper, Grid, Typography, IconButton } from "@mui/material";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LoginIcon from '@mui/icons-material/Login';
import logo from '../assets/images/Logo.png'
import svg from '../assets/images/Svg.png'
import { loginRequest } from "../Actions/authActions";
import { ToastContainer } from 'react-toastify';
import TmbNotification from '../../src/error-notification'
const notify = new TmbNotification();

export default function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
   
      let formData = {
        username: data.get('email'),
        password: data.get('password'),
        requestType:'email'
      }
      let result = await dispatch(loginRequest(formData))
      if (result.status === 200) {
        navigate('/dashboard');
      }
      else{
        notify.error("Please Enter Valid Email Id")
      }
  };
  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Stack direction="row" mt={2} sx={{ justifyContent: 'space-between', padding: '20px 135px', marginTop: '0px', height: '9vh' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', }}>
          <IconButton
            size="small"
            sx={{ ml: 2 }}
          >
            <img src={logo} alt="Kitty Katty!" width={70} />
          </IconButton>
        </Box>
        <Stack direction="row" spacing={2}>
          <Box display={{ xs: "none", sm: "block" }}>
            <Button variant="outlined" startIcon={<LoginIcon />} sx={{ margin: '0px 10px' }}>Login</Button>
            <Button variant="contained" startIcon={<PersonOutlineIcon />} sx={{ margin: '0px 10px' }}>Sign Up</Button>
          </Box>

        </Stack>

      </Stack>
      <Grid container component="main" sx={{ height: '91vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            textAlign: 'center'
          }}
        >
          <img src={svg} alt="Kitty Katty!" className="responsive" />
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5" sx={{ fontSize: '48px', fontWeight: 600, fontStyle: 'normal', color: '#193E79' }}>
              Welcome Back!
            </Typography>
            <Typography component="h6" variant="h5" sx={{ fontSize: '18px', fontWeight: 400, fontStyle: 'normal', color: '#808A9A' }}>
              Login for Acess the Latest Experience of CryptoBrains Performance.
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>

            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}