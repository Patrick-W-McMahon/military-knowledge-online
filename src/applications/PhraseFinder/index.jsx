import React, { Fragment, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import Seo from "../../components/seo";
import { Container } from "react-bootstrap";


const initalState = {
    phraseStr: "",
    phrases: [],
    sourceData: "",
    results: ""
}

const AppView = () => {
    const [ state, setState] = useState(initalState);
    //const { } = pageContext; { pageContext }
    

    const updatePhrases = event => {
        const { value: phraseStr } = event.target;
        const phrases = phraseStr.split(',');
        console.log("updatePhrases", phrases);
        setState({...state, phraseStr, phrases });
    }

    const updateSourceData = event => {
        const { value: sourceData } = event.target;
        setState({...state, sourceData });
    }

    const generateResults = () => {
        let results = "";
        const { phrases, sourceData } = state;
        const lowSD = sourceData.toLowerCase();
        phrases.forEach(phrase => {
            const lp = phrase.toLowerCase();
            if(lowSD.includes(lp)) {
                results+=`${phrase}\n`;
            }
        });
        console.log("results",results);
        setState({...state, results });
    }

    return (
        <Fragment>
          <MainLayout activePos={2} nonScroll>
            <Seo title={`Phrase Finder`} />
            <Container className="app-form">
                <div>
                    <button className="btn btn-outline-info btn-sm" disabled={true}>Load Phrases</button>
                    <button className="btn btn-outline-info btn-sm" disabled={true}>Save Phrases</button>
                    <button className="btn btn-outline-info btn-sm" onClick={() => generateResults()}>Generate Results</button>
                    <button className="btn btn-outline-info btn-sm" disabled={true}>Export Results</button>
                </div>
                <form className="survey_form">
                    <h3>Phrases <span className="subtext">(Seperate phrases with commas)</span></h3>
                    <textarea id="phrases" rows="3"  value={state.phraseStr} onChange={e => updatePhrases(e)}></textarea>
                    <h3>Source Data</h3>
                    <textarea id="source" rows="20" value={state.sourceData} onChange={e => updateSourceData(e)}></textarea>
                    <h3>Results</h3>
                    <textarea id="results" rows="20" value={state.results} readOnly={true}></textarea>
                </form>
            </Container>
          </MainLayout>
        </Fragment>
    );
}
export default AppView;