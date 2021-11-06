import React, { memo } from 'react'
import './UserItem.scss'
export default memo(function UserItem({ firstName, lastName }) {
    return (
        <div className="user-item">
            <i className="fa fa-user-circle user-item__icon"></i>
            <div className="user-item__info">
                <p className="user-item__text">
                    {firstName}
                </p>
                <p className="user-item__text">
                    {lastName}
                </p>
            </div>
        </div>
    )
})
