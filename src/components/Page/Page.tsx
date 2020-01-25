import React, { FC } from 'react';
import { Layout } from 'antd';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
`;

const { Content } = Layout;

interface PageProps {
  path: string;
  exact?: boolean;
  children: any;
}

const Page: FC<PageProps> = ({ children, path, exact = false }) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={() => (
        <StyledPage>
          <Layout>
            <Content>{children}</Content>
          </Layout>
        </StyledPage>
      )}
    />
  );
};

export default Page;
