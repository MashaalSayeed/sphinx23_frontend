import { useEffect, useState } from "react";

const AddZero = (val) => {
  if (val < 10) return `0${val}`;
  else return val;
};

const countdownTimer = (props) => {
  const { setCountdownTime, expiryTime, setExpiryTime } = props;
  const timeInterval = setInterval(() => {
    const countdownDateTime = new Date(expiryTime).getTime();
    const currentTime = new Date().getTime();
    const remainingDayTime = countdownDateTime - currentTime;
    const totalDays = Math.floor(remainingDayTime / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(
      (remainingDayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const totalMinutes = Math.floor(
      (remainingDayTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    const totalSeconds = Math.floor((remainingDayTime % (1000 * 60)) / 1000);

    const runningCountdownTime = {
      Days: totalDays,
      Hours: totalHours,
      Minutes: totalMinutes,
      Seconds: totalSeconds,
    };

    setCountdownTime(runningCountdownTime);

    if (remainingDayTime < 0) {
      clearInterval(timeInterval);
      setExpiryTime(false);
    }
  }, 1000);
};

export { countdownTimer };
