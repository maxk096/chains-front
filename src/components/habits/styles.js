import { createStyles } from '@material-ui/core'

export const modalStyles = (theme, { controls = 2 } = {}) => {
    return createStyles({
        content: {
            height: '100%'
        },
        card: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: 400,
            flexGrow: 1,
            [theme.breakpoints.down('xs')]: {
                width: '100% !important',
                minWidth: 'initial'
            }
        },
        controls: {
            display: 'grid',
            columnGap: '20px',
            gridTemplateColumns: `repeat(${controls}, 1fr)`
        },
        rootContent: {
            height: '100%',
            outline: 'none'
        }
    })
}
