import React  from 'react';
import {
  Container,
  Column,
  Title,
  Link
} from './style';

function Footer() {
  return (
    <Container>
      <Column>
        <Title>Beefy</Title>
        <Link href="https://beefy.finance">
        <>website
          </>
        </Link>
      </Column>

      <Column>
        <Title>Socials</Title>
        <Link href=""></Link>
      </Column>
      
      <Column>
        <Title>Socials</Title>
        <Link href=""></Link>
      </Column>
    </Container>
  );
}

export default Footer;
