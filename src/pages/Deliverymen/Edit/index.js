import React from 'react';
import PropTypes from 'prop-types';
import TopLine from '~/components/TopLine';

import { Container, FormContainer, LineInput, ImageInput } from './styles';

export default function DeliverymanEdit({ location }) {
  const { deliveryman } = location.state;

  return (
    <Container>
      <TopLine title="Edição de entregadores" />
      <FormContainer>
        <ImageInput>
          <img
            src={
              deliveryman.avatar.url ||
              `https://ui-avatars.com/api/?name=${deliveryman.name.replace(
                /\s/g,
                '+'
              )}`
            }
            alt=""
          />
        </ImageInput>
        <LineInput>
          <span>Nome</span>
          <input type="text" defaultValue={deliveryman.name} />
        </LineInput>
        <LineInput>
          <span>Email</span>
          <input type="text" defaultValue={deliveryman.email} />
        </LineInput>
      </FormContainer>
    </Container>
  );
}

DeliverymanEdit.propTypes = {
  location: PropTypes.object.isRequired,
};
