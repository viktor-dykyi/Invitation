import React, { PureComponent } from "react";
import "./AddUserForm.scss";
import Overlay from "../Overlay/Overlay";
import uuidv1 from "uuid/v1";
import Form from "../Form/Form";
export default class AddUserForm extends PureComponent {
  state = { firstName: "", lastName: "", error: false };
  handleFirstNameChange = event => {
    this.setState({ firstName: event.target.value });
  };
  handleLastNameChange = event => {
    this.setState({ lastName: event.target.value });
  };
  handleAdd = event => {
    const { firstName, lastName } = this.state;
    event.preventDefault();
    if (firstName && lastName) {
      const newId = uuidv1();
      this.setState({ error: false }, () => {
        this.props.onAdd(this.state.firstName, this.state.lastName, newId);
        this.props.onClose();
      })
    }
    else {
      this.setState({ error: true })
    }
  };
  render() {
    const { onClose, useCloseButton } = this.props;
    return (
      <>
        <Form onSubmit={this.handleAdd}>
          {useCloseButton ? (
            <button className="add-user__close-button" onClick={onClose}>
              {" "}
              <i className="fa fa-times-circle" />{" "}
            </button>
          ) : null}
          <div className="add-user__content">
            {this.state.error && <div className="add-user__error-message">You shoud fill all empty fields</div>}
            <input
              onChange={this.handleFirstNameChange}
              value={this.state.firstName}
              className="add-user__input"
              placeholder="write first name"
            />
            <input
              onChange={this.handleLastNameChange}
              value={this.state.lastName}
              className="add-user__input"
              placeholder="write last name"
            />
            <input type="submit" className="add-user__add-button" value="add" />
          </div>
        </Form>
        <Overlay onClick={this.props.onClose} show={true} />
      </>
    );
  }
}
