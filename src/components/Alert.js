import React from 'react'
import PropTypes from 'prop-types'


export default function Alert(props) {

    const capitalize = (word) => {
        if(word==='danger'){
            word='error'
        }
        const l = word.toLowerCase()
        return l.charAt(0).toUpperCase() + l.slice(1)
    }

    return (
        <div style={{ height: "50px" }}>
            {props.alert && <div className={`alert fixed-top alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
            </div>}
        </div>
    )
}

Alert.prototype = { alert: PropTypes.string }
Alert.defaultProps = { alert: "Add alert now" }