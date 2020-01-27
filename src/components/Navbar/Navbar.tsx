import React from 'react';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import styled from 'styled-components';

const logo = require('../../assets/images/logo.png');

const StyledNavbar = styled.div`
  width: 100%;
  background-color: #fafafa;
  box-shadow: 0 0 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  padding: 15px;
`;

const StyledLogo = styled.div`
  img {
    max-height: 2.5rem;
  }
`;

export default () => (
  <StyledNavbar>
    <Row className="justify-content-center">
      <StyledLogo>
        <Col span={3} className="pl-2">
          <img src={logo} alt="Logo" />
        </Col>
      </StyledLogo>
    </Row>
  </StyledNavbar>
);
