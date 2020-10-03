import React  from 'react';
import {
  Container,
  Column,
  Title,
  Link,
  LinkIcon,
  BrandIcon,
  LinkLabel,
} from './style';

const Footer = () => {
  return (
    <Container>
      <Column>
        <Title>beefy.finance</Title>

        <Link href="https://beefy.finance">
          <LinkIcon type='globe' />
          <LinkLabel>website</LinkLabel>
        </Link>

        <Link href="https://medium.com/beefyfinance">
          <BrandIcon type='medium' />
          <LinkLabel>news</LinkLabel>
        </Link>

        <Link href="https://github.com/beefyfinance">
          <BrandIcon type='github' />
          <LinkLabel>github</LinkLabel>
        </Link>
      </Column>

      <Column>
        <Title>products</Title>
        <Link href="https://gov.beefy.finance">
          <LinkIcon type='landmark' />
          <LinkLabel>gov</LinkLabel>
        </Link>

        <Link href="https://vote.beefy.finance">
          <LinkIcon type='vote-yea' />
          <LinkLabel>vote</LinkLabel>
        </Link>

        <Link href="https://app.beefy.finance">
          <LinkIcon type='hand-holding-usd' />
          <LinkLabel>app</LinkLabel>
        </Link>
      </Column>

      <Column>
        <Title>socials</Title>
        <Link href="https://twitter.com/beefyfinance">
          <BrandIcon type='twitter' />
          <LinkLabel>twitter.com/beefyfinance</LinkLabel>
        </Link>
        <Link href="https://t.me/beefyfinance">
          <BrandIcon type='telegram' />
          <LinkLabel>t.me/beefyfinance</LinkLabel>
        </Link>
        <Link href="https://discord.gg/9xfMvJY">
          <BrandIcon type='discord' />
          <LinkLabel>discord.gg/9xfMvJY</LinkLabel>
        </Link>
      </Column>
    </Container>
  );
}

export default Footer;
