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
  height: 250px;
  background-color: #ffffff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;

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

export const FirstLine = styled.div`
  width: 100%;
  display: flex;
  padding: 25px 30px;
  justify-content: space-between;
  input {
    width: 405px;
  }
`;

export const FirstLineInput = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LastLine = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 30px 25px 30px;
`;
