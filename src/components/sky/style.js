import styled from 'styled-components';

export const GoldenCandy = styled.img`
  position: absolute;
  top: 20%;
  left: 10%;
  width: 35px;
  height: 35px;
  z-index: -1;
`;

export const GoldenBoot = styled.img`
  position: absolute;
  top: 50%;
  right: 10%;
  width: 35px;
  height: 35px;
  z-index: -1;
`;

export const GoldenCookie = styled.img`
  position: absolute;
  top: 70%;
  left: 35%;
  width: 35px;
  height: 35px;
  z-index: -1;
`;

export const Santa = styled.img`
  position: absolute;
  top: 120px;
  right: 50px;
  z-index: -1;
  @media (max-width: 960px) {
    display: none;
  }
`;

export const Cow1 = styled.img`
  position: absolute;
  top: 110px;
  right: 190px;
  width: 75px;
  transform: rotate(10deg);
  z-index: -1;
  @media (max-width: 960px) {
    display: none;
  }
`;

export const Cow2 = styled.img`
  position: absolute;
  top: 140px;
  right: 210px;
  width: 75px;
  z-index: -1;
  @media (max-width: 960px) {
    display: none;
  }
`;
