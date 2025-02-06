import { makeAutoObservable } from "mobx";
import { IMessage } from "../../../models/iMessage";

export enum MESSAGE_SEVERITY {
    error = "error",
    info = "info",
    success = "success",
}

export class MessageStore {
    isShow = false;
    message: IMessage = {
        severity: MESSAGE_SEVERITY.success,
        text: "",
    };

    constructor() {
        makeAutoObservable(this);
    }

    setMessage(newMessage: IMessage) {
        this.message = newMessage;
        this.isShow = true;
    }

    resetMessage() {
        this.isShow = false;
        this.message = {
            severity: MESSAGE_SEVERITY.success,
            text: "",
        };
    }
}


