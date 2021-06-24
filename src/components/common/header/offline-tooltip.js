import React from 'react'
import { flowRight } from 'lodash'
import { Tooltip } from '@material-ui/core'
import WifiOffIcon from '@material-ui/icons/WifiOff'
import { inject, observer } from 'mobx-react'

const OfflineTooltipPure = (props) => {
    const { connectionStateStore, className } = props
    const { isOnline } = connectionStateStore

    if (isOnline) {
        return null
    }

    return (
        <Tooltip title='You are offline. Certain functions will not work.' enterTouchDelay={0}>
            <WifiOffIcon className={className} />
        </Tooltip>
    )
}

export const OfflineTooltip = flowRight(inject('connectionStateStore'), observer)(OfflineTooltipPure)
