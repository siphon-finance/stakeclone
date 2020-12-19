import styled from 'styled-components';

export const StarSimple = styled.div`
  position: absolute;
  left: ${props => props.x}%;
  top: ${props => props.y}%;
  background: #779ec2;
  border-radius: 50%;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  z-index: -1;
`;
