import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
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

export default function DeliveryRegister() {
  const [deliverymen, setDeliverymen] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [inputRecipient, setRecipientInput] = useState('');
  const [inputDman, setDmanInput] = useState('');
  const [inputProduct, setProductInput] = useState('');

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

  async function registerDeliver(data) {
    try {
      await api.post('deliver', {
        recipientId: data.recipientId,
        deliverymanId: data.deliverymanId,
        product: data.product,
      });
      toast.success('Encomenda cadastrada com sucesso');
      history.push('/deliveries');
    } catch (err) {
      toast.error(
        'Não foi possível criar a encomenda. Verifique se todos os campos foram preenchidos'
      );
    }
  }

  const newDeliverData = {
    recipientId: inputRecipient,
    deliverymanId: inputDman,
    product: inputProduct,
  };

  return (
    <Container>
      <TopLine
        title="Cadastro de encomendas"
        saveFunction={registerDeliver}
        data={newDeliverData}
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
                maxMenuHeight={80}
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
