import {
  Button, Card, Input as AntdInput, Divider, Icon, Tooltip, message,
} from 'antd';
import { Input, Select, FormItem } from 'formik-antd';
import { Formik, FormikHelpers } from 'formik';
import React, { useState, FC } from 'react';
import styled from 'styled-components';
import Form from 'reactstrap/lib/Form';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';

import * as Yup from 'yup';

interface CreateAlertCardProps {
  onCreate: (values: any, formit: FormikHelpers<any>) => Promise<any>;
  onSearch: (search: string) => void;
}

const InputGroup = AntdInput.Group;
const { Option } = Select;

const StyledCard = styled.div`
  width: 100%;

  .ant-card-body {
    padding: 10px;
  }

  .search-group {
    &, input, .ant-input-suffix {
      font-size: 20px;
    }
  }

  input,
  input:active,
  input:focus {
    border: none;
    outline: none;
    box-shadow: none;
  }
`;

const CreateAlertCard: FC<CreateAlertCardProps> = ({ onCreate, onSearch }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <StyledCard>
      <Card>
        <Formik
          initialValues={{}}
          validationSchema={Yup.object({
            keyword: Yup.string()
              .max(100, 'Too long')
              .required(),
            sendTo: Yup.string()
              .email('Invalid email address')
              .required(),
            delay: Yup.number()
              .required(),
          })}
          onSubmit={async (values, formik) => {
            await onCreate(values, formik);
            setOpen(false);
            formik.resetForm();
            message.success('Alert has been created successfully!');
          }}
        >
          {({ handleSubmit, resetForm }) => (
            <Form className="m-0">
              {
                isOpen
                  ? (
                    <div>
                      <InputGroup size="large" className="mb-2">
                        <Row noGutters>
                          <Col xs={12} lg={6}>
                            <FormItem name="keyword">
                              <Input name="keyword" placeholder="Search by keyword" />
                            </FormItem>
                          </Col>
                        </Row>
                      </InputGroup>
                      <InputGroup className="mb-2">
                        <Row>
                          <Col xs={12} lg={6}>
                            <FormItem name="sendTo">
                              <Input name="sendTo" placeholder="Send to email" />
                            </FormItem>
                          </Col>
                        </Row>
                      </InputGroup>
                      <InputGroup>
                        <Row>
                          <Col xs={12} lg={6}>
                            <FormItem name="delay">
                              <Select placeholder="Delay between alerts (in minutes)" name="delay" className="pl-2 w-100">
                                <Option value={2}>2 minutes</Option>
                                <Option value={10}>10 minutes</Option>
                                <Option value={30}>30 minutes</Option>
                              </Select>
                            </FormItem>
                          </Col>
                        </Row>
                      </InputGroup>
                      <Divider />
                      <div className="row d-flex no-gutters justify-content-between">
                        <div>
                          <Button
                            onClick={() => {
                              setOpen(false);
                              resetForm();
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                        <div>
                          <Button onClick={() => handleSubmit()} type="primary">
                            Create
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                  : (
                    <InputGroup>
                      <Row className="justify-content-between align-items-center search-group">
                        <Col xs={10} lg={11}>
                          <AntdInput.Search
                            onChange={(e) => onSearch(e.target.value)}
                            name="search"
                            placeholder="Search"
                            allowClear
                          />
                        </Col>
                        <Col xs={2} lg={1}>
                          <Tooltip title="Add a brand new alert">
                            <Icon type="plus" onClick={() => setOpen(true)} />
                          </Tooltip>
                        </Col>
                      </Row>
                    </InputGroup>
                  )
              }
            </Form>
          )}
        </Formik>

      </Card>
    </StyledCard>
  );
};

export default CreateAlertCard;
