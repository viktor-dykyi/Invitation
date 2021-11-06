import React, { memo } from "react";
import ListItem from "./ListItem/ListItem";
import "./UserList.scss";
import { Draggable } from "react-beautiful-dnd";
export default memo(function UserList({
  users,
  onSave,
  onEdit,
  onStartEdit,
  onStopEdit,
  userEditingIds,
}) {
  return (
    <ul className="user-list">
      {users.map(({ firstName, lastName, id }, index) =>
        !userEditingIds.includes(id) ? (
          <Draggable key={id} draggableId={id} index={index}>
            {(provided, snapshot) => (
              <li
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                  ...provided.draggableProps.style,
                }}
              >
                <ListItem
                  id={id}
                  onSave={onSave}
                  firstName={firstName}
                  lastName={lastName}
                  onEdit={onEdit}
                  onStartEdit={onStartEdit}
                  onStopEdit={onStopEdit}
                />
              </li>
            )}
          </Draggable>
        ) : (
          <li key={id}>
            <ListItem
              id={id}
              onSave={onSave}
              firstName={firstName}
              lastName={lastName}
              onEdit={onEdit}
              onStartEdit={onStartEdit}
              onStopEdit={onStopEdit}
            />
          </li>
        )
      )}
    </ul>
  );
});
