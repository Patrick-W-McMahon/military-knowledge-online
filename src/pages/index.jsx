import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useStaticQuery, graphql } from "gatsby";
import { Container, Row, Col, Nav, NavDropdown } from 'react-bootstrap';
import TreeMenu from 'react-simple-tree-menu';
import '../../node_modules/react-simple-tree-menu/dist/main.css';
//import Layout from "../components/layout";
import MainLayout from "../components/layout/MainLayout";
//import Seo from "../components/seo";
//import { getEventMessage } from '../libs/common';
import { getActiveLinks, filterFavLinks } from '../libs/common';
import { ActionSetSelectedFilter , ActionGetSelectedFilter, ActionToggleFavoriteLinks, ActionLoadFavoriteLinks } from '../state/reducers/webLinksReducer';
import { Fragment } from "react";

const ALL_MILITARY_BRANCHS_HASH = 'bc20a19c5afac1c28b8190edb90850c84365b9831effcc3039b9dec9c9909995';
//const ALL_CIVILIAN_HASH = '748f556ff0b046ce31fa364eae4c0b80930f71750431b6722b145f3629f3ff54';
//const USER_FAVORITES_HASH = 'f42d0f9e4b0ec07df97f58277cd5e5ae2cde973c0bf96ae598827e4da1c3bad1';

const CardGrid = ({ cards, showInfo, toggleFav, classProps }) => (
    <Fragment>
        {cards.length && cards.map((card, index) => (
            <LinkCard key={`card-${index}`} card={card} showInfo={showInfo} toggleFav={toggleFav} classProps={classProps} />
        ))}
    </Fragment>
);

const LinkCard = ({ card, showInfo, toggleFav, classProps }) => {
    const { id, hash, title, url, description, cardId, fav, menlo } = card;
    const cardIdStr = String(cardId).padStart(3, '0');
    return (
        <div key={id} className={`card-panel ${classProps ? ` ${classProps}`: ''}`}>
            <div className="card-panel-content">
                <a className="imgLink" rel="noreferrer" target="_blank" href={url}>
                    <img src={`/img/cards/Card-${cardIdStr}.png`} alt={title} />
                </a>
                <div className="card-body">
                    <h5 className="card-title">
                        <a rel="noreferrer" target="_blank" href={url}>{title}</a>
                    </h5>
                    <p className="card-text hidden">{description}</p>
                </div>
            </div>
            <div className="mini-side-panel">
                <i onClick={() => toggleFav(hash)} role="link" aria-label={'link'} title="Add/Remove Favorite" tabIndex={-1} onKeyDown={() => {}} className={`fa${fav?'s':'r'} fa-star fa-1x`}></i>
                <i onClick={() => alert('Menlo Security option not setup yet.')} title="Open with Menlo Security" role="link" aria-label={'Menlo Security'} tabIndex={-1} onKeyDown={() => {}} className={`fas fa-lock${menlo?null:'-open'} fa-1x`}></i>
                <i onClick={() => showInfo({ title, url, description, cardId })} title="Info Card" role="link" aria-label={'info'} tabIndex={-1} onKeyDown={() => {}} className={`fas fa-info-circle fa-1x`}></i>
                <a href="https://github.com/Patrick-W-McMahon/military-knowledge-online/issues/new" target="_blank" rel="noreferrer"><i title="Report Broken Link" role="link" aria-label={'broken link'} tabIndex={-1} onKeyDown={() => {}} className={`fas fa-unlink fa-1x`}></i></a>
            </div>
        </div>
    );
};


