import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {fetchGetSeminars} from "../model/actions";
import {selectSeminars, selectSeminarsIsLoading} from "../model/selectors";
import Preloader from "../../../components/common/Preloader";
import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import SeminarsList from "./SeminarsList";
import {SEMINARS} from "../../../utils/consts";

const Seminars = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(selectSeminarsIsLoading);
    const seminars = useAppSelector(selectSeminars);
    // инициирует запрос на сервер для получение всех семинаров
    useEffect(() => {
        dispatch(fetchGetSeminars());
    }, [dispatch]);
    // компонент возвращает крутилку пока не закончится загрузка
    if (isLoading) {
        return (<Preloader/>);
    }
    return (
        <Stack spacing={3}>
            <Typography variant="h4">{SEMINARS.TITLE}</Typography>
            <SeminarsList seminars={seminars}/>
        </Stack>
    );
};

export default Seminars;