import React from "react";
import { connect } from "react-redux";
import { useStaticQuery, graphql } from "gatsby";
import { Container, Row, Col } from 'react-bootstrap';
import MainLayout from "../components/layout/MainLayout";

const ShopPage = () => {
   const { allShopLink } = useStaticQuery(graphql `
        query ShopQuery {
            allShopLink {
                shops: nodes {
                    nameShort
                    name
                    link
                    img
                    id
                    hash
                }
            }
        }
    `);
    const { shops } = allShopLink;

    return (
        <MainLayout activePos={5} nonScroll>
            <Container fluid>
                <Row>
                    <Col md="12" className={`body-page active`}>
                        <Row>
                            {shops.map((shop,index) => {
                                const { name, nameShort, img, link } = shop;
                                return (
                                    <Col key={index} className="appIcon" xs={3} md={1} lg={1}>
                                        <a className="" rel="noreferrer" target="_blank" href={link}>
                                            <img src={`/img/shops/${img}`} alt={name} />
                                            <span>{nameShort}</span>
                                        </a>
                                    </Col>
                                );
                            })}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </MainLayout>
    );
}


ShopPage.propTypes = {};

const mapStateToProps = (state, props) => {
    return { selectedContentPanel: state.system.selectedContentPanel };
};

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);