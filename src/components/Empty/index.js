import React from 'react';
import { MdLocalShipping } from 'react-icons/md';

import { Container, EndMessage } from './styles';

export default function Empty() {
  return (
    <Container>
      <EndMessage>
        <h1>Isso é tudo o que temos por enquanto</h1>
        <MdLocalShipping size={50} color="#7d40e7" />
      </EndMessage>
    </Container>
  );
}
