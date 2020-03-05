import React from 'react';
import PropTypes from 'prop-types';

import TopLine from '~/components/TopLine';

import {
  Container,
  FormContainer,
  FirstLine,
  LastLine,
  FirstLineInput,
} from './styles';

export default function DeliveryEdit({ location }) {
  const { deliver } = location.state;

  return (
    <Container>
      <TopLine title="Edição de encomendas" />
      <FormContainer>
        <FirstLine>
          <FirstLineInput>
            <span>Destinatário</span>
            <input type="text" defaultValue={deliver.recipient.name} />
          </FirstLineInput>
          <FirstLineInput>
            <span>Entregador</span>
            <input type="text" defaultValue={deliver.deliveryman.name} />
          </FirstLineInput>
        </FirstLine>
        <LastLine>
          <span>Nome do produto</span>
          <input type="text" defaultValue={deliver.product} />
        </LastLine>
      </FormContainer>
    </Container>
  );
}

DeliveryEdit.propTypes = {
  location: PropTypes.object.isRequired,
};
