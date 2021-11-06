import React, { PureComponent } from "react";
import MembersList from "./components/MembersList/MembersList";
import ListStatistic from "./components/Statistic/ListStatistic";
import ListCard from "../ListCard/ListCard";
import "../ListCard/ListCard.scss";
import Button from "../ListCard/components/Button/Button";
import ConfirmDeleteForm from "../ConfirmDeleteForm/ConfirmDeleteForm";

export default class InvitationList extends PureComponent {
  state = { showConfirmDeleteForm: false, activeLength: 0 };
  static getDerivedStateFromProps=({users}) =>{
    const newActiveLength = users.filter(({accepted})=> accepted).length
    return (
      {activeLength: newActiveLength}
    )
  } 
    handleShowConfirmDeleteForm = event => {
    this.setState({ showConfirmDeleteForm: true });
  }
  handleClear = () => {
    this.props.onClear()
    this.handleCloseConfirmDeleteForm()
  }
  handleCloseConfirmDeleteForm = () => { this.setState({ showConfirmDeleteForm: false }); }

  render() {

    return (
      <ListCard listLength={this.props.invitedLength} greenMode={this.props.isDragingOver} innerRef={this.props.innerRef} title="Invited users">
        <ListStatistic invitedLength={this.props.invitedLength} activeLength={this.state.activeLength} />
        <MembersList onStatusChange={this.props.onStatusChange} onDeleteMember={this.props.onDeleteInvitation} users={this.props.users} />
        {this.props.invitedLength > 0 && <Button
          onClick={this.handleShowConfirmDeleteForm}
          useDangerousMode={true}
          text="Clear invitations"
          icon={<i className="fa fa-trash-alt" />}
        />}
        {this.state.showConfirmDeleteForm && <ConfirmDeleteForm onReject={this.handleCloseConfirmDeleteForm} onConfirm={this.handleClear} />}
      </ListCard>
    );
  }
}
