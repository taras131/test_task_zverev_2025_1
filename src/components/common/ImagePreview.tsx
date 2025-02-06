import {FC, useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import {IMAGE_PREVIEW} from "../../utils/consts";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import errorPhotoPlaceholder from "../../assets/images/errorLoading.webp";
import photoPlaceholder from "../../assets/images/placeholder.png";
import {isValidURL} from "../../utils/validation";
import {styled} from "@mui/material/styles";

const StyledImage = styled("img")(() => ({
    width: "100%",
    height: "100%",
    objectFit: "cover",
}));

interface IProps {
    src: string;
    alt?: string;
    caption?: string;
    maxHeight?: string,
    maxWidth?: string,
}

const ImagePreview: FC<IProps> = ({
                                      src,
                                      caption,
                                      alt = IMAGE_PREVIEW.ALT,
                                      maxHeight = IMAGE_PREVIEW.DEFAULT_MAX_HEIGHT,
                                      maxWidth = IMAGE_PREVIEW.DEFAULT_MAX_WIDTH,
                                  }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    // при изменении src сбрасываются состояния isLoading и hasError
    useEffect(() => {
        setIsLoading(true);
        setHasError(false);
    }, [src]);
    //обработка события загрузки
    const imageLoadHandler = () => {
        setIsLoading(false);
        setHasError(false);
    };
    // обработка события возникновения ошибки
    const imageErrorHandler = () => {
        setHasError(true);
        setIsLoading(false);
    };
    // валидация src , - если он не валидный то будет показан placeholder, (эту ошибку пользователь увидит
    // в поле ввода ссылки). если src валидный , но при загрузки картинки возникнит ошибка,
    // пользователь будет проинформирован с помощью errorPhotoPlaceholder
    const isValidSrc = isValidURL(src);
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
            }}>
            {caption && (
                <Typography variant="caption">{caption}</Typography>
            )}
            <Box
                sx={{
                    position: "relative",
                    width: maxWidth,
                    height: maxHeight,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "4px",
                    overflow: "hidden",
                }}>
                {isLoading && !hasError && (
                    <CircularProgress
                        size={40}
                        sx={{position: "absolute"}}/>
                )}
                {hasError && (
                    <StyledImage
                        src={isValidSrc ? errorPhotoPlaceholder : photoPlaceholder}
                        alt={IMAGE_PREVIEW.ERROR_PLACEHOLDER}
                        style={{
                            maxHeight,
                            maxWidth,
                            objectFit: "contain",
                        }}/>
                )}
                {!hasError && (
                    <StyledImage
                        src={src}
                        alt={alt}
                        sx={{
                            maxHeight,
                            maxWidth,
                            display: isLoading ? "none" : "block",
                        }}
                        onLoad={imageLoadHandler}
                        onError={imageErrorHandler}/>
                )}
            </Box>
        </Box>
    );
};

export default ImagePreview;
