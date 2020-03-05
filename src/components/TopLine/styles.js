import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonsWrapper = styled.div`
  display: flex;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    width: 112px;
    height: 36px;
    background-color: #cccccc;
    border-radius: 4px;

    &:last-of-type {
      background-color: #7d40e7;
      margin-left: 20px;
    }
  }

  span {
    color: #ffffff;
    font-weight: bold;
    margin-left: 2px;
  }
`;
