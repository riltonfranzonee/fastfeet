import styled from 'styled-components';

export const Container = styled.div`
  width: 900px;
  margin-top: 40px;
  align-self: center;
  display: flex;
  flex-direction: column;
`;

export const FormContainer = styled.div`
  margin-top: 30px;
  width: 100%;
  height: 401px;
  background-color: #ffffff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  input {
    height: 45px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    padding: 0 15px;
    color: #444444;
    font-size: 15.5px;
  }

  span {
    font-weight: bold;
    color: #444444;
    margin-bottom: 10px;
  }
`;

export const LineInput = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 30px 25px 30px;
`;

export const AvatarInput = styled.div`
  align-self: center;
  margin-top: 20px;
  margin-bottom: 30px;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    img {
      height: 150px;
      width: 150px;
      border-radius: 50%;
      border: 1px dashed #dddddd;
      background: #eee;
    }

    input {
      display: none;
    }
  }
`;
