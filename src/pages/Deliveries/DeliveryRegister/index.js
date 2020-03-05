import React from 'react';

import TopLine from '~/components/TopLine';

import {
  Container,
  FormContainer,
  FirstLine,
  LastLine,
  FirstLineInput,
} from './styles';

export default function DeliveryRegister() {
  return (
    <Container>
      <TopLine title="Cadastro de encomendas" />
      <FormContainer>
        <FirstLine>
          <FirstLineInput>
            <span>Destinatário</span>
            <input type="text" />
          </FirstLineInput>
          <FirstLineInput>
            <span>Entregador</span>
            <input type="text" />
          </FirstLineInput>
        </FirstLine>
        <LastLine>
          <span>Nome do produto</span>
          <input type="text" />
        </LastLine>
      </FormContainer>
    </Container>
  );
}
