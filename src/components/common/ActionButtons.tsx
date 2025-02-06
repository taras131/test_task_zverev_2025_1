import React, {FC} from "react";
import {Button, Stack} from "@mui/material";
import {ACTION_BUTTONS} from "../../utils/consts";

interface IProps {
    onCancelClick: () => void;
    onConfirmClick: () => void;
    isValid?: boolean;
    confirmText?: string;
    cancelText?: string;
}

const ActionButtons: FC<IProps> = ({
                                       onCancelClick,
                                       onConfirmClick,
                                       isValid = true,
                                       confirmText = ACTION_BUTTONS.DEFAULT_CONFIRM,
                                       cancelText = ACTION_BUTTONS.DEFAULT_CANCEL,
                                   }) => {
    return (
        <Stack sx={{width: "100%"}} direction="row" justifyContent="center" gap={10}>
            <Button onClick={onCancelClick}
                    variant="outlined"
                    aria-label="cancel">
                {cancelText}
            </Button>
            <Button
                onClick={onConfirmClick}
                variant="contained"
                disabled={!isValid}
                aria-label="confirm">
                {confirmText}
            </Button>
        </Stack>
    );
};

export default ActionButtons;