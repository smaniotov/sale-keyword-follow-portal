import { Layout } from 'antd';
import React, { FC } from 'react';
import styled from 'styled-components';
import Navbar from '../Navbar';

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: auto;

  .ant-layout-header {
    background: none;
  }
`;

const { Content, Header } = Layout;

interface PageProps {
  children: any;
}

const Page: FC<PageProps> = ({ children }) => (
  <StyledPage>
    <Layout>
      <Header className="mb-5 p-0">
        <Navbar />
      </Header>
      <Content>{children}</Content>
    </Layout>
  </StyledPage>
);

export default Page;
