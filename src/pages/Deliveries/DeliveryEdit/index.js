import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import TopLine from '~/components/TopLine';
import { selectorStyles } from '~/components/AsyncSelector/index';

import {
  Container,
  FormContainer,
  FirstLine,
  LastLine,
  FirstLineInput,
} from './styles';

import history from '~/services/history';
import api from '~/services/api';

export default function DeliveryEdit({ location }) {
  const { deliver } = location.state;
  const [deliverymen, setDeliverymen] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [inputRecipient, setRecipientInput] = useState('');
  const [inputDman, setDmanInput] = useState('');
  const [inputProduct, setProductInput] = useState(deliver.product);

  useEffect(() => {
    async function loadData() {
      const resoponseDeliverymen = await api.get('deliveryman');
      const dmen = resoponseDeliverymen.data;
      setDeliverymen(
        dmen.map(d => ({
          id: d.id,
          label: d.name,
          value: d.name.toLowerCase(),
        }))
      );

      const resoponseRecipients = await api.get('recipient');
      const recipientsFound = resoponseRecipients.data;

      setRecipients(
        recipientsFound.map(r => ({
          id: r.id,
          label: r.name,
          value: r.name.toLowerCase(),
        }))
      );
    }

    loadData();
  }, []);

  function handleRecipientInput(selectedOption) {
    setRecipientInput(selectedOption.id);
  }

  function handleDmanInput(selectedOption) {
    setDmanInput(selectedOption.id);
  }

  function handleProductInput(e) {
    setProductInput(e.target.value);
  }

  function filterRecipients(inputValue) {
    return recipients.filter(r =>
      r.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  function filterDeliverymen(inputValue) {
    return deliverymen.filter(d =>
      d.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  function promiseRcpOptions(inputValue, callback) {
    setTimeout(() => {
      callback(filterRecipients(inputValue));
    }, 100);
  }

  function promiseDmanOptions(inputValue, callback) {
    setTimeout(() => {
      callback(filterDeliverymen(inputValue));
    }, 100);
  }

  async function updateDeliver(data) {
    try {
      await api.put('deliver', {
        id: data.id,
        recipientId: data.recipientId,
        deliverymanId: data.deliverymanId,
        product: data.product,
      });
      toast.success('Informações da encomenda atualizadas com sucesso');
      history.push('/deliveries');
    } catch (err) {
      toast.error('Não foi possível atualizar as informações encomenda');
      console.tron.log(err);
    }
  }

  const uploadData = {
    id: deliver.id,
    recipientId: inputRecipient || deliver.recipient.id,
    deliverymanId: inputDman || deliver.deliveryman.id,
    product: inputProduct || deliver.product,
  };

  return (
    <Container>
      <TopLine
        title="Edição de encomendas"
        saveFunction={updateDeliver}
        data={uploadData}
      />
      <FormContainer>
        <FirstLine>
          <FirstLineInput>
            <span>Destinatário</span>
            <div>
              <AsyncSelect
                styles={selectorStyles}
                onChange={handleRecipientInput}
                defaultOptions={recipients}
                loadOptions={promiseRcpOptions}
                placeholder="Selecionar"
              />
            </div>
          </FirstLineInput>
          <FirstLineInput>
            <span>Entregador</span>
            <AsyncSelect
              styles={selectorStyles}
              onChange={handleDmanInput}
              defaultOptions={deliverymen}
              loadOptions={promiseDmanOptions}
              placeholder="Selecionar"
            />
          </FirstLineInput>
        </FirstLine>
        <LastLine>
          <span>Nome do produto</span>
          <input
            type="text"
            value={inputProduct}
            onChange={handleProductInput}
          />
        </LastLine>
      </FormContainer>
    </Container>
  );
}

DeliveryEdit.propTypes = {
  location: PropTypes.object.isRequired,
};
