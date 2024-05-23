import { Button, Paper, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from '../supabaseClient'

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

  async function signUp(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
     supabase.auth.signUp({
      email: email,
      options: {
        data: {
          login: login,
        }
      },
      password: password,
    }).then(async(data) => {
      if (!data.error) {
        let id = data.data.user?.id;
         if (id) {
          console.log(id)
           let a = await supabase.from('Users').insert([{user_id: id, avatar_url: '' }]).select()
           console.log(a)
         }
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
