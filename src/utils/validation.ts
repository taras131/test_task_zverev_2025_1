import {IErrors, ISeminar} from "../models/ISeminar";

export const isValidURL = (urlString: string): boolean => {
    try {
        new URL(urlString);
        return true;
    } catch (_) {
        return false;
    }
};

export const validateSeminarForm = (data: ISeminar): IErrors => {
    const errors: IErrors = {
        title: "",
        description: "",
        photo: "",
    };

    if (!data.title.length) {
        errors.title = "Заголовок обязателен";
    } else if (data.title.length > 50) {
        errors.title = "Заголовок не может быть длиннее 50 символов";
    }

    if (!data.description) {
        errors.description = "Описание обязательно";
    } else if (data.description.length > 400) {
        errors.description = "Описание не может быть длиннее 400 символов";
    }

    if (!data.photo) {
        errors.photo = "Ссылка на фото обязательна";
    } else if (data.photo.length > 600) {
        errors.photo = "Ссылка на фото не может быть длиннее 600 символов";
    } else if (!isValidURL(data.photo)) {
        errors.photo = "Ссылка на фото должна быть валидным URL";
    }

    return errors;
};