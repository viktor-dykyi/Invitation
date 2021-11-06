import React, { PureComponent } from 'react';
import MemberItem from "./MemberItem/MemberItem";
import "./MembersList.scss";

export default class MembersList extends PureComponent {
  
  render() {
    const { users, onDeleteMember, onStatusChange } = this.props;
    return (
      <>
        <ul className="members-list">
          {users.map(({ firstName, lastName, id, accepted }) => (
            <li key={id}>
              <MemberItem accepted={accepted} onStatusChange={onStatusChange} onDeleteItem={onDeleteMember} id={id} firstName={firstName} lastName={lastName} />
            </li>
          ))}
        </ul>
      </>
    )
  }
}
