import * as React from "react";
import PropTypes from "prop-types";

const BranchSelect = ({ militaryBranches }) => (
    <div className="nav navbar-nav ml-auto military-branch-select">
        {militaryBranches.length > 0 ? militaryBranches.map((branch, index) => (
          <a key={index} href={`/branch/${branch.path}`}>
            <div>
              <img src={`/img/insignia/${branch.seal}`} alt={branch.name} />
              <span>{branch.name}</span>
            </div>
          </a>
        )): null}
      </div>
);

BranchSelect.propTypes = {
    militaryBranches: PropTypes.arrayOf(PropTypes.object)
}
  
BranchSelect.defaultProps = {
    militaryBranches: []
}
  
  export default BranchSelect;