import React, { useState } from 'react';
import { MdPhoto } from 'react-icons/md';
import { toast } from 'react-toastify';
import TopLine from '~/components/TopLine';

import {
  Container,
  FormContainer,
  LineInput,
  AvatarInput,
  EmptyImage,
} from './styles';

import api from '~/services/api';
import history from '~/services/history';

export default function DeliverymanEdit() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();

  async function handleAvatarChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  const newData = {
    avatar_id: file,
    name,
    email,
  };

  async function createDeliveryman(data) {
    try {
      await api.post('deliveryman', {
        name: data.name,
        email: data.email,
        avatar_id: data.avatar_id,
      });

      toast.success('Entregador registrado com sucesso!');
      history.push('/deliverymen');
    } catch (err) {
      toast.error(
        'Não foi possível registrar o entregador. Preencha todos os campos'
      );
      console.tron.log(err);
    }
  }

  return (
    <Container>
      <TopLine
        title="Registro de entregadores"
        saveFunction={createDeliveryman}
        data={newData}
      />
      <FormContainer>
        <AvatarInput>
          <label htmlFor="avatar">
            {preview ? (
              <img src={preview} alt="deliveryman avatar" />
            ) : (
              <EmptyImage>
                <MdPhoto size={50} color="#DDDDDD" />
                <span>Adicionar foto</span>
              </EmptyImage>
            )}
            <input
              type="file"
              accept="image/*"
              id="avatar"
              onChange={handleAvatarChange}
            />
          </label>
        </AvatarInput>
        <LineInput>
          <span>Nome</span>
          <input
            type="text"
            placeholder="Pedro Fagundes"
            onChange={handleNameChange}
          />
        </LineInput>
        <LineInput>
          <span>Email</span>
          <input
            type="email"
            placeholder="pedrofagundes@email.com"
            onChange={handleEmailChange}
          />
        </LineInput>
      </FormContainer>
    </Container>
  );
}
