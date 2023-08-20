import styled from 'styled-components/macro';

export const BuyButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  padding: 6px 0;
  margin-top: 10px;
  cursor: pointer;
  width: 50%;
  border: 0;
  border-radius:1rem;

  transition: background-color 0.2s;

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.secondary};
  }
`;

interface IImage {
  alt: string;
}
export const Image = styled.div<IImage>``;

interface IContainer {
  sku: number | string;
}
export const Container = styled.div<IContainer>`
  position: relative;
  text-align: center;
  box-sizing: border-box;
  padding: 10px;
  margin-bottom: 30px;
  cursor: default;
  outline: none;

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.secondary};
  }

  ${Image} {
    width: 100%;
    height: 5rem;
    position: relative;
    background-image: ${({ sku }) =>
      `url(${sku})`};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    ::before {
      content: '';
      display: block;
      position: absolute;
      background: #eee;
      width: 100%;
      height: 100%;
      z-index: -1;
    }

    @media only screen and (min-width: ${({ theme: { breakpoints } }) =>
        breakpoints.tablet}) {
      height: 320px;
    }
  }

  &:hover {
   

    ${BuyButton} {
      background-color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

export const Stopper = styled.div`
  position: absolute;
  color: #ececec;
  top: 10px;
  right: 10px;
  padding: 5px;
  font-size: 0.6em;
  background-color: ${({ theme }) => theme.colors.primary};
  cursor: default;
  z-index: 1;
`;

export const Title = styled.p`
  position: relative;
  
  margin-left:1rem;

  height:1.5rem;
  font-size:0.8rem;
  font-weight:500;
  font-family:


`;

export const Price = styled.div`
  height: 60px;

  .val {
    b {
     
      margin-left: 5px;
    }
  }
`;

export const Val = styled.p`
  margin: 0;
  b {
    
    margin-left: 5px;
  }
`;

export const Installment = styled.p`
  margin: 0;
  color: #9c9b9b;
`;
export const ChangeQuantity = styled.button`
  color: #b7b7b7;
  border: 0;
  background-color: #000;
  width: 25px;
  height: 25px;

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.secondary};
  }

  &:disabled {
    opacity: 0.2;
  }
`;

