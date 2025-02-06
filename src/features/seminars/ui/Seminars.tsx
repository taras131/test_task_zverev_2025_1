import React, {useEffect} from "react";
import Preloader from "../../../components/common/Preloader";
import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import SeminarsList from "./SeminarsList";
import {SEMINARS} from "../../../utils/consts";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/storeContext";

const Seminars = observer(() => {
    const { seminarsStore} = useStore();
    const seminars = seminarsStore.seminars;
    // инициирует запрос на сервер для получение всех семинаров
    useEffect(() => {
        seminarsStore.fetchSeminars();
    }, []);
    // компонент возвращает крутилку пока не закончится загрузка
    if (seminarsStore.isLoading) {
        return (<Preloader/>);
    }
    return (
        <Stack spacing={3}>
            <Typography variant="h4">{SEMINARS.TITLE}</Typography>
            <SeminarsList seminars={seminars}/>
        </Stack>
    );
});

export default Seminars;