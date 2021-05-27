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
        <Title>siphon.finance</Title>

        <Link href="https://docs.siphon.finance" target="_blank">
          <FAIcon type='book' />
          <LinkLabel>docs</LinkLabel>
        </Link>

        <Link href="https://medium.com/siphon-finance" target="_blank">
          <BrandIcon type='medium' />
          <LinkLabel>news</LinkLabel>
        </Link>

        <Link href="https://github.com/siphon-finance" target="_blank">
          <BrandIcon type='github' />
          <LinkLabel>source</LinkLabel>
        </Link>
      </Column>

      <Column>
        <Title>products</Title>
        <Link href="https://siphon.finance" target="_blank">
          <FAIcon type='landmark' />
          <LinkLabel>home</LinkLabel>
        </Link>

        <Link href="https://gov.siphon.finance" target="_blank">
          <FAIcon type='vote-yea' />
          <LinkLabel>vote</LinkLabel>
        </Link>

        <Link href="https://app.siphon.finance" target="_blank">
          <FAIcon type='hand-holding-usd' />
          <LinkLabel>app</LinkLabel>
        </Link>
      </Column>

      <Column>
        <Title>socials</Title>
        <Link href="https://twitter.com/siphonfinance" target="_blank">
          <BrandIcon type='twitter' />
          <LinkLabel>twitter</LinkLabel>
        </Link>
        <Link href="https://t.me/siphonfinance" target="_blank">
          <BrandIcon type='telegram' />
          <LinkLabel>telegram</LinkLabel>
        </Link>
        <Link href="https://discord.gg/" target="_blank">
          <BrandIcon type='discord' />
          <LinkLabel>discord</LinkLabel>
        </Link>
      </Column>
    </Container>
  );
}

export default Footer;
