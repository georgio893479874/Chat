import Avatar from "@mui/material/Avatar";
import image from "../../assets/Avatar.png";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
interface UiMessageProps {
    text: string,
    date: string,
    name: string;
}

const UiMessage = (props: UiMessageProps) => {
    return(
        <Paper elevation={4} className="message-wrapper">
            <Avatar className="avatar" alt="Remy Sharp" src={image}/>
            <Typography>{props.name}</Typography>
            <Typography className="message-content" variant="caption" component="p">{props.text}</Typography>
            <Typography className="message-date" variant="caption" component="h4">{props.date}</Typography>
        </Paper>
    );
}

export { UiMessage };
