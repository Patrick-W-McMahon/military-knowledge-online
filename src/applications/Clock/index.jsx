import React, { Fragment, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import Seo from "../../components/seo";
import { Container, Nav, NavDropdown, Row, Col, Button, Table } from "react-bootstrap";

import './app.css';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const timerTypes = ["Day Timer", "Date Countdown"];
const initalState = {
  formData: {
    label: "",
    finishMessage: "",
    timerType: timerTypes[0],
    year: 2024,
    month: months[0],
    day: 1,
    hours: 8,
    minutes: 0,
    seconds: 0
  },
  timers: []
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

const applicationName = "Clock";
const AppView = ({ selectedContentPanel }) => {
  const [state, setState] = useState(initalState);
  //const [seconds, setSeconds] = useState((new Date()).getSeconds());
  const [todayDate, setTodaysDate] = useState(new Date());
 
  
  setTimeout(() => {// Update Timers
    const now = new Date();
    setTodaysDate(now);
    //setSeconds((new Date()).getSeconds());
    //console.log('seconds: ', seconds);
    //console.log('update: ', now);
    /*
    const timers = state.timers.map(t => {
      switch(t.timerType) {
        case "Day Timer":
          const target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0);
          const diff = (target - now);
          const hh = getHours(diff);
          const mm = getMinutes(diff);
          const ss = getSeconds(diff);
          const display = diff < 0 ? t.finishMessage : `${hh}:${mm}:${ss}`;
          return {...t, display};
        case "Date Countdown":
          return {...t};
        default:
          console.log('ERROR: unsupported timer type ', t.timerType);
          return {...t};
      }
    });
    setState({...state, timers});
    */
  }, 1000);


    const onFormFieldChange = e => {
      let formData = state.formData;
      formData[e.target.name] = e.target.value;
      setState({...state, formData });
    }

    const onDeleteTimer = index => {
      //(prevState) => prevState.filter((prevItem, i) => i === index)
      const newTimers = state.timers.filter((t,i) => i !== index);
      setState({...state, timers: newTimers});
    }

    const createTimer = () => {
      const { label, finishMessage, timerType, year, month, day, hours, minutes, seconds } = state.formData;
      switch(timerType){
        case "Day Timer":
          setState({...state, timers: [...state.timers, { label, finishMessage, timerType, year: null, month: null, day: null, hours, minutes, seconds }]});
          return;
        case "Date Countdown":
          setState({...state, timers: [...state.timers, { label, finishMessage, timerType, year, month, day, hours, minutes, seconds }]});
          return;
        default:
          console.log('ERROR: unsupported timer type ', timerType);
      }
    }
    console.log(state.timers);
    return (
        <Fragment>
          <Seo title={applicationName} />
          <MainLayout activePos={-1} nonScroll noSidePanel subTitle={applicationName}>
            <MainLayout.Navigation>
              <Nav className="me-auto">
                  <NavDropdown title="File">
                      <NavDropdown.Item onClick={() => null}>New Dataset</NavDropdown.Item>
                      <NavDropdown.Item onClick={() => null}>Load Dataset</NavDropdown.Item>
                      <NavDropdown.Item  onClick={() => null}>Export Dataset</NavDropdown.Item>
                  </NavDropdown>
              </Nav>
            </MainLayout.Navigation>
            <Container fluid>
              <Row>
                <Col md="2" className={`page-menu${selectedContentPanel===0 ? ' active' : ''}`}>
                  <form>
                    <label>Label<input name="label" type="text" value={state.formData.label} onChange={(e) => onFormFieldChange(e)}/></label>
                    <label>Finish Message<input name="finishMessage" type="text" value={state.formData.finishMessage} onChange={(e) => onFormFieldChange(e)}/></label>
                    <label>Type
                      <select name="timerType" value={state.formData.timerType} onChange={(e) => onFormFieldChange(e)}>{timerTypes.map((e,i) => <option key={i} value={e}>{e}</option>)}</select>
                    </label>
                    <label>Year<input name="Year" type="number" value={state.formData.year} onChange={(e) => onFormFieldChange(e)} disabled={state.formData.timerType===timerTypes[0]}/></label>
                    <label>Month
                      <select name="month" value={state.formData.month} onChange={(e) => onFormFieldChange(e)} disabled={state.formData.timerType===timerTypes[0]}>{months.map((m,i) => <option key={i} value={m}>{m}</option>)}</select>
                    </label>
                    <label>Day<input name="day" value={state.formData.day} onChange={(e) => onFormFieldChange(e)} type="number" disabled={state.formData.timerType===timerTypes[0]} /></label>
                    <label>Hours<input name="hours" value={state.formData.hours} onChange={(e) => onFormFieldChange(e)} type="number" /></label>
                    <label>Minutes<input name="minutes" value={state.formData.minutes} onChange={(e) => onFormFieldChange(e)} type="number" /></label>
                    <label>Seconds<input name="seconds" value={state.formData.seconds} onChange={(e) => onFormFieldChange(e)} type="number" /></label>
                    <Button onClick={() => createTimer()} variant="success" size="lg">Create Timer</Button>
                  </form>
                </Col>
                <Col md="10" className={`body-page${selectedContentPanel===1 ? ' active' : ''}`}>
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
                      {state.timers.map((timer,i) => {
                        const display = getTimerDisplay(todayDate, timer);
                        const { timerType, year, month, day, hours, minutes, seconds } = timer;
                        return (
                          <tr key={i}>
                            <td>{i+1}</td>
                            <td>{timer.label}</td>
                            <td>{display}</td>
                            <td>{timerType === 'Day Timer'? `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}`: `${month}/${pad(day, 2)}/${pad(year, 4)} - ${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}`}</td>
                            <td><Button variant="danger" onClick={() => onDeleteTimer(i)}>Delete</Button></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Container>
          </MainLayout>
        </Fragment>
      );
}

export default AppView;