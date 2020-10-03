import React  from 'react';
import styled from 'styled-components';

const Container = styled.section`
  width: 100%;
  background-color: #f0f;
  
  display: flex;
  flex-direction: column;
`;

const Column = styled.div`
  
`;

const Title = styled.div`
  
`;

const Link = styled.a`
  
`;

const LinkIcon = (p) => {
  return (<i class={`fas fa-${p.type}`}></i>);
}

const BrandIcon = (p) => {
  return (<i class={`fab fa-${p.type}`}></i>);
}

const LinkLabel = styled.span`

`;

export {
  Container,
  Column,
  Title,
  Link,
  LinkIcon,
  BrandIcon,
  LinkLabel,
};
