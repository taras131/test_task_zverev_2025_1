import {IErrors, ISeminar} from "../../../models/ISeminar";
import {IconButton, Stack, TextField} from "@mui/material";
import {ChangeEvent, FC} from "react";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";
import dayjs, {Dayjs} from "dayjs";
import {ClearIcon} from "@mui/x-date-pickers";
import {SEMINARS_FORM} from "../../../utils/consts";
import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";

const FieldWrapper = styled("div")({
    width: "100%",
    minHeight: "80px",
});

const MultiLineFieldWrapper = styled("div")({
    width: "100%",
    minHeight: "175px",
});

interface IProps {
    editionSeminar: ISeminar;
    errors: IErrors;
    onFieldChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onDateChange: (newValue: Dayjs | null) => void;
    onTimeChange: (newValue: Dayjs | null) => void;
    onPhotoReset: () => void;
}

export const SeminarForm: FC<IProps> = ({
                                            editionSeminar,
                                            errors,
                                            onFieldChange,
                                            onDateChange,
                                            onTimeChange,
                                            onPhotoReset,
                                        }) => (
    <Stack spacing={4}>
        <DatePicker
            label={SEMINARS_FORM.DATE_LABEL}
            value={dayjs(editionSeminar.date, "DD.MM.YYYY")}
            onChange={onDateChange}
            format="DD.MM.YYYY"
        />
        <TimePicker
            label={SEMINARS_FORM.TIME_LABEL}
            value={dayjs(`2024-01-01 ${editionSeminar.time}`, "YYYY-MM-DD HH:mm")}
            onChange={onTimeChange}
            format="HH:mm"
            closeOnSelect
        />
        <FieldWrapper>
            <TextField
                label={SEMINARS_FORM.TITLE_LABEL}
                variant="outlined"
                name="title"
                fullWidth
                onChange={onFieldChange}
                value={editionSeminar.title}
                error={!!errors.title}
                helperText={errors.title}
            />
        </FieldWrapper>
        <MultiLineFieldWrapper>
            <TextField
                label={SEMINARS_FORM.DESCRIPTION_LABEL}
                variant="outlined"
                name="description"
                onChange={onFieldChange}
                value={editionSeminar.description}
                multiline
                rows={5}
                fullWidth
                error={!!errors.description}
                helperText={errors.description}
            />
        </MultiLineFieldWrapper>
        <Box sx={{position: "relative", width: "100%"}}>
            <TextField
                label={SEMINARS_FORM.PHOTO_LABEL}
                variant="outlined"
                name="photo"
                onChange={onFieldChange}
                fullWidth
                value={editionSeminar.photo}
                sx={{flex: 1}}
                InputProps={{
                    sx: {
                        paddingRight: "38px",
                    },
                }}
                error={!!errors.photo}
                helperText={errors.photo || SEMINARS_FORM.PHOTO_HELPER_TEXT}
            />
            <IconButton
                sx={{position: "absolute", right: "8px", top: "8px"}}
                type="button"
                onClick={onPhotoReset}
                aria-label="reset photo"
            >
                <ClearIcon/>
            </IconButton>
        </Box>
    </Stack>
);