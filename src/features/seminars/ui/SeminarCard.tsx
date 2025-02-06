import React, { FC } from "react";
import { ISeminar } from "../../../models/ISeminar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Chip, Stack, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import ImagePreview from "../../../components/common/ImagePreview";

interface IProps {
  seminar: ISeminar;
  onDelete: () => void;
  onEdit: () => void;
}

const SeminarCard: FC<IProps> = ({ seminar, onDelete, onEdit }) => {
  const isMobile = useMediaQuery("(max-width:380px)");
  return (
    <Card sx={{
      display: "flex",
      flexDirection: "column",
    }}>
      <CardHeader
        sx={{ flex: "0 0 auto", height: isMobile ? "70px" : "90px" }}
        title={seminar.title}
      />
      <Box sx={{ position: "relative", width: "100%" }}>
        <ImagePreview
          src={seminar.photo}
          alt="seminar photo"
        />
      </Box>
      <CardContent sx={{ flex: "1 0 auto", p: isMobile ? 1 : 2 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {seminar.description}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          marginTop: "auto",
          padding: isMobile ? "6px" : "16px",
        }}
        disableSpacing
      >
        <Stack direction="row"
               justifyContent="space-between"
               alignItems="center"
               sx={{ width: "100%" }}>
          <IconButton onClick={onDelete} aria-label="delete seminar">
            <DeleteIcon />
          </IconButton>
          <Chip label={seminar.date} color="info" />
          <Chip label={isMobile ? `в ${seminar.time}` : `Начало в ${seminar.time}`}
                color="primary" />
          <IconButton onClick={onEdit} aria-label="edit seminar">
            <EditIcon />
          </IconButton>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default SeminarCard;