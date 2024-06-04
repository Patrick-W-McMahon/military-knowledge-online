import React, { Fragment, useState, useEffect } from 'react';
import { graphql, useStaticQuery } from "gatsby";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ActionToggleSideMenu, ActionGetSideMenuMode, ActionToggleContentPanel, ActionGetContentPanel } from '../../state/reducers/mainLayoutReducer';
import './MainLayout.css';
import Header from './comp/Header';
import Sidebar from './comp/Sidebar';
import Footer from './comp/Footer';
import { strClassTransform } from '../../libs/common';

const MainLayout = (props) => {
    const { children, activePos, subTitle, nonScroll, GetSideMenuMode, ToggleSideMenu, menuExtended, ToggleContentPanel, GetContentPanel, noSidePanel, pageName } = props;
    const [extendedSideBar, setExtendedSidebar] = useState(false);
    useEffect(() => {
        async function fetchData() {
            await GetSideMenuMode();
            setExtendedSidebar(menuExtended);
            GetContentPanel();
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
            allSidebarLink(sort: {order: ASC}) {
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
            <Header extended={extendedSideBar} titleLong={subTitle? `${titleShort} | ${subTitle}` :titleLong} titleShort={subTitle? `${titleShort} | ${subTitle}`: titleShort} mainSideMenu={sidebarLinks} appMenu={navigationComponent} handleSidebarToggle={() => handleSidebarToggle()} handleToggleContentPanel={() => ToggleContentPanel()} />
            {noSidePanel ? (
                <div className={`main-body${pageName !== undefined && pageName.length ? ` page-${strClassTransform(pageName)}`:''}`}>
                    <div className={`content-wrapper full`}>
                        <div className={`main-content${nonScroll ? ' no-scroll' : null}`}><Fragment>{contentComponents}</Fragment></div>
                        <Footer><p>{footerText}</p></Footer>
                    </div>
                </div>
            ) : (
                <div className={`main-body${pageName !== undefined && pageName.length ? ` page-${strClassTransform(pageName)}`:''}`}>
                    <Sidebar extended={extendedSideBar} menuItems={sidebarLinks} activePos={activePos} handleSidebarToggle={() => handleSidebarToggle()} />
                    <div className={`content-wrapper${extendedSideBar ? ' extended' : ''}`}>
                        <div className={`main-content${nonScroll ? ' no-scroll' : null}`}><Fragment>{contentComponents}</Fragment></div>
                        <Footer><p>{footerText}</p></Footer>
                    </div>
                </div>
            )}
            
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
    GetSideMenuMode: () => ActionGetSideMenuMode(dispatch),
    ToggleContentPanel: () => ActionToggleContentPanel(dispatch),
    GetContentPanel: () => ActionGetContentPanel(dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);