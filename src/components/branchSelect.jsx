import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const BranchSelect = ({ militaryBranches }) => (
    <div className="nav navbar-nav ml-auto military-branch-select">
        {militaryBranches.length > 0 ? militaryBranches.map((branch, index) => (
          <Link key={index} to={`/branch/${branch.path}`}>
            <div>
              <img src={`/img/insignia/128/${branch.seal}`} alt={branch.name} />
              <span>{branch.name}</span>
            </div>
          </Link>
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