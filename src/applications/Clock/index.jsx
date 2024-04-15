import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import MainLayout from "../../components/layout/MainLayout";
import Seo from "../../components/seo";
import { Container, Nav, NavDropdown, Row, Col, Button } from "react-bootstrap";
import localStore from '../../libs/localStore';
import { ActionSetTimers , ActionGetTimers, ActionCreateTimer, ActionDeleteTimer, ActionLoadClockData, ActionClearClockData } from '../../state/reducers/appClockReducer';
import TimerTable from './timerTable';

import './app.css';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const timerTypes = ["Day Timer", "Date Countdown", "Annual Countdown"];
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
  }
}

const applicationName = "Clock";
const targetSystemCode = "CLOCK";
const fileNameStr = "MKO_APP_Clock.dat";
const AppView = ({ selectedContentPanel, CreateTimer, DeleteTimer, ClearClockData, LoadClockData, GetTimers, timers }) => {
  const [state, setState] = useState(initalState);
  useEffect(() => {
    GetTimers();
  }, [GetTimers]);
  const fs = new localStore();
  
  const onFormFieldChange = e => {
    let formData = state.formData;
    formData[e.target.name] = e.target.value;
    setState({...state, formData });
  }

  const onCreateTimer = () => {
    const { label, finishMessage, timerType, year, month, day, hours, minutes, seconds } = state.formData;
    let timer = null;
    switch(timerType){
      case "Day Timer":
        timer = { label, finishMessage, timerType, year: null, month: null, day: null, hours, minutes, seconds };
      break;
      case "Date Countdown":
        timer = { label, finishMessage, timerType, year, month, day, hours, minutes, seconds };
      break;
      case "Annual Countdown":
        timer = { label, finishMessage, timerType, year: null, month, day, hours, minutes, seconds };
      break;
      default:
        console.log('ERROR: unsupported timer type ', timerType);
    }
    setState({...state, formData: initalState.formData});
    CreateTimer(timer, timers);
  }
  
  return (
    <Fragment>
      <Seo title={applicationName} />
      <MainLayout activePos={-1} nonScroll noSidePanel subTitle={applicationName}>
        <MainLayout.Navigation>
          <Nav className="me-auto">
              <NavDropdown title="File">
                  <NavDropdown.Item onClick={() => ClearClockData()}>Clear Clock Data</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => fs.importFile(LoadClockData, targetSystemCode)}>Load Clock Data</NavDropdown.Item>
                  <NavDropdown.Item  onClick={() => fs.exportFile(timers, fileNameStr, targetSystemCode)}>Export Clock Data</NavDropdown.Item>
              </NavDropdown>
          </Nav>
        </MainLayout.Navigation>
        <Container fluid>
          <Row>
            <Col md="2" className={`page-menu${selectedContentPanel===0 ? ' active' : ''}`}>
              <form>
                <label>Label<input name="label" type="text" value={state.formData.label} onChange={(e) => onFormFieldChange(e)}/></label>
                <label>End Message<input name="finishMessage" type="text" value={state.formData.finishMessage} onChange={(e) => onFormFieldChange(e)}/></label>
                <label>Type
                  <select name="timerType" value={state.formData.timerType} onChange={(e) => onFormFieldChange(e)}>{timerTypes.map((e,i) => <option key={i} value={e}>{e}</option>)}</select>
                </label>
                <label>Year<input name="Year" type="number" value={state.formData.year} onChange={(e) => onFormFieldChange(e)} disabled={state.formData.timerType===timerTypes[0] || state.formData.timerType===timerTypes[2]}/></label>
                <label>Month
                  <select name="month" value={state.formData.month} onChange={(e) => onFormFieldChange(e)} disabled={state.formData.timerType===timerTypes[0]}>{months.map((m,i) => <option key={i} value={m}>{m}</option>)}</select>
                </label>
                <label>Day<input name="day" value={state.formData.day} onChange={(e) => onFormFieldChange(e)} type="number" disabled={state.formData.timerType===timerTypes[0]} /></label>
                <label>Hours<input name="hours" value={state.formData.hours} onChange={(e) => onFormFieldChange(e)} type="number" /></label>
                <label>Minutes<input name="minutes" value={state.formData.minutes} onChange={(e) => onFormFieldChange(e)} type="number" /></label>
                <label>Seconds<input name="seconds" value={state.formData.seconds} onChange={(e) => onFormFieldChange(e)} type="number" /></label>
                <Button onClick={() => onCreateTimer()} variant="success" size="lg">Create Timer</Button>
              </form>
            </Col>
            <Col md="10" className={`body-page${selectedContentPanel===1 ? ' active' : ''}`}>
              <TimerTable timers={timers} onDeleteTimer={(timerIndex) => DeleteTimer(timerIndex, timers)} />
            </Col>
          </Row>
        </Container>
      </MainLayout>
    </Fragment>
  );
}

AppView.propTypes = {};

const mapStateToProps = (state, props) => {
  const { timers } = state.appClock;
  return { timers };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    SetTimers: (timers) => ActionSetTimers(dispatch, timers),
    GetTimers: () => ActionGetTimers(dispatch),
    CreateTimer: (timer, timers) => ActionCreateTimer(dispatch, timer, timers),
    DeleteTimer: (index, timers) => ActionDeleteTimer(dispatch, index, timers),
    ClearClockData: () => ActionClearClockData(dispatch),
    LoadClockData: (data) => ActionLoadClockData(dispatch, data)
});
}

export default connect(mapStateToProps, mapDispatchToProps)(AppView);