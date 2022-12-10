import React, { Fragment, useState } from "react";
//import { graphql } from "gatsby";
import Layout from '../components/layout';
import Seo from "../components/seo";
import { Container, Row, Col } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';

const Forms = ({ data, pageContext }) => {
  console.log('data: ', data);
  console.log('pageContext: ', pageContext);
  const { title, fields } = pageContext;

  const handleSubmit = e => {
    e.preventDefault();
    alert("This form is still under development! Nothing is being submitted at this time.");
  }

  return (
    <Fragment>
      <Layout>
        <Seo title={`forms`} />
        <Container className="app-form">
          <h1>{title}</h1>
          <Row>
            <Col md={10}>
              <form className="survey_form">
                  {fields.map((fData, index) => {
                      switch(fData.fieldType) {
                          case "rangeSlider":
                              return (
                                  <div key={`field-${index}`}>
                                      <label htmlFor={fData.name}>{fData.label}</label>
                                      <RangeSlider name={fData.name} min={0} value={5} max={10} step={1} onChange={e => console.log(e)} />
                                  </div>
                              );
                          case "select":
                              return (
                                  <div key={`field-${index}`}>
                                      <label htmlFor={fData.name}>{fData.label}</label>
                                      <select name={fData.name}>{fData.values.map((opt, index) => <option key={index}>{opt}</option>)}</select>
                                  </div>
                              );
                          case "textarea":
                              return (
                                  <div key={`field-${index}`}>
                                      <label htmlFor={fData.name}>{fData.label}</label>
                                      <textarea name={fData.name} />
                                  </div>
                              );
                          default:
                              return <div key={`field-${index}`}>Invalid Fields type</div>;
                      }
                  })}
                  <button type="submit" className="btn btn-success" onClick={e => handleSubmit(e)}>Submit Survey</button>
              </form>
            </Col>
          </Row>
        </Container>
        
      </Layout>
    </Fragment>
  );
}

export default Forms;