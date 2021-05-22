import { createStyles, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import React, { useMemo } from 'react'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { getIsoWeekdays } from '../../utils/dayjs'

const styles = (theme) => {
    return createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap'
        }
    })
}

const WeekdayPickerPure = (props) => {
    const { value, onChange, classes, disabled } = props
    const weekdays = useMemo(() => getIsoWeekdays(), [])

    return (
        <ToggleButtonGroup className={classes.root} value={value} onChange={onChange}>
            {weekdays.map((day) => (
                <ToggleButton disabled={disabled} key={day.number} value={day.number}>
                    {day.name}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    )
}

const WeekdayPicker = flowRight(withStyles(styles))(WeekdayPickerPure)

export { WeekdayPicker }
