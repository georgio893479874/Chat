import { UiMessage } from "../share/ui/ui-message";
import { useEffect, useState } from "react";
import { Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

interface IMessage {
  text: string;
  date: string;
}

let key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0Y2Rkb3FybmZteWZpZW5wcGljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MzM2MDIsImV4cCI6MjAyNTQwOTYwMn0.o4rnb00r_igMaBWXuV1V1FmWekva49nKLrwhndN3y2c';
let url = 'https://stcddoqrnfmyfienppic.supabase.co';
const supabase = createClient(url, key);

const ChatPage = () => {
  let navigate = useNavigate()
  let [message, setMessage] = useState("");
  let [login, setLogin] = useState("");
  let [messages, setMessages] = useState<IMessage[]>([]);
  let [isLogin, setIsLogin] = useState(true);
  let messagesComponents: JSX.Element[] = [];

  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
    }
  }, [isLogin])

  useEffect(() => {
    supabase.auth.getSession().then((data)=> {
      if (!data.data.session) {
        setIsLogin(false);
      } 
      else {
        setLogin(data.data.session.user.user_metadata?.login);
        supabase.from("Messages").select('*').limit(20).order("created_at", {ascending:false}).then(data=>{
          console.log(data.data)
          if (data.data) {
            setMessages(data.data.reverse())
          }
        })
      }
    })
  }, [])

  function sendMessage() {
    if (message.trim().length > 0) {
      let date = (new Date().getDate()).toString() + '.' + (new Date().getHours()).toString() + ':' + (new Date().getMinutes()).toString();
      let resMessages = [...messages, {
          text: message,
          date: date,
      }];
      supabase.from('Messages').insert([{
        author: login,
        text: message,
      }]).then((data) => {
        console.log(data)
      })
    
      setMessages(resMessages);
      setMessage("");
    }
  }

  function createWithEnter(event: { keyCode: number; }) {
    if (event.keyCode == 13) {
      sendMessage();
    }
  }

  function createMessages() {
    for (let i = 0; i < messages.length; i++) {
      messagesComponents.push(
        <UiMessage name={login} key={i} text={messages[i].text} date={messages[i].date}/>
      );
    }
  }

  createMessages();
  if (isLogin) {
    return (
      <div className="">
        <div className="main">{messagesComponents}</div>
        <Paper elevation={10}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          position: "fixed",
          bottom: "40px",
          width: "80%",
          left: "10%",
          right: "10%",
          padding: "16px",
        }}>
          <textarea onKeyUp={createWithEnter} className="textarea" style={{resize: "none", fontSize: "16px", width: "50%"}} onChange={(e) => {setMessage(e.target.value)}} value={message} name="textarea" id=""></textarea>
          <Button variant="contained" onClick={sendMessage} className="send-button">Send message</Button>
        </Paper>
      </div>
    )
  }
  else {
    return 'check is login...'
  }
}

export default ChatPage;
