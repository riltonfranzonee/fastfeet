import React, { useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
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

export default function RecipientRegister() {
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

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

  const newRecipientData = {
    name,
    street,
    number,
    complement,
    city,
    state,
    zip,
  };

  const schema = Yup.object().shape({
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

  async function registerRecipient(data) {
    try {
      const isInputValid = await schema.isValid(data);
      if (isInputValid) {
        await api.post('recipient', {
          name: data.name,
          street: data.street,
          number: data.number,
          complement: data.complement,
          city: data.city,
          state: data.state,
          zip: data.zip,
        });
        toast.success('Destinatário criado com sucesso');
        history.push('/recipients');
      } else {
        toast.error('Preencha os campos corretamente');
      }
    } catch (err) {
      console.tron.log(err);
      toast.error(
        'Não foi possível registrar o destinatário, verifique os dados.'
      );
    }
  }

  return (
    <Container>
      <TopLine
        title="Cadastro de destinatários"
        saveFunction={registerRecipient}
        data={newRecipientData}
      />
      <FormContainer>
        <LineInput>
          <span>Nome</span>
          <input
            type="text"
            placeholder="Paulo Pereira"
            onChange={handleNameChange}
          />
        </LineInput>
        <SecondLine>
          <LargeInput>
            <span>Rua</span>
            <input
              type="text"
              placeholder="Rua Americana"
              onChange={handleStreetChange}
            />
          </LargeInput>
          <SmallInput>
            <span>Número</span>
            <input
              type="text"
              placeholder="1872"
              onChange={handleNumberChange}
            />
          </SmallInput>
          <SmallInput>
            <span>Complemento</span>
            <input
              type="text"
              placeholder="Casa Amarela"
              onChange={handleComplementChange}
            />
          </SmallInput>
        </SecondLine>
        <LastLine>
          <MediumInput>
            <span>Cidade</span>
            <input
              type="text"
              placeholder="Volta Redonda"
              onChange={handleCityChange}
            />
          </MediumInput>
          <MediumInput>
            <span>Estado</span>
            <input type="text" placeholder="RJ" onChange={handleStateChange} />
          </MediumInput>
          <MediumInput>
            <span>CEP</span>
            <input
              type="text"
              placeholder="09960-580"
              onChange={handleZipChange}
            />
          </MediumInput>
        </LastLine>
      </FormContainer>
    </Container>
  );
}
