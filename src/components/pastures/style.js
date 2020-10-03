import styled from 'styled-components';

const Pastures = styled.div`
  position: fixed;
  display: none;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: -1;

  @media only screen and (min-width: 769px) {
    & { display: block; }
  }
`;

const PastureLeft = styled.div`
  position: absolute;
  bottom: -40rem;
  left: -30rem;
  width: 50rem;
  height: 50rem;
  
  border-radius: 50%;
  background-color: #78B388;
`;

const PastureCenterBg = styled.div`
  position: absolute;
  bottom: -23rem;
  left: -25vw;
  width: 100vw;
  height: 30rem;
  
  border-radius: 50%;
  background-color: #5A8F69;
`;

const PastureCenterFg = styled.div`
  position: absolute;
  bottom: -23rem;
  right: -15vw;
  width: 70vw;
  height: 30rem;
  
  border-radius: 50%;
  background-color: #78B388;
`;

const PastureRight = styled.div`
  position: absolute;
  bottom: -48rem;
  right: -40rem;
  width: 60rem;
  height: 60rem;
  
  border-radius: 50%;
  background-color: #5A8F69;
`;

export {
  Pastures,
  PastureLeft,
  PastureCenterBg,
  PastureCenterFg,
  PastureRight,
};
