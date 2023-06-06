import React, { Fragment, useState, useEffect } from 'react';
import { graphql, useStaticQuery } from "gatsby";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ActionToggleSideMenu, ActionGetSideMenuMode } from '../../state/reducers/mainLayoutReducer';
import './MainLayout.css';
import Header from './comp/Header';
import Sidebar from './comp/Sidebar';
import Footer from './comp/Footer';

const MainLayout = (props) => {
    console.log('props: ', props);
    const { children, activePos, nonScroll, GetSideMenuMode, ToggleSideMenu, menuExtended } = props;
    const [extendedSideBar, setExtendedSidebar] = useState(false);
    useEffect(() => {
        async function fetchData() {
            await GetSideMenuMode();
            setExtendedSidebar(menuExtended);
        } 
        fetchData();
    });
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    titleLong
                    titleShort
                    footerText
                }
            }
            allSidebarLink(sort: {fields: order}) {
                sidebarLinks: nodes {
                    url
                    text
                    icon
                    order
                }
            }
        }  
    `);
    const { site, allSidebarLink } = data;
    const { siteMetadata } = site;
    const { titleLong, titleShort, footerText } = siteMetadata;
    const { sidebarLinks } = allSidebarLink;

    const handleSidebarToggle = () => {
        setExtendedSidebar(!extendedSideBar);
        ToggleSideMenu(!extendedSideBar);
    }

    const navigationComponent = React.Children.toArray(children).find(child => child.type === MainLayout.Navigation);
    const contentComponents = React.Children.toArray(children).filter(child => child.type !== MainLayout.Navigation);

    return (
        <Fragment>
            <Header extended={extendedSideBar} titleLong={titleLong} titleShort={titleShort} mainSideMenu={sidebarLinks} appMenu={navigationComponent} handleSidebarToggle={() => handleSidebarToggle()} />
            <div className="main-body">
                <Sidebar extended={extendedSideBar} menuItems={sidebarLinks} activePos={activePos} handleSidebarToggle={() => handleSidebarToggle()} />
                <div className={`content-wrapper${extendedSideBar ? ' extended' : ''}`}>
                    <div className={`main-content${nonScroll ? ' no-scroll' : null}`}><Fragment>{contentComponents}</Fragment></div>
                    <Footer><p>{footerText}</p></Footer>
                </div>
            </div>
        </Fragment>
    );
}

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
    activePos: PropTypes.number.isRequired
}

MainLayout.Navigation = ({ children }) => children;

const mapStateToProps = (state, props) => {
    const { side_menu } = state.system;
    return { menuExtended: side_menu };
};

const mapDispatchToProps = (dispatch) => ({
    ToggleSideMenu: (mode) => ActionToggleSideMenu(dispatch, mode),
    GetSideMenuMode: () => ActionGetSideMenuMode(dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);