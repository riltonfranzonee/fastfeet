import React from 'react';
import PropTypes from 'prop-types';
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

export default function RecipientEdit({ location }) {
  const { recipient } = location.state;

  return (
    <Container>
      <TopLine title="Edição de destinatários" />
      <FormContainer>
        <LineInput>
          <span>Nome</span>
          <input type="text" defaultValue={recipient.name} />
        </LineInput>
        <SecondLine>
          <LargeInput>
            <span>Rua</span>
            <input type="text" defaultValue={recipient.street} />
          </LargeInput>
          <SmallInput>
            <span>Número</span>
            <input type="text" defaultValue={recipient.number} />
          </SmallInput>
          <SmallInput>
            <span>Complemento</span>
            <input type="text" defaultValue={recipient.complement} />
          </SmallInput>
        </SecondLine>
        <LastLine>
          <MediumInput>
            <span>Cidade</span>
            <input type="text" defaultValue={recipient.city} />
          </MediumInput>
          <MediumInput>
            <span>Estado</span>
            <input type="text" defaultValue={recipient.state} />
          </MediumInput>
          <MediumInput>
            <span>CEP</span>
            <input type="text" defaultValue={recipient.zip} />
          </MediumInput>
        </LastLine>
      </FormContainer>
    </Container>
  );
}

RecipientEdit.propTypes = {
  location: PropTypes.object.isRequired,
};
