import React, { Fragment } from "react";
import MainLayout from "../components/layout/MainLayout";

const FnfPage = () => {
  return ( 
      <MainLayout>
          <Fragment>
              <div className="body-page">
                <h1>The page you requested could not be found.</h1>
                <div>The page you requested may have moved.</div>
                <div>{'  <= Look at the main menu'}</div>
            </div>  
          </Fragment>
      </MainLayout>
  );
}

export default FnfPage;