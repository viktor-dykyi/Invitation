import React, { PureComponent } from "react";
import UserList from "./components/UsersList/UserList";
import ListCard from "../ListCard/ListCard";
import "../ListCard/ListCard.scss";
import Button from "../ListCard/components/Button/Button";
import AddUserForm from "../AddUserForm/AddUserForm";

export default class UsersCatalog extends PureComponent {
  state = { showAddUserForm: false };
  handleShowAddUserForm = () => {
    this.setState({ showAddUserForm: true });
  };
  handleClose = () => {
    this.setState({ showAddUserForm: false });
  };
  render() {
    return (
      <ListCard innerRef={this.props.innerRef} title="User's catalog">
        <UserList userEditingIds={this.props.userEditingIds} onStartEdit={this.props.onStartEdit} onStopEdit={this.props.onStopEdit} onEdit={this.props.onEdit} onSave={this.props.onSave} users={this.props.users} />
        <Button onClick={this.handleShowAddUserForm} text="Add a new user" />
        {this.state.showAddUserForm && (
          <AddUserForm
            onAdd={this.props.onAdd}
            onClose={this.handleClose}
            useCloseButton={true}
          />
        )}
      </ListCard>
    );
  }
}
