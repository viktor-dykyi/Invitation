import React, { memo } from 'react'
import './ListCard.scss'
import classNames from 'classnames'

export default memo(function ListCard({listLength, children, title, innerRef, greenMode }) {
    return (
        <div ref={innerRef} className={classNames(["list-card", greenMode && "list-card--green"])}>
            <span className="list-card__score">
            {listLength}
            </span>
            <h1 className="list-card__heading">
                
                {title}
            </h1>
                {children}
        </div>
    )
})
