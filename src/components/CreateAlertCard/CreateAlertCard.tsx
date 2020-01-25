import React from 'react';
import { Card, Input } from 'antd';
import styled from 'styled-components';

const StyledCard = styled.div`
  & > div {
    border-radius: 5px;

    .ant-card-body {
      padding: 10px;
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

export default () => {
  return (
    <StyledCard>
      <Card>
        <Input />
      </Card>
    </StyledCard>
  );
};
