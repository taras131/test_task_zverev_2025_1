import React, {ChangeEvent, FC, useEffect, useState} from "react";
import ModalWindow from "../../../components/common/ModalWindow";
import Stack from "@mui/material/Stack";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {selectSeminarById} from "../model/selectors";
import {IErrors, ISeminar} from "../../../models/ISeminar";
import {fetchUpdateSeminar} from "../model/actions";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, {Dayjs} from "dayjs";
import "dayjs/locale/ru";
import customParseFormat from "dayjs/plugin/customParseFormat";
import ImagePreview from "../../../components/common/ImagePreview";
import {SeminarForm} from "./SeminarForm";
import ActionButtons from "../../../components/common/ActionButtons";
import {validateSeminarForm} from "../../../utils/validation";
import {SEMINAR_EDIT_MODAL, SEMINARS_FORM} from "../../../utils/consts";

dayjs.extend(customParseFormat);

interface IProps {
    isOpenModal: boolean;
    handleToggleOpen: () => void;
    seminarId: number;
}

const emptyErrors: IErrors = {
    title: "",
    description: "",
    photo: "",
};

const SeminarEditModal: FC<IProps> = ({isOpenModal, handleToggleOpen, seminarId}) => {
    const dispatch = useAppDispatch();
    // state для хранение редактируемого семинара
    const [editionSeminar, setEditionSeminar] = useState<ISeminar | null>(null);
    // state для хранение ошибок валидации полей ввода
    const [errors, setErrors] = useState(emptyErrors);
    // state для хранение информации о том, вносились ли изменения в семинар
    const [isEdited, setIsEdited] = useState(false);
    // получение семинара по id из redux
    const seminar = useAppSelector(selectSeminarById(seminarId));
    // при получении seminar , если он не равен null , он устанавливается в state для редактирования
    useEffect(() => {
        if (seminar) {
            setEditionSeminar(seminar);
        }
    }, [seminar]);
    // если редактируемого семинара нет, компонент возвращает null
    if (!editionSeminar) return null;
    // проверка валидности полей ввода
    const isValid = !errors.title && !errors.description && !errors.photo;
    // функция обрабатывает событие изменения полей ввода
    const seminarFieldChangeHandler = (e: ChangeEvent<HTMLInputElement
        | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setEditionSeminar(prev => {
            if (!prev) return null;
            const updatedSeminar = {...prev, [name]: value};
            setErrors(validateSeminarForm(updatedSeminar));
            setIsEdited(true);
            return updatedSeminar;
        });
    };
    // функция обрабатывает событие изменения даты
    const handleDateChange = (newValue: Dayjs | null) => {
        if (newValue) {
            setEditionSeminar(prev => {
                if (!prev) return null;
                setIsEdited(true);
                return {
                    ...prev,
                    date: newValue.format("DD.MM.YYYY"),
                };
            });
        }
    };
    // функция обрабатывает событие изменения времени
    const handleTimeChange = (newValue: Dayjs | null) => {
        if (newValue && editionSeminar) {
            setEditionSeminar(prev => {
                setIsEdited(true);
                if (!prev) return null;
                return {
                    ...prev,
                    time: newValue.format("HH:mm"),
                };
            });
        }
    };
    // функция обрабатывает событие сброса ссылки
    const handlePhotoReset = () => {
        setEditionSeminar(prev => {
            if (!prev) return null;
            setIsEdited(true);
            return {...prev, photo: ""};
        });
    };
    // функция обрабатывает событие submit формы
    const submitHandler = () => {
        if (editionSeminar && isValid) {
            dispatch(fetchUpdateSeminar(editionSeminar));
            handleToggleOpen();
        }
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
            <ModalWindow
                handleToggleOpen={handleToggleOpen}
                isOpenModal={isOpenModal}
                title={SEMINARS_FORM.MODAL_WINDOW_TITLE}
            >
                <Stack spacing={4}>
                    <SeminarForm
                        editionSeminar={editionSeminar}
                        errors={errors}
                        onFieldChange={seminarFieldChangeHandler}
                        onDateChange={handleDateChange}
                        onTimeChange={handleTimeChange}
                        onPhotoReset={handlePhotoReset}
                    />
                    <ImagePreview src={editionSeminar.photo}
                                  caption={SEMINAR_EDIT_MODAL.PHOTO_PREVIEW_CAPTION}/>
                    <ActionButtons isValid={isValid && isEdited}
                                   onCancelClick={handleToggleOpen}
                                   onConfirmClick={submitHandler}/>
                </Stack>
            </ModalWindow>
        </LocalizationProvider>
    );
};

export default SeminarEditModal;
