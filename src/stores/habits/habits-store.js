import { AddNewHabitStore } from './add-new-habit/add-new-habits';

export class HabitsStore {
    constructor() {
        this.addNewHabitStore = new AddNewHabitStore()
    }
}