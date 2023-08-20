import styled from 'styled-components/macro';

export const Container = styled.div`background-color:white`;

export const TwoColumnGrid = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  max-width: 100%;
  min-width:100%;
  margin: 50px auto auto;


  @media only screen and (min-width: ${({ theme: { breakpoints } }) =>
      breakpoints.tablet}) {
    grid-template-columns: 1fr 4fr;
    margin-top: 80px;
  }
`;

export const Side = styled.div`
  display: grid;
  justify-content: center;
  padding: 15px;
  box-sizing: border-box;

  @media only screen and (min-width: ${({ theme: { breakpoints } }) =>
      breakpoints.tablet}) {
    align-content: baseline;
  }
`;

export const Main = styled.main``;

export const MainHeader = styled.main`
  
  grid-template-columns: 1fr 1fr;

font-size:0.8rem;
font-weight:bold;
padding-left:2%;
margin-top:-4%;
margin-bottom:2%;
  width:100%;
`;
