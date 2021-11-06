import React, { memo } from 'react'
import './Form.scss'
export default memo(function Form({children, ...props}) {
    return (
        <form {...props} className="form">
            {children}
        </form>
    )
})
