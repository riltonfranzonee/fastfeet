import React, { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import TopLine from '~/components/TopLine';

import { Container, FormContainer, LineInput, AvatarInput } from './styles';

import api from '~/services/api';
import history from '~/services/history';

export default function DeliverymanEdit({ location }) {
  const { deliveryman } = location.state;
  const defaultAvatar = deliveryman.avatar
    ? deliveryman.avatar.url
    : `https://ui-avatars.com/api/?name=${deliveryman.name.replace(
        /\s/g,
        '+'
      )}`;
  const [name, setName] = useState(deliveryman.name);
  const [email, setEmail] = useState(deliveryman.email);
  const [file, setFile] = useState(deliveryman.avatar_id);
  const [preview, setPreview] = useState(defaultAvatar);

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
    id: deliveryman.id,
    avatar_id: file,
    name,
    email,
  };

  async function uploadDeliveryman(data) {
    try {
      await api.put('deliveryman', {
        id: data.id,
        name: data.name,
        email: data.email,
        avatar_id: data.avatar_id,
      });

      toast.success('Informações do entregador atualizadas com sucesso!');
      history.push('/deliverymen');
    } catch (err) {
      toast.error('Não foi possível atualizar os dados do entregador');
      console.tron.log(err);
    }
  }

  return (
    <Container>
      <TopLine
        title="Edição de entregadores"
        saveFunction={uploadDeliveryman}
        data={newData}
      />
      <FormContainer>
        <AvatarInput>
          <label htmlFor="avatar">
            <img
              src={
                preview ||
                'https://api.adorable.io/avatars/50/abott@adorable.png'
              }
              alt=""
            />
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
          <input type="text" defaultValue={name} onChange={handleNameChange} />
        </LineInput>
        <LineInput>
          <span>Email</span>
          <input
            type="email"
            defaultValue={email}
            onChange={handleEmailChange}
          />
        </LineInput>
      </FormContainer>
    </Container>
  );
}

DeliverymanEdit.propTypes = {
  location: PropTypes.object.isRequired,
};
