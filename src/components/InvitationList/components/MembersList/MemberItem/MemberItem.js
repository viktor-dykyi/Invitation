
import React, { PureComponent } from 'react'
import UserItem from "../../../../UserItem/UserItem";
import "./MemberItem.scss";
import ConfirmDeleteForm from '../../../../ConfirmDeleteForm/ConfirmDeleteForm'

export default class MemberItem extends PureComponent {
  state = { showConfirmDeleteForm: false };
  handleShowConfirmDeleteForm = event => {
    this.setState({ showConfirmDeleteForm: true });
  }
  handleOnSubmit = (event) => { this.props.onStatusChange(this.props.id, event.target.checked) }
  handleCloseConfirmDeleteForm = () => { this.setState({ showConfirmDeleteForm: false }); }
  handleDeleteItem = () => {
    this.props.onDeleteItem(this.props.id)
    this.handleCloseConfirmDeleteForm()
  }
  
  render() {
    const { firstName, lastName, accepted } = this.props
    return (
      <div className="member-item">
        <UserItem firstName={firstName} lastName={lastName} />
        <input checked={accepted} onChange={this.handleOnSubmit} className="member-item__checkbox" type="checkbox" />
        <button onClick={this.handleShowConfirmDeleteForm} className="member-item__delete-button">
          <i className="fa fa-times-circle" />
        </button>
        {this.state.showConfirmDeleteForm && <ConfirmDeleteForm onReject={this.handleCloseConfirmDeleteForm} onConfirm={this.handleDeleteItem} />}
      </div>
    )
  }
}
