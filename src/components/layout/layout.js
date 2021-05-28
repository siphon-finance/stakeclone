import React from 'react';

import Header from '../header';
import Footer from '../footer';
import Pastures from '../pastures';
import { Container } from './style';
import Sky from '../sky';

const Layout = ({ children }) => (
  <Container>
    <Header />
    {children}
    <Footer />
    <Sky />
    {/* <Pastures /> */}
  </Container>
);

export default Layout;
