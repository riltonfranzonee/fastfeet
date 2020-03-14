import styled from 'styled-components';
import { darken } from 'polished';
import { MdSearch } from 'react-icons/md';

const handleStatusBgColor = status => {
  switch (status) {
    case 'retirado':
      return '#BAD2FF';
    case 'cancelado':
      return '#FAB0B0';
    case 'entregue':
      return '#DFF0DF';
    case 'pendente':
      return '#F0F0DF';
    default:
      return null;
  }
};

const handleColor = status => {
  switch (status) {
    case 'retirado':
      return '#4D85EE';
    case 'cancelado':
      return '#DE3B3B';
    case 'entregue':
      return '#2CA42B';
    case 'pendente':
      return '#C1BC35';
    default:
      return null;
  }
};

export const Container = styled.div`
  width: 1200px;
  margin-top: 40px;
  align-self: center;
  display: flex;
  flex-direction: column;
`;

export const SearchRow = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  form {
    background-color: #ffffff;
    width: 237px;
    height: 36px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    input {
      border: none;
      width: 160px;
      color: ${darken(0.4, '#999999')};

      &::placeholder {
        color: #999999;
      }
    }
  }
`;

export const SearchIcon = styled(MdSearch)`
  margin: 0 5px 0 15px;
`;

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

export const IdTd = styled.td`
  width: 50px;
`;
export const RecipientTd = styled.td`
  width: 140px;
`;
export const CityTd = styled.td`
  width: 100px;
`;
export const StateTd = styled.td`
  width: 50px;
`;

export const StatusTd = styled.td`
  background-color: ${props => handleStatusBgColor(props.status)};

  color: ${props => handleColor(props.status)};

  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
  width: 115px;
  height: 25px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    height: 12px;
    width: 12px;
    background-color: ${props => handleColor(props.status)};
    border-radius: 50%;
    display: inline-block;
    margin-right: 4px;
  }
`;

export const DeliverymanTd = styled.td`
  width: 150px;
  display: flex;
  align-items: center;
  img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    border-radius: 50%;
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

export const ActionsWrapper = styled.div`
  width: 30px;
  button {
    border: none;
  }
`;

export const ActionsMenu = styled.ul`
  position: absolute;
  width: 130px;
  left: calc(50% + 482px);
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

export const Wrapper = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const DeliverInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  height: 100px;
  justify-content: space-around;

  strong {
    color: #444444;
    margin-top: -5px;
  }

  span {
    color: #666666;
    font-size: 16px;
    margin-top: 10px;

    &:last-of-type {
      margin-bottom: 10px;
    }
  }
`;
export const DateInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 5px;
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
  strong {
    color: #444444;
    margin-bottom: 5px;
  }

  span {
    color: #666666;
    font-size: 16px;
  }
`;
export const TakeDate = styled.div`
  margin-top: 5px;
  span {
    &:first-of-type {
      font-weight: bold;
      margin-bottom: 5px;
    }
  }
`;
export const DeliverDate = styled.div`
  margin-top: 10px;

  span {
    &:first-of-type {
      font-weight: bold;
    }
  }
`;
export const Signature = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 5px 0 5px;

  strong {
    color: #444444;
  }
  img {
    margin-top: 20px;
    align-self: center;
    width: 234px;
    height: 60px;
  }

  span {
    color: #666666;
    font-size: 16px;
    margin-top: 30px;
    align-self: center;
  }
`;

export const IdTh = styled.th``;
export const RecipientTh = styled.th`
  width: 140px;
`;
export const CityTh = styled.th`
  width: 100px;
`;
export const StateTh = styled.th`
  width: 50px;
`;
export const DeliverymanTh = styled.th`
  width: 150px;
`;
export const StatusTh = styled.th`
  width: 115px;
`;
export const ActionsTh = styled.th``;
