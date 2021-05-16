import { createStyles } from '@material-ui/core'

export const scrollbarStyles = (theme) => {
    return createStyles({
        withScrollbar: {
            '&::-webkit-scrollbar': {
                height: '8px'
            },
            '&::-webkit-scrollbar-thumb': {
                background: theme.charts.scrollbarThumbBg
            }
        }
    })
}
