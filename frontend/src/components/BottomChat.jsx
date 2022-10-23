import { Stack, TextField, Button } from "@mui/material";
import { useState } from "react";


const BottomChat = () => {

    const [message, setMessage] = useState('');

    return (
        <Stack spacing={5} className='bottom-chat' direction='horizontal' >
            <TextField 
                className="input-new-message"
                id="outlined-multiline-flexible"
                label="Nouveau message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                />

            <Button variant="contained" className="button-send-message">
                Envoyer
            </Button>
        </Stack>
    )

}

export default BottomChat;