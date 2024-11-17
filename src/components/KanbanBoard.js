import React from "react";
import TicketCard from "./TicketCard";
import "./KanbanBoard.css";
import noPriorityIcon from "../assets/no_priority.svg";
import lowPriorityIcon from "../assets/low_priority.svg";
import mediumPriorityIcon from "../assets/medium_priority.svg";
import highPriorityIcon from "../assets/high_priority.svg";
import urgentPriorityIcon from "../assets/urgent_priority.svg";
import addIcon from "../assets/add.svg";
import dotIcon from "../assets/dot.svg";
import BacklogIcon from "../assets/Backlog.svg";
import DoneIcon from "../assets/Done.svg";
import CancelledIcon from "../assets/Cancelled.svg";
import TodoIcon from "../assets/To-do.svg";
import InprogressIcon from "../assets/in-progress.svg";
import Avatar from "../assets/avatar1.png";

const KanbanBoard = ({ tickets, users, grouping, ordering }) => {
  // Define priority labels and colors
  const priorityLabels = ["No priority", "Low", "Medium", "High", "Urgent"];
  const priorityColors = ["#ccc", "#ccc", "#ccc", "#ccc", "#ccc"];
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
  const statusColumns = {
    Backlog: [],
    Todo: [],
    "In progress": [],
    Done: [],
    Cancelled: [],
  };

  const groupBy = (tickets, key) => {
    return tickets.reduce(
      (acc, ticket) => {
        let groupKey;
        // Check if grouping is by priority
        if (key === "priority") {
          groupKey = priorityLabels[ticket.priority] || "No priority"; // Map priority number to label
        } else if (key === "user") {
          // Group by user (assuming each ticket has a userId field)
          groupKey = users[ticket.userId]
            ? users[ticket.userId].name
            : "Unassigned";
        } else {
          // Group by status
          groupKey = ticket[key] || "Todo";
        }

        if (!acc[groupKey]) acc[groupKey] = [];
        acc[groupKey].push(ticket);
        return acc;
      },
      key === "status" ? { ...statusColumns } : {}
    );
  };

  const sortBy = (a, b, ordering) => {
    if (ordering === "Priority") {
      return b.priority - a.priority; // Sort by priority
    }
    if (ordering === "Title") {
      return a.title.localeCompare(b.title); // Sort by title
    }
    return 0;
  };

  const groupedTickets = groupBy(tickets, grouping.toLowerCase());

  const handleAddClick = (group) => {
    alert("This button is for future use.");
  };

  const handleDotClick = (group) => {
    alert("This button is for future use.");
  };

  return (
    <div className="kanban-board">
      {Object.keys(groupedTickets).map((group) => {
        const priorityIndex = priorityLabels.indexOf(group);
        const statusIndex = statusLabels.indexOf(group);
        const statusIcon = statusIcons[statusIndex];
        const priorityColor =
          priorityIndex !== -1 ? priorityColors[priorityIndex] : "#f5f5f5"; // Default to light gray for non-priority groups
        const ticketCount = groupedTickets[group].length;
        const priorityIcon =
          priorityIndex !== -1 ? priorityIcons[priorityIndex] : null;
        return (
          <div className="kanban-column" key={group}>
            <h3
              style={{
                color: "#111",
                padding: "5px",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {grouping.toLowerCase() === "priority" && priorityIcon && (
                <img
                  src={priorityIcon}
                  alt={`${group} icon`}
                  style={{ marginRight: "8px", width: "20px", height: "20px" }}
                />
              )}
              {grouping.toLowerCase() === "status" && statusIcon && (
                <img
                  src={statusIcon}
                  alt={`${group} icon`}
                  style={{ marginRight: "8px", width: "20px", height: "20px" }}
                />
              )}
              {grouping.toLowerCase() === "user" && (
                <img
                  src={Avatar}
                  alt={`${group} icon`}
                  style={{ marginRight: "8px", width: "20px", height: "20px" }}
                />
              )}
              {group} ({ticketCount})
              <div style={{ display: "flex", alignItems: "center" }}>
                <button
                  onClick={() => handleAddClick(group)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    marginLeft: "10px",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={addIcon}
                    alt="Add Icon"
                    style={{
                      width: "20px",
                      height: "20px",
                    }}
                  />
                </button>
                <button
                  onClick={() => handleDotClick(group)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    marginLeft: "10px",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={dotIcon}
                    alt="Dot Icon"
                    style={{
                      width: "20px",
                      height: "20px",
                    }}
                  />
                </button>
              </div>
            </h3>
            {groupedTickets[group]
              .sort((a, b) => sortBy(a, b, ordering))
              .map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  user={users[ticket.userId]}
                  grouped={grouping}
                />
              ))}
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;
