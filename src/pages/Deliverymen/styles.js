import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div``;

export const TableWrapper = styled.div`
  height: 550px;
`;

export const Table = styled.div`
  tr {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;

    &:not(:first-child) {
      background-color: #ffffff;
      color: #666666;
      height: 57px;
      border-radius: 4px;
      margin-bottom: 20px;
    }

    th {
      margin: 30px 0;
    }
  }
`;

export const ActionsWrapper = styled.div`
  margin-right: 10px;
  button {
    border: none;
  }
`;

export const ActionsMenu = styled.ul`
  position: absolute;
  width: 130px;
  left: calc(50% + 488px);
  margin-top: 10px;
  background: #ffffff;
  border-radius: 4px;
  padding: 15px 5px;
  display: ${props => (props.showActionsMenu ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 0px 2px #00000026;
  z-index: 100;

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 10px);
    top: -10px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #00000026;
  }

  li {
    display: flex;
    align-items: center;
    padding: 10px 0 10px 5px;
    border-bottom: 1px solid #f5f5f5;

    &:first-of-type {
      padding-top: 0px;
    }

    &:last-of-type {
      padding-bottom: 0px;
      border-bottom: none;
    }

    span {
      font-size: 16px;
      margin-left: 10px;
      color: #999999;
      transition: color 0.2s;
      cursor: pointer;

      &:hover {
        color: ${darken(0.2, '#999999')};
      }
    }
  }
`;

export const PageNav = styled.div`
  align-self: center;
  display: flex;
  align-items: center;

  span {
    font-size: 20px;
    padding: 0 15px;
  }
`;

export const NameTd = styled.td`
  width: 150px;
  margin-left: 130px;
`;

export const EmailTd = styled.td`
  width: 200px;
  margin-left: 40px;
`;

export const AvatarTd = styled.td`
  margin-top: 5px;
  margin-left: 140px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;
