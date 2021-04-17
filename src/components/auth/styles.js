import { createStyles } from '@material-ui/core'

export const authStyles = (theme) => {
    return createStyles({
        content: {
            flex: 1
        },
        card: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 400,
            flexGrow: 1,
            [theme.breakpoints.down('xs')]: {
                width: '100%'
            }
        },
        logo: {
            marginBottom: 10
        },
        form: {
            width: '100%'
        },
        infoWrap: {
            margin: '15px 0',
            display: 'flex',
            justifyContent: 'center'
        },
        infoText: {
            marginRight: 8
        }
    })
}
