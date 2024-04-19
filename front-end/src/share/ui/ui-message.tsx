import Avatar from "@mui/material/Avatar";
import image from "../../assets/Avatar.png";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
interface UiMessageProps {
    text: string,
    date: string,
    name: string;
    isMy: boolean,
}

const UiMessage = (props: UiMessageProps) => {
    let date = new Date(props.date)
    return(
        <Paper elevation={4} className={props.isMy ? "message-wrapper isMy": "message-wrapper"}>
            <Avatar className="avatar" alt="Remy Sharp" src={image}/>
            <Typography sx={{fontSize: "10px"}}>{props.name}</Typography>
            <Typography className="message-content" variant="caption" component="p">{props.text}</Typography>
            <Typography className="message-date" variant="caption" component="h4">{date.getHours()}:{date.getMinutes().toString().length == 1 ? '0' + date.getMinutes(): date.getMinutes() }</Typography>
        </Paper>
    );
}


export { UiMessage };
