import React, { useState } from "react";
import { Button, Table, ButtonGroup } from "react-bootstrap";


function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

function getDaysExact(diff) {
    return Math.round(diff / (1000 * 60 * 60 * 24));
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

function getTimerSetDisplay(timer) {
    const { timerType, year, month, day, hours, minutes, seconds } = timer;
    switch(timerType) {
        case "Day Timer":
            return `[Day]: ${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}`;
        case "Date Countdown":
            return `[Date]: ${month}/${pad(day, 2)}/${pad(year, 4)} - ${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}`;
        case "Annual Countdown":
            return `[Annual]: ${month}/${pad(day, 2)} - ${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}`;
        default:
            console.log('Error: not supported timer type.');
    }
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
        const distance = new Date(`${timer.month} ${timer.day}, ${timer.year} ${timer.hours}:${timer.minutes}:${timer.seconds}`).getTime() - todayDate.getTime();
        display=distance < 0? timer.finishMessage : `${getDays(distance)}d ${getHours(distance)}h ${getMinutes(distance)}m ${getSeconds(distance)}s `;
      break;
      case "Annual Countdown":
        const d = new Date(`${timer.month} ${timer.day}, ${todayDate.getFullYear()} ${timer.hours}:${timer.minutes}:${timer.seconds}`).getTime() - todayDate.getTime();
        if((getDaysExact(d) === 0 || getDaysExact(d) === -1) && d.hours <= 0 && d.minutes <= 0 && d.seconds <= 0) {
            display = timer.finishMessage;
        } else {
            let year = todayDate.getFullYear();
            if(getDaysExact(d) < -1) {
                year++;
            }
            const df = new Date(`${timer.month} ${timer.day}, ${year} ${timer.hours}:${timer.minutes}:${timer.seconds}`).getTime() - todayDate.getTime();
            display =  `${getDays(df)}d ${getHours(df)}h ${getMinutes(df)}m ${getSeconds(df)}s`;
        }
      break;
      default:
        console.log('ERROR: unsupported timer type ', timer.timerType);
        display='ERR...';
      break;
    }
    return display;
  }

const TimerTable = ({ timers, onDeleteTimer, onEditTimer, onMoveTimer }) => {
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
                    return (
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{timer.label}</td>
                            <td>{getTimerDisplay(todayDate, timer)}</td>
                            <td>{getTimerSetDisplay(timer)}</td>
                            <td>
                                <ButtonGroup size="sm">
                                    <Button disabled={i === 0} variant="secondary" onClick={() => onMoveTimer(i, 'up', timers)}>&#11165;</Button>
                                    <Button disabled={i === timers.length - 1} variant="secondary" onClick={() => onMoveTimer(i, 'down', timers)}>&#11167;</Button>
                                    <Button variant="info" onClick={() => onEditTimer(i)}><i className="far fa-edit"></i></Button>
                                    <Button variant="danger" onClick={() => onDeleteTimer(i)}><i className="fas fa-trash-alt"></i></Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default TimerTable;