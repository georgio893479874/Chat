
import { Avatar } from "@mui/material";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState, useRef } from "react"
import Image from "../assets/Avatar.png"




const UserPage = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const ref = useRef<HTMLInputElement>(null)
  let key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0Y2Rkb3FybmZteWZpZW5wcGljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MzM2MDIsImV4cCI6MjAyNTQwOTYwMn0.o4rnb00r_igMaBWXuV1V1FmWekva49nKLrwhndN3y2c';
  let url = 'https://stcddoqrnfmyfienppic.supabase.co';
  const supabase = createClient(url, key);
  useEffect(() => {
   
    (async() => {
      let user = await supabase.auth.getUser()
      setLogin(user.data.user?.user_metadata.login);
      setEmail(user.data.user?.email  || 'email not found')
    })()
  }, [])

  async function sendPhoto() {
    if (ref.current && ref.current?.files) {
      let file = ref.current?.files[0];
  
      const supabase = createClient(url, key);

      await supabase.storage.from('backet2').upload(`${file.name}`, file)

    }
  }
  
  return (
    <>
      <h1 className="login-text">{login}</h1>
      <h3 className="email-text">{email}</h3>
      <Avatar style={{width: "150px", height: "150px"}} onClick={() => {ref.current && ref.current.click()}} src={Image}/>
      <input hidden ref={ref} type="file"/>
      <button className="file-btn" onClick={sendPhoto} type="submit">Confirm</button>
    </>
  )
}

export default UserPage