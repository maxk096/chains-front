import dayjs from 'dayjs'
import { makeObservable, flow } from 'mobx'
import { LoadingStore } from '../loading/loading-store'
import { createObjectCsvStringifier } from 'csv-writer'

export const dataExportState = {
    EXPORTING_DATA_AS_JSON: 'EXPORTING_DATA_AS_JSON',
    EXPORTING_DATA_AS_CSV: 'EXPORTING_DATA_AS_CSV'
}

export class DataExportStore extends LoadingStore {
    constructor(props) {
        super()
        this.habitsTransport = props.habitsTransport
        makeObservable(this, {
            getExportData: flow,
            handleExportDataAsJson: flow,
            handleExportDataAsCsv: flow
        })
    }

    *getExportData() {
        const [habitsSnapshot, executionsSnapshot] = yield Promise.all([
            this.habitsTransport.habitsCollection.orderBy('createdAt', 'desc').get(),
            this.habitsTransport.executionsCollection.orderBy('createdAt', 'desc').get()
        ])
        const habits = []
        habitsSnapshot.forEach((habit) => {
            habits.push({ id: habit.id, ...habit.data() })
        })
        const executions = []
        executionsSnapshot.forEach((execution) => {
            executions.push({ id: execution.id, ...execution.data() })
        })
        return { habits, executions }
    }

    downloadReportBlob = ({ blob, title }) => {
        const objUrl = URL.createObjectURL(blob)
        const blobDate = dayjs().format('DD-MM-YYYY HH-mm-ss')
        const blobName = `${title} ${blobDate}`
        const a = document.createElement('a')
        a.setAttribute('download', blobName)
        a.setAttribute('href', objUrl)
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(objUrl)
    }

    exportDataAsJson = async (...p) => {
        return await this.handleExportDataAsJson(...p)
    };

    *handleExportDataAsJson() {
        try {
            this.deleteErrorState(dataExportState.EXPORTING_DATA_AS_JSON)
            this.addLoadingState(dataExportState.EXPORTING_DATA_AS_JSON)
            const data = yield this.getExportData()
            const formattedData = JSON.stringify(data, 0, 4)
            const type = 'application/json;encoding:utf-8;'
            const blob = new Blob([formattedData], { type })
            this.downloadReportBlob({ blob, title: 'Report' })
        } catch (ex) {
            this.addErrorState(dataExportState.EXPORTING_DATA_AS_JSON, ex.message)
        } finally {
            this.deleteLoadingState(dataExportState.EXPORTING_DATA_AS_JSON)
        }
    }

    exportDataAsCsv = async (...p) => {
        return await this.handleExportDataAsCsv(...p)
    };

    *handleExportDataAsCsv() {
        try {
            this.deleteErrorState(dataExportState.EXPORTING_DATA_AS_CSV)
            this.addLoadingState(dataExportState.EXPORTING_DATA_AS_CSV)
            const data = yield this.getExportData()
            this.exportCsvExctions(data.executions)
            this.exportCsvHabits(data.habits)
        } catch (ex) {
            this.addErrorState(dataExportState.EXPORTING_DATA_AS_CSV, ex.message)
        } finally {
            this.deleteLoadingState(dataExportState.EXPORTING_DATA_AS_CSV)
        }
    }

    exportCsvExctions = (executions) => {
        const executionsCsvStringifier = createObjectCsvStringifier({
            header: [
                { id: 'id', title: 'Id' },
                { id: 'type', title: 'Type' },
                { id: 'habitId', title: 'Habit Id' },
                { id: 'createdAt', title: 'Created at' }
            ]
        })
        const csvContent =
            executionsCsvStringifier.getHeaderString() + executionsCsvStringifier.stringifyRecords(executions)
        const type = 'text/csv;encoding:utf-8;'
        const blob = new Blob([csvContent], { type })
        this.downloadReportBlob({ blob, title: 'Executions report' })
    }

    exportCsvHabits = (executions) => {
        const executionsCsvStringifier = createObjectCsvStringifier({
            header: [
                { id: 'id', title: 'Id' },
                { id: 'name', title: 'Name' },
                { id: 'type', title: 'Type' },
                { id: 'icon', title: 'Icon' },
                { id: 'question', title: 'Question' },
                { id: 'reason', title: 'Reason' },
                { id: 'executionDays', title: 'Execution days' },
                { id: 'createdAt', title: 'Created at' }
            ]
        })
        const csvContent =
            executionsCsvStringifier.getHeaderString() + executionsCsvStringifier.stringifyRecords(executions)
        const type = 'text/csv;encoding:utf-8;'
        const blob = new Blob([csvContent], { type })
        this.downloadReportBlob({ blob, title: 'Habits report' })
    }
}
