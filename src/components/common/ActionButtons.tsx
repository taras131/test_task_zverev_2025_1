import React, {FC} from "react";
import {Button, Stack} from "@mui/material";

interface IProps {
    handleToggleOpen: () => void;
    submitHandler: () => void;
    isValid: boolean;
}

const ActionButtons: FC<IProps> = ({handleToggleOpen, submitHandler, isValid}) => {
    return (
        <Stack sx={{width: "100%"}} direction="row" justifyContent="center" gap={10}>
            <Button onClick={handleToggleOpen} variant="outlined">
                Отмена
            </Button>
            <Button
                onClick={submitHandler}
                variant="contained"
                disabled={!isValid}
            >
                Сохранить
            </Button>
        </Stack>
    );
};

export default ActionButtons;