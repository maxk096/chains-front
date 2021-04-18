import { NewHabitModalStore } from './new-habit/new-habit-modal';

export class HabitsStore {
    constructor() {
        this.newHabitModalStore = new NewHabitModalStore()
    }
}