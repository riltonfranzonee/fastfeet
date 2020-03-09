import React, { useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import TopLine from '~/components/TopLine';

import api from '~/services/api';
import history from '~/services/history';

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

  const [id] = useState(recipient.id);
  const [name, setName] = useState(recipient.name);
  const [street, setStreet] = useState(recipient.street);
  const [number, setNumber] = useState(recipient.number);
  const [complement, setComplement] = useState(recipient.complement);
  const [city, setCity] = useState(recipient.city);
  const [state, setState] = useState(recipient.state);
  const [zip, setZip] = useState(recipient.zip);

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleStreetChange(e) {
    setStreet(e.target.value);
  }
  function handleNumberChange(e) {
    setNumber(e.target.value);
  }
  function handleComplementChange(e) {
    setComplement(e.target.value);
  }
  function handleCityChange(e) {
    setCity(e.target.value);
  }
  function handleStateChange(e) {
    setState(e.target.value);
  }
  function handleZipChange(e) {
    setZip(e.target.value);
  }

  const recipientData = {
    id,
    name,
    street,
    number,
    complement,
    city,
    state,
    zip,
  };

  const schema = Yup.object().shape({
    id: Yup.number().required(),
    name: Yup.string().required(),
    street: Yup.string().required(),
    state: Yup.string()
      .length(2)
      .required(),
    number: Yup.string().required(),
    complement: Yup.string().nullable(),
    city: Yup.string().required(),
    zip: Yup.string()
      .min(8)
      .max(9)
      .required(),
  });

  async function updateRecipient(data) {
    try {
      const isInputValid = await schema.isValid(data);
      if (isInputValid) {
        await api.put('recipient', {
          id: data.id,
          name: data.name,
          street: data.street,
          number: data.number,
          complement: data.complement,
          city: data.city,
          state: data.state,
          zip: data.zip,
        });

        toast.success('Informações do destinatário alteradas com sucesso');
        history.push('/recipients');
      } else {
        toast.error('Dados inseridos inválidos');
      }
    } catch (err) {
      toast.error('Não foi possível alterar as informações do destinatário');
    }
  }
  return (
    <Container>
      <TopLine
        title="Edição de destinatários"
        saveFunction={updateRecipient}
        data={recipientData}
      />
      <FormContainer>
        <LineInput>
          <span>Nome</span>
          <input type="text" defaultValue={name} onChange={handleNameChange} />
        </LineInput>
        <SecondLine>
          <LargeInput>
            <span>Rua</span>
            <input
              type="text"
              defaultValue={street}
              onChange={handleStreetChange}
            />
          </LargeInput>
          <SmallInput>
            <span>Número</span>
            <input
              type="text"
              defaultValue={number}
              onChange={handleNumberChange}
            />
          </SmallInput>
          <SmallInput>
            <span>Complemento</span>
            <input
              type="text"
              defaultValue={complement}
              onChange={handleComplementChange}
            />
          </SmallInput>
        </SecondLine>
        <LastLine>
          <MediumInput>
            <span>Cidade</span>
            <input
              type="text"
              defaultValue={city}
              onChange={handleCityChange}
            />
          </MediumInput>
          <MediumInput>
            <span>Estado</span>
            <input
              type="text"
              defaultValue={state}
              onChange={handleStateChange}
            />
          </MediumInput>
          <MediumInput>
            <span>CEP</span>
            <input type="text" defaultValue={zip} onChange={handleZipChange} />
          </MediumInput>
        </LastLine>
      </FormContainer>
    </Container>
  );
}

RecipientEdit.propTypes = {
  location: PropTypes.object.isRequired,
};
