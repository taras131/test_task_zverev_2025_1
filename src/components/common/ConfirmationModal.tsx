import React, {FC} from "react";
import ModalWindow from "./ModalWindow";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {CONFIRMATION_MODAL} from "../../utils/consts";
import ActionButtons from "./ActionButtons";

interface IProps {
    isOpenModal: boolean;
    message: string;
    handleToggleOpen: () => void;
    handleOkClick: () => void;
    confirmText?: string;
    cancelText?: string;
}

const ConfirmationModal: FC<IProps> = ({
                                           isOpenModal,
                                           message,
                                           handleToggleOpen,
                                           handleOkClick,
                                           confirmText = CONFIRMATION_MODAL.DEFAULT_CONFIRM,
                                           cancelText = CONFIRMATION_MODAL.DEFAULT_CANCEL,
                                       }) => {
    return (
        <ModalWindow handleToggleOpen={handleToggleOpen}
                     isOpenModal={isOpenModal}
                     title={CONFIRMATION_MODAL.DEFAULT_TITLE}>
            <Stack spacing={4}>
                <Typography fontSize="20px">{message}</Typography>
                <ActionButtons onCancelClick={handleToggleOpen}
                               onConfirmClick={handleOkClick}
                               confirmText={confirmText}
                               cancelText={cancelText}/>
            </Stack>
        </ModalWindow>
    );
};

export default ConfirmationModal;
