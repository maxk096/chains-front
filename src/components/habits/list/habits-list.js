import { createStyles, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import React from 'react'
import { observer } from 'mobx-react'
import { HabitItem } from './habit-item'

const styles = (theme) => {
    return createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column'
        }
    })
}

class HabitsListPure extends React.Component {
    static defaultProps = {
        detailedView: false
    }

    render() {
        const { classes, habits, detailedView } = this.props

        return (
            <div className={classes.root}>
                {habits.map((habit) => (
                    <HabitItem key={habit.id} habit={habit} detailedView={detailedView} />
                ))}
            </div>
        )
    }
}

const HabitsList = flowRight(withStyles(styles), observer)(HabitsListPure)

export { HabitsList }
