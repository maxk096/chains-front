import { createStyles, withStyles } from '@material-ui/core'
import { flowRight } from 'lodash'
import React from 'react'
import { withRouter } from 'react-router-dom'
import { routes } from '../../stores/routing/routes'
import { getCommonStyles } from '../common-styles'
import { CommonButton } from '../common/button'
import { Header } from '../common/header'
import { Page } from '../common/page'

const styles = (theme) => {
    return createStyles({
        ...getCommonStyles(theme),
        root: {
            display: 'flex',
            justifyContent: 'center'
        },
        background: {
            position: 'fixed',
            width: '100vw',
            height: '100vh',
            left: 0,
            top: 0,
            zIndex: 1,
            background: `linear-gradient(-150deg, ${theme.home.bg.start} 15%, ${theme.home.bg.middle} 70%, ${theme.home.bg.end} 94%)`
        },
        backgroundBlocks: {
            overflow: 'hidden',
            position: 'absolute',
            width: '100vw',
            height: '100vh',
            left: 0,
            top: 0,
            '& span': {
                height: 190,
                position: 'absolute',
                transform: 'skewY(12deg)',
                transformOrigin: '100%'
            },
            '& span:nth-child(1)': {
                width: '33.33333%',
                top: 0,
                right: '16.66666%',
                left: 'auto',
                bottom: 'auto',
                background: theme.bg.secondary
            },
            '& span:nth-child(2)': {
                right: '79.99999%',
                width: '33.33333%',
                bottom: '90%',
                background: theme.bg.dark
            },
            '& span:nth-child(3)': {
                width: '33.33333%',
                bottom: '5%',
                left: '-16.66666%',
                background: theme.bg.primary
            },
            '& span:nth-child(4)': {
                width: '33.33333%',
                right: 0,
                bottom: 0,
                background: theme.bg.secondary
            },
            '& span:nth-child(5)': {
                left: '29%',
                width: '23.33333%',
                bottom: '12%',
                background: theme.bg.secondary
            }
        },
        content: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: 1000,
            flex: 1,
            zIndex: 2
        },
        block: {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: '20vh',
            color: theme.home.landingText,
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
                marginTop: '10vh'
            }
        },
        landingChart: {
            background: `url("${theme.home.landingChart}")`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            width: 320,
            height: 320,
            transform: 'rotateZ(355deg)',
            borderRadius: '30px',
            [theme.breakpoints.down('sm')]: {
                width: 150,
                height: 150,
                marginBottom: 20
            }
        },
        text: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            '& h1': {
                margin: 0,
                fontWeight: 300,
                fontSize: 36
            },
            '& p': {
                opacity: 0.8,
                fontSize: '1.1em',
                marginBottom: 30
            }
        },
        ctaButton: {
            color: theme.home.landingText,
            backgroundColor: theme.home.ctaBg,
            padding: '5px 15px',
            '&:hover': {
                backgroundColor: theme.home.ctaActiveBg
            }
        }
    })
}

const HomePure = (props) => {
    const { classes, history } = props
    const onStaClick = () => {
        history.push(routes.signup.url)
    }

    return (
        <Page className={classes.root}>
            <div className={classes.background}>
                <div className={classes.backgroundBlocks}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div className={classes.content}>
                <Header isTransparent />
                <div className={classes.block}>
                    <div className={classes.landingChart}></div>
                    <div className={classes.text}>
                        <h1>
                            Form new habits.
                            <br />
                            Simply. Beautifully.
                            <br />
                            Permanently.
                        </h1>
                        <p>Build good habits that will change your life.</p>
                        <CommonButton onClick={onStaClick} className={classes.ctaButton}>
                            Create account
                        </CommonButton>
                    </div>
                </div>
            </div>
        </Page>
    )
}

const Home = flowRight(withStyles(styles), withRouter)(HomePure)

export { Home }
