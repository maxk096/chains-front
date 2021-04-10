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
        },
        MuiCard: {
            root: {
                padding: '20px'
            }
        },
        MuiButton: {
            root: {
                color: '#fff',
                minHeight: 36
            },
            containedPrimary: {
                backgroundColor: '#ff9000 !important'
            }
        },
        MuiCircularProgress: {
            colorPrimary: {
                color: 'inherit'
            }
        }
    },
    link: {
        text: '#3e7cd8',
        textActive: '#2860b4'
    },
    header: {
        link: {
            text: '#3e7cd8',
            textActive: '#fff',
            bg: 'transparent',
            activeBg: 'hsla(0,0%,100%,.2)'
        }
    },
    light: '#fff',
    logoTitle: '#ff9000',
    logoTitleReversed: '#fff',
    textPrimary: '#465566',
    textSecondary: '#7b8692',
    headerLink: '#fff',
    headerLinkActive: '#d9d9d9',
    loadingButtonPendingColor: '#fff',
    logoLight: img('chains-logo-light.png'),
    logoOrange: img('chains-logo-orange.png')
})
