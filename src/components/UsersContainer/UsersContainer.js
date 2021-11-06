import React, { PureComponent } from "react";
import UsersCatalog from "../UsersCatalog/UsersCatalog";
import InvitationList from "../InvitationList/InvitationList";
import "./UsersContainer.scss";
import mockUsers from "../UsersCatalog/utils/mockUsers.json";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export default class UsersContainer extends PureComponent {
  state = {
    allUsers: mockUsers,
    invitedUsers: [],
    isUserEditing: false,
    userEditingIds: [],
  };

  componentDidMount() {
    const allUsers = JSON.parse(localStorage.getItem("allUsers"));
    allUsers && this.setState({ allUsers: [...allUsers] });
    const invitedUsers = JSON.parse(localStorage.getItem("invitedUsers"));
    invitedUsers && this.setState({ invitedUsers: [...invitedUsers] });
  }

  componentDidUpdate(_prevProps, prevState) {
    localStorage.setItem("allUsers", JSON.stringify(this.state.allUsers));
    localStorage.setItem(
      "invitedUsers",
      JSON.stringify(this.state.invitedUsers)
    );
  }

  handleAdd = (firstName, lastName, id) => {
    this.setState({
      allUsers: [{ firstName, lastName, id }, ...this.state.allUsers],
    });
  };

  changeUserNames = (users, firstName, lastName, id) =>
    users.map((user) => {
      if (user.id === id) {
        return { ...user, firstName, lastName };
      } else {
        return user;
      }
    });

  handleEdit = (firstName, lastName, id) => {
    this.setState({
      allUsers: this.changeUserNames(
        this.state.allUsers,
        firstName,
        lastName,
        id
      ),
      invitedUsers: this.changeUserNames(
        this.state.invitedUsers,
        firstName,
        lastName,
        id
      ),
    });
  };

  handleSaveInvitation = (firstName, lastName, id) => {
    !this.state.invitedUsers.find((user) => user.id === id) &&
      this.setState({
        invitedUsers: [
          ...this.state.invitedUsers,
          { firstName, lastName, id, invited: true, accepted: false },
        ],
      });
  };

  handleStartEditUser = (userEditingId) => {
    this.setState({
      isUserEditing: true,
      userEditingIds: [...this.state.userEditingIds, userEditingId],
    });
  };

  handleStopEditUser = (userEditingId) => {
    this.setState({
      isUserEditing: false,
      userEditingIds: [
        ...this.state.userEditingIds.filter((id) => id !== userEditingId),
      ],
    });
  };

  handleClearInvitations = () => {
    this.setState({
      invitedUsers: [],
    });
  };
  handleDeleteInvitation = (userId) => {
    this.setState({
      invitedUsers: [
        ...this.state.invitedUsers.filter(({ id }) => id !== userId),
      ],
    });
  };

  handleUserStatusChange = (id, isActive) => {
    this.setState({
      invitedUsers: this.state.invitedUsers.map((user) => {
        if (user.id === id) {
          return { ...user, accepted: isActive };
        } else {
          return user;
        }
      }),
    });
  };

  onDragEnd = (result) => {
    const { draggableId, destination } = result;
    if (!destination) {
      return;
    }

    if (destination.droppableId === "invitationList") {
      const { firstName, lastName } = this.state.allUsers.find(
        (user) => user.id === draggableId
      );
      !this.state.userEditingIds.includes(draggableId) &&
        this.handleSaveInvitation(firstName, lastName, draggableId);
    }
  };

  render() {
    return (
      <section className="content">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="userCatalog">
            {(provided, snapshot) => (
              <>
                <UsersCatalog
                  userEditingIds={this.state.userEditingIds}
                  onStartEdit={this.handleStartEditUser}
                  onStopEdit={this.handleStopEditUser}
                  isDragingOver={snapshot.isDraggingOver}
                  innerRef={provided.innerRef}
                  onSave={this.handleSaveInvitation}
                  onAdd={this.handleAdd}
                  users={this.state.allUsers}
                  onEdit={this.handleEdit}
                />
                <div className="dnd-staff-placeholder">
                  {provided.placeholder}
                </div>
              </>
            )}
          </Droppable>
          <Droppable droppableId="invitationList">
            {(provided, snapshot) => (
              <>
                <InvitationList
                  isDragingOver={snapshot.isDraggingOver}
                  innerRef={provided.innerRef}
                  invitedLength={this.state.invitedUsers.length}
                  onStatusChange={this.handleUserStatusChange}
                  onClear={this.handleClearInvitations}
                  users={this.state.invitedUsers}
                  onDeleteInvitation={this.handleDeleteInvitation}
                />
                <div className="dnd-staff-placeholder">
                  {provided.placeholder}
                </div>
              </>
            )}
          </Droppable>
        </DragDropContext>
      </section>
    );
  }
}
