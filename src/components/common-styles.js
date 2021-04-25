import { createStyles } from '@material-ui/core'

export const getCommonStyles = (theme) => {
    return createStyles({
        dflex: {
            display: 'flex'
        },
        alignCenter: {
            alignItems: 'center'
        },
        withShadow: {
            boxShadow:
                'inset 0 4px 7px 1px #ffffff, inset 0 -5px 20px rgb(173 186 204 / 25%), 0 2px 6px rgb(0 21 64 / 14%), 0 10px 20px rgb(0 21 64 / 5%)'
        }
    })
}

export const habitCommonStyles = (theme) => {
    return createStyles({
        icon: {
            width: '24px',
            height: '24px',
            color: theme.habit.iconColor
        },
        breakType: {
            backgroundColor: theme.habit.breakType
        },
        buildType: {
            backgroundColor: theme.habit.buildType
        }
    })
}
