import styled from 'styled-components';

export const CartItemContainer = styled.div`
  width: 100%;
  display: flex;
  height: 80px;
  margin-bottom: 15px;
  img {
    width: 30%;
  }
`;

export const ItemDetails = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 10px 20px;
  span {
    font-size: 16px;
  }
`;

export const RemoveButton = styled.button`
  border: none;
  background-color: red;
  cursor: pointer;
  font-weight: bold;
  color: white;
  height: 100%;
  width: 0px;
  &:hover {
    color: red;
    background-color: lightgray;
    border-radius: 5px;
    transition: all 1s ease-in-out;
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  &.show{
    padding: 10px;
    width: unset
  }
`