import React, { memo } from 'react'
import './Button.scss'
import classNames from 'classnames'
export default memo(function Button({ text, onClick, useDangerousMode, icon }) {

    return (
        <button className={classNames(["list-button", useDangerousMode && "list-button--dangerous"])} onClick={onClick}>
            {icon}       {text}
        </button>
    )
})
