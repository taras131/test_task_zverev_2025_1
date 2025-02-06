import React, {FC} from "react";
import {Modal, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface IProps {
    isOpenModal: boolean;
    title: string;
    handleToggleOpen: () => void;
    children: React.ReactNode;
}

const modalStyle = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
        xs: "calc(100% - 20px)",
        sm: "500px",
    },
    bgcolor: "background.paper",
    borderRadius: "8px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    p: 3,
};

const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
};

const ModalWindow: FC<IProps> = ({isOpenModal, title, handleToggleOpen, children}) => {
    return (
        <Modal
            open={isOpenModal}
            onClose={handleToggleOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <Box sx={headerStyle}>
                    <Typography variant="h6" fontWeight={500}>
                        {title}
                    </Typography>
                    <IconButton aria-label="close" onClick={handleToggleOpen}>
                        <CloseIcon sx={{color: "text.secondary"}}/>
                    </IconButton>
                </Box>
                {children}
            </Box>
        </Modal>
    );
};

export default ModalWindow;
