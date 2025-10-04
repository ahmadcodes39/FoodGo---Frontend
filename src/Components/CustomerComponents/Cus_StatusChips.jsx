import React from "react";

const Cus_StatusChips = ({ openingHours }) => {
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}`;

  const isOpen =
    currentTime >= openingHours.open && currentTime <= openingHours.close;

  return (
    <div
      className={`badge ${
        isOpen ? "badge-success" : "badge-error"
      } text-white`}
    >
      {isOpen ? "Open" : "Closed"}
    </div>
  );
};

export default Cus_StatusChips;
