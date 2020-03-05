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
  height: 300px;
  background-color: #ffffff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  input {
    height: 45px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    padding: 0 15px;
    font-size: 16px;
    color: #444444;

    ::placeholder {
      color: #999999;
    }
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
  padding: 20px 30px;
`;

export const SecondLine = styled.div`
  display: flex;
  padding: 0 30px;
  justify-content: space-between;
`;

export const LargeInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`;

export const SmallInput = styled.div`
  width: 15%;
  display: flex;
  flex-direction: column;
`;

export const LastLine = styled.div`
  display: flex;
  padding: 20px 30px;
  justify-content: space-between;
`;

export const MediumInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
`;
