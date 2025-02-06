// stores/SeminarsStore.ts
import { makeAutoObservable, runInAction } from "mobx";
import { ISeminar } from "../../../models/ISeminar";
import { seminarsAPI } from "../api";

export class SeminarsStore {
    list: ISeminar[] = [];
    isLoading = false;
    errorMessage = "";

    constructor() {
        makeAutoObservable(this);
    }

    async fetchSeminars() {
        try {
            this.isLoading = true;
            const seminars = await seminarsAPI.getAll();
            runInAction(() => {
                this.list = seminars;
                this.isLoading = false;
            });
        } catch (e) {
            runInAction(() => {
                this.errorMessage = "Не удалось получить семинары.";
                this.isLoading = false;
            });
        }
    }

    async updateSeminar(updatedSeminar: ISeminar) {
        try {
            this.isLoading = true;
            const result = await seminarsAPI.update(updatedSeminar);
            runInAction(() => {
                this.list = this.list.map(seminar =>
                  seminar.id === result.id ? result : seminar
                );
                this.isLoading = false;
            });
            return { success: true, message: "Семинар успешно обновлён." };
        } catch (e) {
            runInAction(() => {
                this.errorMessage = "Не удалось обновить семинар.";
                this.isLoading = false;
            });
            return { success: false, message: this.errorMessage };
        }
    }

    async deleteSeminar(seminarId: number) {
        try {
            this.isLoading = true;
            await seminarsAPI.delete(seminarId);
            runInAction(() => {
                this.list = this.list.filter(seminar => seminar.id !== seminarId);
                this.isLoading = false;
            });
            return { success: true, message: "Семинар успешно удалён." };
        } catch (e) {
            runInAction(() => {
                this.errorMessage = "Не удалось удалить семинар.";
                this.isLoading = false;
            });
            return { success: false, message: this.errorMessage };
        }
    }

    get seminars() {
        return this.list;
    }

    getSeminarById(id: number | null) {
        if (!id) return null;
        return this.list.find(seminar => seminar.id === id) ?? null;
    }
}