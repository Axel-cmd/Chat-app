import { Stack, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../contexts/auth.context";
import { authRequest } from "../utils/request";


const BottomChat = ({conversationId}) => {

    const auth = useAuth();
    const [message, setMessage] = useState('');

    // méthode pour envoyer un message

    const handleSendMessage = () => {
        // authRequest({
        //     url: "/messages",
        //     method: "POST",
        //     body: {
        //         content: message,
        //         author: auth.user._id,
        //         conversationId,
        //     }
        // })
        // .then(res => res.json())
        // .then(result => console.log(result))
    }

    return (
        <Stack spacing={5} className='bottom-chat' direction='horizontal' >
            <TextField 
                className="input-new-message"
                id="outlined-multiline-flexible"
                label="Nouveau message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                />

            <Button variant="contained" className="button-send-message" onClick={handleSendMessage}>
                Envoyer
            </Button>
        </Stack>
    )

}

export default BottomChat;