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
  }

  span {
    font-weight: bold;
    color: #444444;
    margin-bottom: 10px;
  }
`;

export const ImageInput = styled.div`
  margin: 20px;
  align-self: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px dashed #dddddd;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    color: #dddddd;
    font-weight: bold;
  }

  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

export const LineInput = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 30px 25px 30px;
`;
