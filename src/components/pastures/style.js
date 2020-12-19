import styled from 'styled-components';

export const PasturesContainer = styled.div`
  display: none;

  @media only screen and (min-width: 769px) {
    display: block;
  }
`;

export const PastureLeft = styled.div`
  position: absolute;
  bottom: -40rem;
  left: -30rem;
  width: 50rem;
  height: 50rem;
  border-radius: 50%;
  background-color: #78b388;
`;

export const PastureCenterBg = styled.div`
  position: absolute;
  bottom: -23rem;
  left: -25vw;
  width: 100vw;
  height: 30rem;

  border-radius: 50%;
  background-color: #5a8f69;
`;

export const PastureCenterFg = styled.div`
  position: absolute;
  bottom: -23rem;
  right: -15vw;
  width: 70vw;
  height: 30rem;

  border-radius: 50%;
  background-color: #78b388;
`;

export const PastureRight = styled.div`
  position: absolute;
  bottom: -48rem;
  right: -40rem;
  width: 60rem;
  height: 60rem;

  border-radius: 50%;
  background-color: #5a8f69;
`;

export const Sleepy = styled.img`
  position: absolute;
  bottom: 50px;
  right: 120px;

  @media (max-width: 960px) {
    display: none;
  }
`;
