import styled from 'styled-components';
import { darken } from 'polished';

export const ActionsMenu = styled.ul`
  position: absolute;
  width: 200px;
  left: calc(50% + 448px);
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

export const ModalTitle = styled.strong`
  align-self: flex-start;
  margin-top: -270px;
  text-transform: uppercase;
  color: #444444;
`;

export const ModalDescription = styled.span`
  align-self: flex-start;
  margin-top: 20px;
`;

export const ProblemTd = styled.td`
  width: 200px;
  margin-left: 150px;
`;

export const IdTd = styled.td`
  width: 60px;
`;
