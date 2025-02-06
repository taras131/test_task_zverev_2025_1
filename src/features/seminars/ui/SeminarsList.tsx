import React, { FC, useState } from "react";
import { ISeminar } from "../../../models/ISeminar";
import SeminarCard from "./SeminarCard";
import Box from "@mui/material/Box";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import { fetchDeleteSeminar } from "../model/actions";
import { useAppDispatch } from "../../../hooks/redux";
import SeminarEditModal from "./SeminarEditModal";
import Typography from "@mui/material/Typography";
import { SEMINARS_LIST } from "../../../utils/consts";

interface IProps {
  seminars: ISeminar [];
}

const SeminarsList: FC<IProps> = ({ seminars }) => {
  const dispatch = useAppDispatch();
  //состояние окна, которое отвечает за подтверждение удаления
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  //состояние окна, которое отвечает за редактирования
  const [openEditModal, setOpenEditModal] = useState(false);
  // id выбраного семинара , используется для редактирования и удаления
  const [selectedSeminarId, setSelectedSeminarId] = useState<number | null>(null);
  // обработчик клика по кнопке удаления
  const deleteClickHandler = (id: number) => () => {
    setSelectedSeminarId(id);
    setOpenConfirmationModal(true);
  };
  // обработчик клика по кнопке редактирования
  const editClickHandler = (id: number) => () => {
    setSelectedSeminarId(id);
    setOpenEditModal(true);
  };
  // функция , которая передаётся в окно подтверждения и вызывается в случаи согласия
  const confirmDeleteHandler = () => {
    if (selectedSeminarId) {
      dispatch(fetchDeleteSeminar(selectedSeminarId));
      setOpenConfirmationModal(false);
      setSelectedSeminarId(null);
    }
  };
  // изменяет состояния окна подтверждения
  const toggleOpenConfirmationModal = () => {
    setOpenConfirmationModal(prev => !prev);
  };
  // изменяет состояния окна редактирования
  const toggleOpenEditModal = () => {
    setOpenEditModal(prev => !prev);
  };
  const seminarsList = seminars.map(seminar => (<SeminarCard key={seminar.id}
                                                             seminar={seminar}
                                                             onDelete={deleteClickHandler(seminar.id)}
                                                             onEdit={editClickHandler(seminar.id)} />));
  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "24px",
        justifyItems: "center",
        "& > *": {
          minWidth: "300px",
          width: "100%",
          maxWidth: "420px",
        },
      }}
    >
      {seminarsList
        ? seminarsList
        : (<Typography variant="h5">Пока нет семинаров</Typography>)}
      <ConfirmationModal isOpenModal={openConfirmationModal}
                         message={SEMINARS_LIST.CONFIRM_DELETE_QUESTION}
                         handleToggleOpen={toggleOpenConfirmationModal}
                         handleOkClick={confirmDeleteHandler} />
      {selectedSeminarId && (
        <SeminarEditModal isOpenModal={openEditModal}
                          seminarId={selectedSeminarId}
                          handleToggleOpen={toggleOpenEditModal} />
      )}
    </Box>
  );
};

export default SeminarsList;