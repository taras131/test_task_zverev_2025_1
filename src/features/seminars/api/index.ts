import {ISeminar} from "../../../models/ISeminar";

//интерфейс описывает , что принимают и возвращают методы seminarsAPI
interface ISeminarsAPI {
    getAll: () => Promise<ISeminar[]>;
    update: (updatedSeminar: ISeminar) => Promise<ISeminar>;
    delete: (id: number) => Promise<ISeminar>;
}

const SEMINAR_URL = `${process.env.REACT_APP_API_URL}/seminars`;

export const seminarsAPI: ISeminarsAPI = {
    getAll: async () => {
        const res = await fetch(SEMINAR_URL);
        return await res.json();
    },

    update: async (updatedSeminar) => {
        const res = await fetch(`${SEMINAR_URL}/${updatedSeminar.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedSeminar),
        });
        return await res.json();
    },

    delete: async (id) => {
        const res = await fetch(`${SEMINAR_URL}/${id}`, {
            method: "DELETE",
        });
        return await res.json();
    },
};