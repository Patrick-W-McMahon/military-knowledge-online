import React, { useState } from "react";
import { Button, Table,  } from "react-bootstrap";


function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

function getDays(diff) {
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}
function getHours(diff) {
    return Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
}
function getMinutes(diff) {
    return Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
}
function getSeconds(diff) {
    return Math.floor((diff % (1000 * 60)) / 1000);
}

function getTimerDisplay(todayDate, timer) {
    let display = '';
    switch(timer.timerType) {
      case "Day Timer":
        const target = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate(), timer.hours, timer.minutes, timer.seconds);
        const diff = (target - todayDate);
        const hh = getHours(diff);
        const mm = getMinutes(diff);
        const ss = getSeconds(diff);
        display = diff < 0 ? timer.finishMessage : `${pad(hh,2)}:${pad(mm,2)}:${pad(ss,2)}`;
      break;
      case "Date Countdown":
        display='not working yet';
      break;
      default:
        console.log('ERROR: unsupported timer type ', timer.timerType);
        display='ERR...';
      break;
    }
    return display;
  }

const TimerTable = ({ timers, onDeleteTimer }) => {
    const [todayDate, setTodaysDate] = useState(new Date());
    setTimeout(() => {// Update Timers
        const now = new Date();
        setTodaysDate(now);
    }, 1000);

    return (
        <Table bordered hover responsive striped>
            <thead>
                <tr>
                <th>#</th>
                <th>Label</th>
                <th>Timer</th>
                <th>Timer Set</th>
                <th>Settings</th>
                </tr>
            </thead>
            <tbody>
                {(timers || []).map((timer,i) => {
                    const display = getTimerDisplay(todayDate, timer);
                    const { timerType, year, month, day, hours, minutes, seconds } = timer;
                    return (
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{timer.label}</td>
                            <td>{display}</td>
                            <td>{timerType === 'Day Timer'? `[Day] | ${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}`: `[Date] | ${month}/${pad(day, 2)}/${pad(year, 4)} - ${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}`}</td>
                            <td><Button variant="danger" onClick={() => onDeleteTimer(i)}>Delete</Button></td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default TimerTable;