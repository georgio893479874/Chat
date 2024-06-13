import Avatar from "@mui/material/Avatar";
import image from "../../assets/Avatar.png";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

interface UiMessageProps {
    text: string,
    date: string,
    name: string;
    isMy: boolean,
}

const UiMessage = (props: UiMessageProps) => {
    const [avatar, setAvatar] = useState(null);
    let date = new Date(props.date);

    //@ts-ignore
    function linkifyText(text) {
        const urlRegex = /(\bhttps?:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        const parts = text.split(urlRegex);
        
        //@ts-ignore
        return parts.map((part, index) => {
            if (part.match(urlRegex)) {
                return <a key={index} href={part} target="_blank" rel="noopener noreferrer">{part}</a>;
            } 
            else {
                return part;
            }
        });
    }

    
  useEffect(() => {
    (async () => {
        if (!props.isMy) return;
        
      let user = await supabase.auth.getUser();
      let id = user.data.user?.id;

    
      let data = await supabase.from('Users').select('avatar_url').eq('user_id', id)
      if (!data.data) return;
      
      let ava = data.data[0].avatar_url
      
      
      console.log('ava111: ', data.data[0].avatar_url)
      // console.log(user.data.user?.user_metadata.avatar_url)
      setAvatar(ava)

    })();
  }, []);
    
    return(
        <Paper elevation={4} className={props.isMy ? "message isMy": "message"}>
            <Avatar className="message-avatar" alt="Remy Sharp" src={avatar ? avatar : image}/>
            <Typography className="message-name">{props.name}</Typography>
            <Typography className="message-content" variant="caption" component="p">{linkifyText(props.text)}</Typography>
            <Typography className="message-date" variant="caption" component="h4">{date.getHours()}:{date.getMinutes().toString().length == 1 ? '0' + date.getMinutes(): date.getMinutes() }</Typography>
        </Paper>
    );
}

export { UiMessage };