const IndexPage = (props) => {
    const data = useStaticQuery(graphql `
    query MyQuery {
        allLinksData(filter: {active: {eq: true}}) {
          group(field: {branch: SELECT}) {
            group: fieldValue
            links: nodes {
              title
              url
              description
              categories
              branch
              cardId
              id
              hash
              active
            }
            groupLinks: group(field: {alphaChar: SELECT}) {
              totalCount
              fieldValue
              links: nodes {
                title
                url
                description
                categories
                cardId
                alphaChar
                id
                hash
                active
              }
            }
          }
        }
        allCategoriesData {
          group(field: {branch: SELECT}) {
            fieldValue
            categories: edges {
              node {
                action {
                  func
                  obj
                  val
                  filter
                }
                hash
                id
                label
                branch
              }
            }
          }
        }
        allBranch {
          nodes {
            name
            path
            seal
          }
        }
        allCategoriesData {
          group(field: {branch: SELECT}) {
            fieldValue
            nodes {
              label
              hash
              action {
                func
                obj
                val
                filter
              }
            }
          }
        }
        allLinkMenuData {
          nodes {
            key
            label
            action {
              func
              obj
              val
            }
            nodes {
              key
              label
              action {
                func
                obj
                val
                filter
              }
              nodes {
                key
                label
                action {
                  func
                  obj
                  val
                  filter
                }
              }
            }
          }
        }
      }
    `);
    const {  allBranch, allLinkMenuData, allLinksData } = data;
    const { SetSelectedFilter, GetSelectedFilter, LoadFavLinks, workspaceLinks, selectedContentPanel } = props;
    const initalState = {
        selectedFilterHash: workspaceLinks.selectedFilterHash,
        selectedTreeData: workspaceLinks.selectedTreeData,
        websiteInfoModal: false,
        dataLoaded: false,
        contentPanelSelected: 0
    };
    const [state, setState] = useState(initalState);
    useEffect(() => {
        (async () => {//fetch data
            await GetSelectedFilter();
            await LoadFavLinks(allLinksData);
            const newState = {
                selectedFilterHash: workspaceLinks.selectedFilterHash,
                selectedTreeData: workspaceLinks.selectedTreeData
            };
            setState({...state, ...newState});
        })(); 
    }, [ workspaceLinks.selectedFilterHash ]);
    
    let branchHashes = [];
    const { selectedFilterHash, selectedTreeData, websiteInfoModal } = state;
    let selectedFilterData = null;
    for(let x=0;x<allLinkMenuData.nodes.length;x++) {
        if(allLinkMenuData.nodes[x].key === ALL_MILITARY_BRANCHS_HASH) {
            allLinkMenuData.nodes[x].nodes.forEach(n => {
                branchHashes.push({
                    hash: n.key,
                    label: n.label
                });
            });
        }
        if(allLinkMenuData.nodes[x].key === selectedFilterHash) {
            selectedFilterData= allLinkMenuData[x];
            break;
        } else {
            for(let y=0;y<allLinkMenuData.nodes[x].nodes.length;y++) {
                if(allLinkMenuData.nodes[x].nodes[y].key === selectedFilterHash) {
                    selectedFilterData= allLinkMenuData.nodes[x].nodes[y];
                    break;
                } else {
                    for(let z=0;z<allLinkMenuData.nodes[x].nodes[y].nodes.length;z++) {
                        if(allLinkMenuData.nodes[x].nodes[y].nodes[z].key === selectedFilterHash) {
                            selectedFilterData= allLinkMenuData.nodes[x].nodes[y].nodes[z];
                            break;
                        }
                    }
                }
            }
        }
    }

    /*
    const toggleContentPanel = () => {
        const newState = contentPanelSelected ? 0 : 1;
        setState({...state, contentPanelSelected: newState });
    }*/
    
    const handleMenuItemToggled = (item) => {
        //console.log('handleMenuItemToggled: ', item);
    }

    const handleMenuItemSelected = (item) => {
        const data = item.key.split('/');
        SetSelectedFilter({ selectedFilterHash: data[data.length -1], selectedTreeData: item }); 
    }

    const handleShowInfo = (event) => {
        setState({...state, websiteInfoModal: event});
    }

    const handleToggleFavLink = async(event) => {
        const { ToggleFavLinks } = props;
        ToggleFavLinks(event, allLinksData);
        await LoadFavLinks(allLinksData);
    }

    const changeLinkView = (value) => {
        console.log("changeLinkView", value);
    }

    if(typeof workspaceLinks === 'undefined' || typeof workspaceLinks.linksList === 'undefined') {
        return (
            <MainLayout activePos={0} nonScroll>
                <div className="alert alert-info" role="alert">Loading Page</div>
            </MainLayout>
        );
    }
    let activeLinks = getActiveLinks(workspaceLinks.linksList, selectedTreeData);
    if(selectedTreeData?.action?.func === 'getFavLinks') {
        activeLinks = filterFavLinks(workspaceLinks.linksList)[0];
    }
    
    const viewMenu = [
        {title: "Large Card", value: "large_card"},
        {title: "Medium Card", value: "medium_card"},
        {title: "Small Card", value: "small_card"},
        {title: "Large Icons", value: "large_icons"},
        {title: "Medium Icons", value: "medium_icons"},
        {title: "Small Icons", value: "small_icons"},
        {title: "Detailed List", value: "detailed_list"},
        {title: "Basic List", value: "basic_list"}
    ];
    
    return (
        <Fragment>
            <MainLayout activePos={0} nonScroll>
                <MainLayout.Navigation>
                    <Nav className="me-auto">
                        <NavDropdown title="View">
                            {viewMenu.map((item, index) => <NavDropdown.Item key={index} onClick={() => changeLinkView(item.value)}>{item.title}</NavDropdown.Item>)}
                        </NavDropdown>
                    </Nav>
                </MainLayout.Navigation>
                <Container fluid>
                    <Row>
                        <Col md="2" className={`page-menu${selectedContentPanel===0 ? ' active' : ''}`}>
                            <TreeMenu   data={allLinkMenuData.nodes} 
                                        initialOpenNodes={selectedTreeData.openNodes} 
                                        focusKey={selectedTreeData.key} 
                                        activeKey={selectedTreeData.key} 
                                        onClickItem={handleMenuItemSelected} 
                                        onToggle={handleMenuItemToggled}
                            />
                        </Col>
                        <Col md="10" className={`body-page${selectedContentPanel===1 ? ' active' : ''}`}>
                            {selectedTreeData?.action?.func === 'getAllBranches' ? (
                                <div className="list-menu-items-grid">
                                    {allBranch.nodes.map((branch,index) => {
                                        return (
                                            <div key={index} tabIndex={index} role="button" onKeyDown={() => {}} onClick={() => handleMenuItemSelected({
                                                index: 1, 
                                                parent: ALL_MILITARY_BRANCHS_HASH, 
                                                key: `${ALL_MILITARY_BRANCHS_HASH}/${branchHashes[index].hash}`,
                                                openNodes: [ALL_MILITARY_BRANCHS_HASH],
                                                searchTerm: '',
                                                action:{
                                                    func:'getAllLinks',
                                                    obj:'links-action',
                                                    val: branchHashes[index].hash,
                                                    filter: branch.path
                                                },
                                                label: branch.name,
                                                hasNodes:true,
                                                isOpen:false
                                            })}>
                                                <img src={`/img/insignia/128/${branch.seal}`} alt={branch.name} />
                                                <span>{branch.name}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : selectedTreeData?.action?.func === 'getAllCivilian' ? (
                                <div>
                                    <div>Civilian links</div>
                                    <div>Event Data: {JSON.stringify(selectedTreeData)}</div>
                                    <br/>
                                    <div>Selected Filter: {selectedFilterHash.toString()}</div>
                                    <div>data: {JSON.stringify(selectedFilterData)}</div>
                                    <div>
                                        <div>Label: {selectedTreeData?.label}</div>
                                        <div>hash: {selectedTreeData?.key}</div>
                                        <div>action func: {selectedTreeData?.action?.func}</div>
                                        <div>action obj: {selectedTreeData?.action?.obj}</div>
                                        <div>action val: {selectedTreeData?.action?.val}</div>
                                    </div>
                                </div>
                            ) : (
                                <Fragment>
                                    {activeLinks.links.length === 0 ? (
                                        <Container>
                                            <Row className="justify-content-md-center text-center">
                                                <Col xs={8} md={8}>
                                                    <div className="alert alert-info" role="alert">
                                                        <span>no link data found</span> <i className="far fa-folder-open fa-lg"></i>
                                                        {selectedTreeData?.action?.func === 'getFavLinks' ? (
                                                            <div>
                                                                <hr/>
                                                                <p>To add a card to your favorites, hover your mouse over the card and the side menu will display. Click the empty star to add it. Removing is the same way.</p>
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Container>
                                    ):(
                                        <div className="list-menu-items-grid scroll-panel">
                                            <CardGrid cards={activeLinks.links} showInfo={handleShowInfo} toggleFav={handleToggleFavLink} classProps=""/>
                                        </div>
                                    )}
                                </Fragment>  
                            )}
                        </Col>
                    </Row>
                </Container>
            </MainLayout>
            <Fragment>
                {websiteInfoModal !== false ? (
                    <div className="dialog-wrapper">
                        <dialog className="modal" open>
                            <header className="modal-header">
                                <h1>{websiteInfoModal.title}</h1>
                                <button type="button" className="btn-close" aria-label="Close" onClick={() => handleShowInfo(false)}><i className="fas fa-times"></i></button>
                            </header>
                            <img className="banner-img" src={`/img/cards/Card-${String(websiteInfoModal.cardId).padStart(3, '0')}.png`} alt={websiteInfoModal.title} />
                            <div className="modal-body">
                                <h4>Link Description:</h4>
                                <p>{websiteInfoModal.description}</p>
                                <h4>Link URL:</h4>
                                <p>{websiteInfoModal.url}</p>
                            </div>
                            <div className="modal-footer">
                                <a rel="noreferrer" target="_blank" href={websiteInfoModal.url}>Go To Link</a>
                            </div>
                        </dialog>
                    </div>
                ) : null}
            </Fragment>
        </Fragment>
    );
}

IndexPage.propTypes = {};

const mapStateToProps = (state, props) => {
    return { workspaceLinks: state.workspaceLinks, menuExtended: state.system.side_menu, selectedContentPanel: state.system.selectedContentPanel };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    //const staticQuerys = Object.keys(ownProps.pageResources.staticQueryResults);
    //const { allLinksData } = ownProps.pageResources.staticQueryResults[staticQuerys[0]].data;
    return ({
        SetSelectedFilter: (filter) => ActionSetSelectedFilter(dispatch, filter),
        GetSelectedFilter: () => ActionGetSelectedFilter(dispatch),
        ToggleFavLinks: (hash, allLinksData) => ActionToggleFavoriteLinks(dispatch, hash, allLinksData),
        LoadFavLinks: (allLinksData) => ActionLoadFavoriteLinks(dispatch, allLinksData)
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);

/*const toggleFavLink = (id) => {
        const { toggleFavLink, branch, workspace } = this.props;
        const { linksList } = workspace;
        saveFavData(branch, linksList, id);
        toggleFavLink(branch, linksList, id);
    }*/

/*
    if(selectedFilterHash !== 'all_branches' && selectedFilterHash !== 'favorites') {
        for(let x=0;x<allCategoriesData.group.length;x++) {
            const { nodes } = allCategoriesData.group[x];
            for(let y=0;y<nodes.length;y++) {
                if(nodes[y].hash === selectedFilterHash) {
                    selectedFilterData=nodes[y];
                }
            }
        }
    } else if(selectedFilterHash === 'favorites') {
        selectedFilterData = allCategoriesData.group[0].nodes[0];
    }*/

/*
<CardGrid cards={activeLinks.links} showInfo={false} editMode={false} toggleFav={false} classProps=""/>
: selectedTreeData?.action?.func === 'getFavLinks' ? (
                            <div>
                                <div>Favorites</div>
                                <div>Event Data: {JSON.stringify(selectedTreeData)}</div>
                                <br/>
                                <div>Selected Filter: {selectedFilterHash.toString()}</div>
                                <div>data: {JSON.stringify(selectedFilterData)}</div>
                                <div>
                                    <div>Label: {selectedTreeData?.label}</div>
                                    <div>hash: {selectedTreeData?.key}</div>
                                    <div>action func: {selectedTreeData?.action?.func}</div>
                                    <div>action obj: {selectedTreeData?.action?.obj}</div>
                                    <div>action val: {selectedTreeData?.action?.val}</div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div>filter</div>
                                <div>Event Data: {JSON.stringify(selectedTreeData)}</div>
                                <br/>
                                <div>Selected Filter: {selectedFilterHash.toString()}</div>
                                <div>data: {JSON.stringify(selectedFilterData)}</div>
                                <div>
                                    <div>Label: {selectedTreeData?.label}</div>
                                    <div>hash: {selectedTreeData?.key}</div>
                                    <div>action func: {selectedTreeData?.action?.func}</div>
                                    <div>action obj: {selectedTreeData?.action?.obj}</div>
                                    <div>action val: {selectedTreeData?.action?.val}</div>
                                    <div>action filter: {selectedTreeData?.action?.filter}</div>
                                </div>
                            </div>

*/