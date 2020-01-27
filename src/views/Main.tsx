import { useMutation, useQuery } from '@apollo/react-hooks';
import { Empty, message, Spin } from 'antd';
import { ApolloError, ExecutionResult } from 'apollo-boost';
import get from 'lodash/get';
import React, { useState } from 'react';
import Col from 'reactstrap/lib/Col';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import AlertCard from '../components/AlertCard';
import CreateAlertCard from '../components/CreateAlertCard';
import Page from '../components/Page';
import { useUpdateEffect } from '../hooks';
import { IAlert } from '../models/Alert';
import {
  CREATE_ALERT, DELETE_ALERT, GET_ALERTS_PAGE, UPDATE_ALERT,
} from '../queries';

interface IContextWrapper {
  alerts: IAlert[];
  error: ApolloError;
  loading: boolean;
  mutationLoading: boolean;
  updateAlert: (options: { variables: any; }) => Promise<ExecutionResult<any>>;
  deleteAlert: (options: { variables: any; }) => Promise<ExecutionResult<any>>;
}

const getContent = ({
  loading, alerts, updateAlert, deleteAlert,
}: IContextWrapper) => {
  if (alerts.length === 0) {
    return <Empty description="There is no alerts yet!" />;
  }

  return (
    <Spin spinning={loading}>
      <Row>
        {alerts.map((alert: IAlert) => (
          <Col className="mb-3" xs={12} md={6} lg={4} xl={3} key={alert._id}>
            <AlertCard
              alert={alert}
              onDelete={(alertEntity) => deleteAlert({ variables: { id: alertEntity._id } })}
              onUpdate={(values, alertEntity) => (
                updateAlert({ variables: { id: alertEntity._id, alert: values } })
              )}
            />
          </Col>
        ))}
      </Row>
    </Spin>
  );
};

export default () => {
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState('');
  const {
    loading: isLoadingAlerts, refetch, data: queryData, error: queryError,
  } = useQuery(GET_ALERTS_PAGE);
  const [
    createAlert, { data: creatingData, error: creatingError, loading: createLoading },
  ] = useMutation(CREATE_ALERT);
  const [
    updateAlert, { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_ALERT);
  const [
    deleteAlert, { data: deleteData, error: deleteError, loading: deleteLoading },
  ] = useMutation(DELETE_ALERT);

  useUpdateEffect(() => setPage(0), [keyword]);
  useUpdateEffect(() => refetch({ keyword, page }), [keyword, page]);

  const errorsDeps = [creatingError, updateError, deleteError, queryError];
  useUpdateEffect(() => {
    const currentError = errorsDeps
      .filter((item) => Boolean(get(item, 'message')))[0];
    if (currentError) {
      message.error(currentError.message);
    }
  }, errorsDeps);

  useUpdateEffect(refetch, [creatingData, updateData, deleteData]);

  const alerts = get<IAlert[]>(queryData, 'getAlertsPage.data', []);

  return (
    <Page>
      <Container className="h-100">
        <Row className="justify-content-center">
          <Col xs={12} lg={8}>
            <Spin spinning={createLoading}>
              <CreateAlertCard
                onSearch={setKeyword}
                onCreate={(alert) => createAlert({ variables: { alert } })}
              />
            </Spin>
          </Col>
        </Row>
        <div className="mt-5">
          {getContent({
            alerts,
            loading: isLoadingAlerts,
            mutationLoading: deleteLoading || updateLoading,
            error: queryError,
            deleteAlert,
            updateAlert,
          })}
        </div>
      </Container>
    </Page>
  );
};
