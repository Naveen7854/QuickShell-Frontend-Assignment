import React from "react";
import "./TicketCard.css";
import noPriorityIcon from "../assets/no_priority.svg";
import lowPriorityIcon from "../assets/low_priority.svg";
import mediumPriorityIcon from "../assets/medium_priority.svg";
import highPriorityIcon from "../assets/high_priority.svg";
import urgentPriorityIcon from "../assets/urgent_priority.svg";
import BacklogIcon from "../assets/Backlog.svg";
import DoneIcon from "../assets/Done.svg";
import CancelledIcon from "../assets/Cancelled.svg";
import TodoIcon from "../assets/To-do.svg";
import InprogressIcon from "../assets/in-progress.svg";
const priorityIcons = [
  noPriorityIcon,
  lowPriorityIcon,
  mediumPriorityIcon,
  highPriorityIcon,
  urgentPriorityIcon,
];
const statusLabels = ["Backlog", "Todo", "In progress", "Done", "Cancelled"];
const statusIcons = [
  BacklogIcon,
  TodoIcon,
  InprogressIcon,
  DoneIcon,
  CancelledIcon,
];
const TicketCard = ({ ticket, user, grouped }) => {
  const status = ticket.status;
  const priority = ticket.priority;
  const grouping = grouped.toLowerCase();
  const IconIndex =
    grouping === "priority" ? statusLabels.indexOf(status) : priority;
  const Icon =
    grouping == "priority" ? statusIcons[IconIndex] : priorityIcons[IconIndex];
  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span className="ticket-id">{ticket.id}</span>
        <div className="ticket-type">
          {user && (
            <img
              src={user.avatar || "/avatar1.png"}
              alt={user.name}
              className="user-avatar"
            />
          )}
          <span className="type-label">{ticket.type}</span>
        </div>
      </div>
      <h4 className="ticket-title">{ticket.title}</h4>
      <div className="ticket-footer">
        {<img src={Icon} alt={IconIndex} className="group" />}

        <span className="feature-request">Feature Request</span>
      </div>
    </div>
  );
};

export default TicketCard;
