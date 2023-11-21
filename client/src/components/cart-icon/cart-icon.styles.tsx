import styled from 'styled-components';

export const CartIconContainer = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  svg{
    width: 24px;
    height: 24px;
    fill: white;
    color: white;
  }
`

export const ItemCount = styled.span`
  color: white;
  position: absolute;
  font-size: 10px;
  bottom: 11px;
`