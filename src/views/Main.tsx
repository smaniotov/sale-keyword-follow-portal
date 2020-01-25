import React from 'react';
import Row from 'reactstrap/lib/Row';
import Container from 'reactstrap/lib/Container';
import CreateAlertCard from '../components/CreateAlertCard';
import Page from '../components/Page';

export default () => {
  return (
    <Page path="/">
      <Container className="h-100">
        <Row className="align-items-center justify-content-center h-100">
          <CreateAlertCard />
        </Row>
      </Container>
    </Page>
  );
};
