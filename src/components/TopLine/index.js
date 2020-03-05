import React from 'react';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import { Container, ButtonsWrapper } from './styles';

import history from '~/services/history';

export default function TopLine({ title, saveFunction }) {
  return (
    <Container>
      <h1>{title}</h1>
      <ButtonsWrapper>
        <button type="button" onClick={() => history.goBack()}>
          <MdKeyboardArrowLeft size={22} color="#ffffff" />
          <span>VOLTAR</span>
        </button>
        <button type="submit" onClick={() => saveFunction()}>
          <MdCheck size={22} color="#ffffff" />
          <span>SALVAR</span>
        </button>
      </ButtonsWrapper>
    </Container>
  );
}
