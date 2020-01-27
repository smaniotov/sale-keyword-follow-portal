import {
  Card, Descriptions, Icon, Popconfirm, message,
} from 'antd';
import Title from 'antd/lib/typography/Title';
import format from 'date-fns/format';
import React, { FC } from 'react';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import { IAlert } from '../../models/Alert';

interface AlertCardProps {
  alert?: IAlert;
  onDelete: (alert: IAlert) => Promise<any>;
  onUpdate: (values: any, alert: IAlert) => void;
}

const AlertCard: FC<AlertCardProps> = ({ alert, onDelete }) => (
  <Card actions={[
    <Popconfirm
      title="Are you sure?"
      okText="I'm sure"
      cancelText="No"
      onConfirm={async () => {
        await onDelete(alert);
        message.success('Alert has been removed successfully!');
      }}
    >
      <Icon type="delete" key="delete" />
    </Popconfirm>,
  ]}
  >
    <div>
      <Row>
        <Col>
          <Title level={4}>
            {alert.keyword}
          </Title>
        </Col>
      </Row>
      <div>
        <Descriptions column={1} layout="vertical">
          <Descriptions.Item label="Delay">
            {`${alert.delay} Minutes`}
          </Descriptions.Item>
          <Descriptions.Item label="Email for send to">
            {alert.sendTo}
          </Descriptions.Item>
          <Descriptions.Item label="Next message">
            {format(new Date(alert.nextMessage), 'dd/MM/yyyy KK:mm:ss')}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  </Card>
);

export default AlertCard;
