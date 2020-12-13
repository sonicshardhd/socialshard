import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { Layout } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation'
import BreadcrumbComponent from './components/BreadcrumbComponent/BreadcrumbComponent'
import MainContent from './components/MainContent/MainContent'

const { Content, Footer } = Layout;

const App = props => {

  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Navigation />
        <Layout className="site-layout">
          <Content style={{ margin: '0 16px' }}>
            <BreadcrumbComponent />
            <MainContent />
          </Content>
          <Footer style={{ textAlign: 'center' }}>Violet Select (c)</Footer>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
