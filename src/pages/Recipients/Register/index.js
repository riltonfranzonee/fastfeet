import React from 'react';
import TopLine from '~/components/TopLine';

import {
  Container,
  FormContainer,
  LineInput,
  SecondLine,
  LargeInput,
  SmallInput,
  LastLine,
  MediumInput,
} from './styles';

export default function RecipientRegister() {
  return (
    <Container>
      <TopLine title="Cadastro de destinatários" />
      <FormContainer>
        <LineInput>
          <span>Nome</span>
          <input type="text" placeholder="Paulo Pereira" />
        </LineInput>
        <SecondLine>
          <LargeInput>
            <span>Rua</span>
            <input type="text" placeholder="Rua Americana" />
          </LargeInput>
          <SmallInput>
            <span>Número</span>
            <input type="text" placeholder="1872" />
          </SmallInput>
          <SmallInput>
            <span>Complemento</span>
            <input type="text" placeholder="Casa Amarela" />
          </SmallInput>
        </SecondLine>
        <LastLine>
          <MediumInput>
            <span>Cidade</span>
            <input type="text" placeholder="Volta Redonda" />
          </MediumInput>
          <MediumInput>
            <span>Estado</span>
            <input type="text" placeholder="RJ" />
          </MediumInput>
          <MediumInput>
            <span>CEP</span>
            <input type="text" placeholder="09960-580" />
          </MediumInput>
        </LastLine>
      </FormContainer>
    </Container>
  );
}
