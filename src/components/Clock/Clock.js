import React, { useState, useEffect } from "react";
import styles from "./Clock.module.css";

export default function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const padZero = (num) => (num < 10 ? "0" + num : num);
    const updateTime = () => {
      let now = new Date();
      let hours = now.getHours();
      let minutes = padZero(now.getMinutes());
      let period = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      setTime(`${hours}:${minutes} ${period}`);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return <div className={styles.clock}>{time}</div>;
}
