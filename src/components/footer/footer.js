import React  from 'react';
import {
  Container,
  Column,
  Title,
  Link,
  FAIcon,
  BrandIcon,
  LinkLabel,
} from './style';

const Footer = () => {
  return (
    <Container>
      <Column>
        <Title>beefy.finance</Title>

        <Link href="https://beefy.finance">
          <FAIcon type='globe' />
          <LinkLabel>website</LinkLabel>
        </Link>

        <Link href="https://medium.com/beefyfinance">
          <BrandIcon type='medium' />
          <LinkLabel>news</LinkLabel>
        </Link>

        <Link href="https://github.com/beefyfinance">
          <BrandIcon type='github' />
          <LinkLabel>source</LinkLabel>
        </Link>
      </Column>

      <Column>
        <Title>products</Title>
        <Link href="https://gov.beefy.finance">
          <FAIcon type='landmark' />
          <LinkLabel>gov</LinkLabel>
        </Link>

        <Link href="https://vote.beefy.finance">
          <FAIcon type='vote-yea' />
          <LinkLabel>vote</LinkLabel>
        </Link>

        <Link href="https://app.beefy.finance">
          <FAIcon type='hand-holding-usd' />
          <LinkLabel>app</LinkLabel>
        </Link>
      </Column>

      <Column>
        <Title>socials</Title>
        <Link href="https://twitter.com/beefyfinance">
          <BrandIcon type='twitter' />
          <LinkLabel>twitter</LinkLabel>
        </Link>
        <Link href="https://t.me/beefyfinance">
          <BrandIcon type='telegram' />
          <LinkLabel>telegram</LinkLabel>
        </Link>
        <Link href="https://discord.gg/9xfMvJY">
          <BrandIcon type='discord' />
          <LinkLabel>discord</LinkLabel>
        </Link>
      </Column>
    </Container>
  );
}

export default Footer;
