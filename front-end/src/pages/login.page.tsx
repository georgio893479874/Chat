import { Button, Paper, Stack, TextField } from "@mui/material"
import { createClient } from '@supabase/supabase-js'
import { useState } from "react";

let key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0Y2Rkb3FybmZteWZpZW5wcGljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MzM2MDIsImV4cCI6MjAyNTQwOTYwMn0.o4rnb00r_igMaBWXuV1V1FmWekva49nKLrwhndN3y2c';
let url = 'https://stcddoqrnfmyfienppic.supabase.co';
const supabase = createClient(url, key);

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function signUp(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
      e.preventDefault()
      supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
  }
  return (
    <Paper sx={{
      margin: 'auto',
      width: '280px',
    }}>
      <form>
        <Stack sx={{
          p: 4,
        }} spacing={3}>
          <TextField variant="outlined" label="email" onChange={(e) => {setEmail(e.target.value)}}/>
          <TextField variant="outlined" label="login"/>
          <TextField variant="outlined" label="password" onChange={(e) => {setPassword(e.target.value)}}/>
          <Button onClick={(e) => {signUp(e)}} type="submit" variant="outlined">Submit</Button>
        </Stack>
      </form>
    </Paper>
  )
}

export default LoginPage
