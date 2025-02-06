import { SeminarsStore } from "../features/seminars/model/seminarStore";
import { MessageStore } from "../features/message/model/messageStore";

export class RootStore {
  seminarsStore: SeminarsStore;
  messageStore: MessageStore;

  constructor() {
    this.seminarsStore = new SeminarsStore();
    this.messageStore = new MessageStore();
  }
}

export const rootStore = new RootStore();
