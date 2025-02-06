import React from "react";
import Snackbar from "@mui/material/Snackbar";
import {Alert} from "@mui/material";
import { useStore } from "../../../store/storeContext";
import { observer } from "mobx-react-lite";


const Message = observer(() => {
    const { messageStore } = useStore();
    const message = messageStore.message;
    const isShowMessage = messageStore.isShow;
    const handleClose = () => {
        messageStore.resetMessage();
    };
    return (
        <Snackbar
            open={isShowMessage}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{vertical: "top", horizontal: "center"}}
        >
            <Alert onClose={handleClose} severity={message.severity} sx={{width: "100%"}}>
                {message.text}
            </Alert>
        </Snackbar>
    );
});

export default Message;
