import styled from 'styled-components';

import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #7d40e7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 360px;
  height: 425px;
  background-color: #ffffff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  img {
    width: 258px;
    height: 60px;
    align-self: center;
    margin-bottom: 5px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 30px;

    strong {
      color: #444444;
      align-self: flex-start;
      margin: 0 0 10px 32px;

      &:last-of-type {
        margin-top: 5px;
      }
    }

    span {
      align-self: flex-start;
      color: #de3b3b;
      margin: 0 0 20px 32px;
    }

    input {
      border: 1px solid #dddddd;
      border-radius: 4px;
      width: 300px;
      height: 45px;
      padding: 0 15px;
      margin: 0 0 10px;
      font-size: 16px;
      color: ${darken(0.35, '#999999')};

      &::placeholder {
        color: #999999;
      }
    }

    button {
      margin: 5px 0 0;
      width: 300px;
      height: 44px;
      background: #7d40e7;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#7D40E7')};
      }
    }
  }
`;
