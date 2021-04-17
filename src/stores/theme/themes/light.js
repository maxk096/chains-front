import { createMuiTheme } from '@material-ui/core/styles'

const img = (file) => `/img/${file}`

export const lightTheme = createMuiTheme({
    fontFamilyMain: 'Roboto',
    palette: {
        primary: {
            main: '#353e49',
            dark: 'rgb(49, 59, 71)'
        },
        error: {
            main: '#ff5050'
        },
        background: {
            default: '#fafafa',
            dark: '#ededed',
            darker: 'rgba(0, 0, 0, 0.5)',
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
        },
        MuiMenuItem: {
            root: {
                fontSize: '0.875rem'
            }
        },
        MuiFab: {
            root: {
                color: '#fff'
            },
            primary: {
                backgroundColor: '#ff9000 !important'
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
        },
        menu: {
            iconColor: '#fff'
        }
    },
    menu: {
        color: '#3a7adb',
        activeColor: '#4c94ff',
        activeItemBg: ''
    },
    light: '#fff',
    logoTitle: '#ff9000',
    logoTitleReversed: '#fff',
    textSecondary: '#7b8692',
    headerLink: '#fff',
    headerLinkActive: '#d9d9d9',
    loadingButtonPendingColor: '#fff',
    habitIconColor: '#001fffa6',
    logoLight: img('chains-logo-light.png'),
    logoOrange: img('chains-logo-orange.png')
})
