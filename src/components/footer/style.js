import React from 'react';
import styled from 'styled-components';

const Container = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  max-width: 40rem;
  margin: 2rem auto;
  @media only screen and (min-width: 769px) {
    margin: 2rem auto 8rem;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-weight: 900;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

const Link = styled.a`
  margin: 0.5rem 0;
  font-weight: 400;
  font-size: 1.1rem;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const LinkIcon = styled.i`
  margin-right: 0.5rem;
  min-width: 24px;
`;

const FAIcon = p => {
  return <LinkIcon className={`fas fa-${p.type}`}></LinkIcon>;
};

const BrandIcon = p => {
  return <LinkIcon className={`fab fa-${p.type}`}></LinkIcon>;
};

const LinkLabel = styled.span``;

export { Container, Column, Title, Link, FAIcon, BrandIcon, LinkLabel };
