import { Button, Paper, Stack, TextField } from "@mui/material";
import { createClient } from '@supabase/supabase-js';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

let key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0Y2Rkb3FybmZteWZpZW5wcGljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MzM2MDIsImV4cCI6MjAyNTQwOTYwMn0.o4rnb00r_igMaBWXuV1V1FmWekva49nKLrwhndN3y2c';
let url = 'https://stcddoqrnfmyfienppic.supabase.co';
const supabase = createClient(url, key);

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  function signIn(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
      e.preventDefault();
      supabase.auth.signInWithPassword({
      email: email,
      password: password,
    }).then((data) => {
      if (!data.error) {
        redirectToMainPage();
      } 
      else {
        setError(data.error.message);
      }
    })
  }

  function redirectToMainPage() {
    navigate("/");
  }

  function signUp(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    supabase.auth.signUp({
      email: email,
      options: {
        data: {
          login: login,
        }
      },
      password: password,
    }).then((data) => {
      if (!data.error) {
        redirectToMainPage();
      } 
      else {
        setError(data.error.message);
      }
    })
  }

  return (
    <Paper sx={{margin: 'auto', width: '280px',}}>
      <form>
        <Stack sx={{p: 4,}} spacing={3}>
          <TextField variant="outlined" label="email" type="email" onChange={(e) => {setEmail(e.target.value)}}/>
          <TextField variant="outlined" label="login" onChange={(e) => {setLogin(e.target.value)}}/>
          <TextField variant="outlined" label="password" type="password" onChange={(e) => {setPassword(e.target.value)}}/>
          {error && <p style={{textDecoration: "none", color: "red",}} className="error-text">{error}</p>}
          <Button onClick={(e) => {signIn(e)}} type="submit" variant="outlined">Submit</Button>
          <Button onClick={(e) => {signUp(e)}}>Sign up</Button>
        </Stack>
      </form>
    </Paper>
  )
}

export default LoginPage;
