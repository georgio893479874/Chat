import axios from "axios";

const backendURL = 'http://127.0.0.1:3005/api';

class Chat {
    constructor() {
        
    }
    sendMessage(text: string, idUser: number) {
        const date = '';
        
        axios.post(backendURL + "/message", {
            body: JSON.stringify({
                text: text,
                idUser,
                date: date,
            }),
        });
    }
    deleteMessage(_idUser: number, idMessage: number) {
        axios.delete(backendURL + "/message/"+idMessage);
    }
    changeMessage() {

    }
    markReader() {

    }
}

export { Chat };
