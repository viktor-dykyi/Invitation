import React, { PureComponent } from 'react';
import Overlay from '../Overlay/Overlay';
import './ConfirmDeleteForm.scss'
import Form from '../Form/Form';
export default class ConfirmDeleteForm extends PureComponent {
    render() {
        const { onConfirm, onReject } = this.props;
        return (
            <>
                <Form >
                    <p className="confirm-delete__question">
                        Are you sure to delete this ?
                        </p>
                    <div className="confirm-delete__buttons">
                        <button className="confirm-delete__answer-button" onClick={onConfirm}>
                            yes
                    </button>
                        <button className="confirm-delete__answer-button" onClick={onReject}>
                            no
                    </button>
                    </div>
                </Form>
                <Overlay onClick={onReject} show={true} />
            </ >
        )
    }
}

