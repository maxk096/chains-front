import { createMuiTheme } from '@material-ui/core/styles'

const img = (file) => `/img/${file}`

export const lightTheme = createMuiTheme({
    fontFamilyMain: 'Roboto',
    palette: {
        primary: {
            main: '#465566'
        },
        error: {
            main: '#ff5050'
        }
    },
    bg: {
        primary: '#383d44',
        secondary: '#2e2e2e',
        dark: '#222222'
    },
    home: {
        bg: {
            start: '#222222',
            middle: '#373737',
            end: '#3c4859'
        },
        landingText: '#fff',
        ctaBg: '#1da09c',
        ctaActiveBg: '#1b8481',
        landingChart: img('landing-chart.png')
    },
    overrides: {
        MuiAppBar: {
            colorPrimary: {
                backgroundColor: '#ff9000',
                boxShadow: 'none'
            }
        }
    },
    link: {
        text: '#3e7cd8',
        textActive: '#fff',
        bg: 'transparent',
        activeBg: '#1b8481'
    },
    light: '#fff',
    logoTitle: '#fff',
    textPrimary: '#465566',
    textSecondary: '#7b8692',
    headerLink: '#fff',
    headerLinkActive: '#d9d9d9',
    logoLight: img('chains-logo-light.png'),
    logoDark: img('chains-logo-dark.png')
})
