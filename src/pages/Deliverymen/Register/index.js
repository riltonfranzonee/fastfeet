import React from 'react';
import { MdInsertPhoto } from 'react-icons/md';

import TopLine from '~/components/TopLine';

import { Container, FormContainer, ImageInput, LineInput } from './styles';

export default function DeliverymanEdit() {
  return (
    <Container>
      <TopLine title="Registro de entregadores" />
      <FormContainer>
        <ImageInput>
          <MdInsertPhoto color="#DDDDDD" size={60} />
          <span>Adicionar foto</span>
        </ImageInput>
        <LineInput>
          <span>Nome</span>
          <input type="text" />
        </LineInput>
        <LineInput>
          <span>Email</span>
          <input type="text" />
        </LineInput>
      </FormContainer>
    </Container>
  );
}
