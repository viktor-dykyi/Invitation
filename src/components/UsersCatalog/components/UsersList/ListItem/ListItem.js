import React, { PureComponent } from 'react'
import UserItem from "../../../../UserItem/UserItem";
import "./ListItem.scss";
import classNames from 'classnames';

export default class ListItem extends PureComponent {
  state = {
    editingUserItem: false,
    firstName: "",
    lastName: "",
    editingEror: false
  }
  componentDidMount = () => {
    const { firstName, lastName } = this.props;
    this.setState({ firstName, lastName })
  }
  handleFirstNameChange = (event) => {
    this.setState({ firstName: event.target.value })
  }
  handleLastNameChange = (event) => {
    this.setState({ lastName: event.target.value })
  }
  handleSave = () => {
    const { firstName, lastName, id, onSave } = this.props;
    onSave(firstName, lastName, id);
  };
  startEditingUserItem = () => {

    this.setState({ editingUserItem: true })
    this.props.onStartEdit(this.props.id)
  }
  stopEditingUserItem = () => {
    this.setState({ editingUserItem: false })
    this.props.onStopEdit(this.props.id)
  }
  handleSubmitEditing = (event) => {
    event.preventDefault();
    const { firstName, lastName, } = this.state;
    if (firstName && lastName) {
      this.props.onEdit(firstName, lastName, this.props.id)
      this.stopEditingUserItem();
    
    } else {
      this.setState({ editingEror: true })
    }
  }
  render() {
    const { firstName, lastName } = this.props;
    return (
      <div className="list-item">

        {this.state.editingUserItem ?
          <form className="user-item__form">
            <input className="user-item__input" value={this.state.firstName} placeholder="first name" onChange={this.handleFirstNameChange} />
            <input className="user-item__input" value={this.state.lastName} placeholder="last name" onChange={this.handleLastNameChange} />
            <div className="user-item__icon-buttons">
              <button onClick={this.handleSubmitEditing} className={classNames(["user-item__icon-button", this.state.editingEror && "user-item__icon-button--error"])}>
                <i class="fa fa-save"></i>
              </button>
              <button onClick={this.stopEditingUserItem} className="user-item__icon-button ">
                <i class="fa fa-minus-circle"></i>
              </button>
            </div>

          </form>
          :
          <><UserItem firstName={firstName} lastName={lastName} />
            <button onClick={this.startEditingUserItem} className="user-item__edit-button">
              <i className="fa fa-edit"></i>
            </button>
            <button onClick={this.handleSave} className="save-button">
              invite
      </button> </>}



      </div>
    )
  }
}

