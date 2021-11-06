import React, { memo } from 'react'
import './ListStatistic.scss'
export default memo(function ListStatistic({invitedLength, activeLength}) {
    return (
        <div>
            <p className="list-statistic">
                <span className="list-statistic__active-users">
                    active : {activeLength} &nbsp;
                </span>
                <span className="list-statistic__invited-users">
                    invited : {invitedLength}
            </span>
            </p>
        </div>
    )
})
