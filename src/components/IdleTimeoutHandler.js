import React from "react";
import { useIdleTimer } from "react-idle-timer";
import { useNavigate } from "react-router-dom";

const IdleTimeoutHandler = () => {
  const navigate = useNavigate();
  const handleOnIdle = () => {
    alert("You have been logged out due to inactivity.");
    // Perform logout logic here (e.g., clearing tokens, redirecting to login page)
    navigate("/login"); // Redirect to the login page
  };

  useIdleTimer({
    // timeout: 1000 * 60 * 15,
    timeout: 3000,
    onIdle: handleOnIdle,
    debounce: 500,
  });

  return null;
};

export default IdleTimeoutHandler;
