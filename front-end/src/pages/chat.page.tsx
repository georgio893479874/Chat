import { UiMessage } from "../share/ui/ui-message";
import { useEffect, useState, useRef } from "react";
import { Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

interface IMessage {
  text: string;
  created_at: string;
  author: string;
}

let key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0Y2Rkb3FybmZteWZpZW5wcGljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MzM2MDIsImV4cCI6MjAyNTQwOTYwMn0.o4rnb00r_igMaBWXuV1V1FmWekva49nKLrwhndN3y2c';
let url = 'https://stcddoqrnfmyfienppic.supabase.co';
const supabase = createClient(url, key);

const ChatPage = () => {
  let div = useRef(null)
  let navigate = useNavigate()
  let [message, setMessage] = useState("");
  let [login, setLogin] = useState("");
  let [messages, setMessages] = useState<IMessage[]>([]);
  let [isLogin, setIsLogin] = useState(true);
  let messagesComponents: JSX.Element[] = [];

  useEffect(() => {
    if (div.current) {
      console.log('div')
      // @ts-ignore
      div.current.scrollTo(0, 999999999)
    }
    
  }, [messages])

  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
    }
  }, [isLogin])


  useEffect(() => {
   function getMessages() {
    supabase.auth.getSession().then((data)=> {
      if (!data.data.session) {
        setIsLogin(false);
      } 
      else {
        setLogin(data.data.session.user.user_metadata?.login);
        supabase.from("Messages").select('*').limit(20).order("created_at", {ascending:false}).then(data=>{
          console.log(data.data);
          if (data.data) {
            setMessages(data.data.reverse());
          }
        })
      }
    })
   }
  getMessages()
  }, [])

  function sendMessage() {
    if (message.trim().length > 0) {
      supabase.from('Messages').insert([{
        author: login,
        text: message,
      }]).select("*").then((data) => {
        if (!data.data) return;

        let date = data.data[0].created_at
        let author = data.data[0].author
        let resMessages = [...messages, {
          text: message,
          created_at: date,
          author: author,
        }];
        
        setMessages(resMessages);
        setMessage("");
      })    
    }
    
  }

  function createWithEnter(event: { keyCode: number; }) {
    if (event.keyCode == 13) {
      sendMessage();
    }
  }

  function createMessages() {
    for (let i = 0; i < messages.length; i++) {
      let isMy = false;
      if (login == messages[i].author) {
        isMy = true;
      }
      messagesComponents.push(
        <UiMessage isMy={isMy} name={messages[i].author} key={i} text={messages[i].text} date={messages[i].created_at}/>
      );
    }
  }

  createMessages();
  if (isLogin) {
    return (
      <div className="">
        <div ref={div} className="main">{messagesComponents}</div>
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

