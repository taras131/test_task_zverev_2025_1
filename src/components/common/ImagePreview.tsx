import {FC} from "react";
import Typography from "@mui/material/Typography";

interface IProps {
    src: string;
    placeholderSrc: string;
}

export const ImagePreview: FC<IProps> = ({ src, placeholderSrc }) => (
    <>
        <Typography variant="caption">Предпросмотр изображения:</Typography>
        <img
            src={src || placeholderSrc}
            alt="Предпросмотр"
            style={{
                maxWidth: "100%",
                maxHeight: "200px",
                objectFit: "contain",
                border: "1px solid #ccc",
                borderRadius: "4px",
            }}
            onError={(e) => {
                e.currentTarget.src = placeholderSrc;
            }}
        />
    </>
);