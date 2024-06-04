import React, { Fragment } from "react";
import PropTypes from "prop-types";

const LGrid = ({ children, dataArr = [], dataProps = {}, classProps = "" }) => {
    const template = React.Children.toArray(children).find(child => child.type === LGrid.Template);

    if (!template) {
        return <div>Template Undefined</div>;
    }

    const TemplateElement = template.props.children.type;

    return (
        <Fragment>
            {dataArr.map((data, index) => (
                <TemplateElement key={index} {...data} {...dataProps} classProps={classProps} />
            ))}
        </Fragment>
    );
}

LGrid.propTypes = {
    children: PropTypes.node.isRequired,
    dataArr: PropTypes.array,
    dataProps: PropTypes.object,
    classProps: PropTypes.string
}

LGrid.Template = ({ children }) => children;

LGrid.Template.propTypes = {
    children: PropTypes.node.isRequired
}

export default LGrid;
