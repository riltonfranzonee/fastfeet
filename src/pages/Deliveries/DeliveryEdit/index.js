import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';

import TopLine from '~/components/TopLine';

import {
  Container,
  FormContainer,
  FirstLine,
  LastLine,
  FirstLineInput,
} from './styles';

import api from '~/services/api';

export default function DeliveryEdit({ location }) {
  const { deliver } = location.state;
  const [currentRecipient, setCurrentRecipient] = useState('');
  const [currentDeliveryman, setCurrentDeliveryman] = useState('');

  const [deliverymen, setDeliverymen] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [inputRecipient, setRecipientInput] = useState('');
  const [inputDman, setDmanInput] = useState('');

  useEffect(() => {
    async function loadData() {
      const resoponseDeliverymen = await api.get('deliveryman');
      const dmen = resoponseDeliverymen.data;
      setDeliverymen(
        dmen.map(d => ({
          ...d,
          label: d.name,
        }))
      );

      const resoponseRecipients = await api.get('recipient');
      const recipientsFound = resoponseRecipients.data;

      setRecipients(
        recipientsFound.map(r => ({
          ...r,
          label: r.name,
        }))
      );

      const currentDman = dmen.find(d => d.id === deliver.deliveryman.id);
      setCurrentDeliveryman(currentDman);

      const currentRcp = recipientsFound.find(
        f => f.id === deliver.recipient.id
      );
      setCurrentRecipient(currentRcp);
    }

    loadData();
  }, [deliver.deliveryman.id, deliver.recipient.id]);

  function handleRecipientInput(inputValue) {
    setRecipientInput(inputValue);
    return inputValue;
  }

  function handleDmanInput(inputValue) {
    setDmanInput(inputValue);
    return inputValue;
  }

  function filterRecipients(inputValue) {
    return recipients.find(r =>
      r.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  function filterDeliverymen(inputValue) {
    return deliverymen.find(d =>
      d.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  function promiseRcpOptions(inputValue) {
    new Promise(resolve => {
      setTimeout(() => {
        resolve(filterRecipients(inputValue));
      }, 1000);
    });
  }

  function promiseDmanOptions(inputValue) {
    new Promise(resolve => {
      setTimeout(() => {
        resolve(filterDeliverymen(inputValue));
      }, 1000);
    });
  }

  return (
    <Container>
      <TopLine title="Edição de encomendas" />
      <FormContainer>
        <FirstLine>
          <FirstLineInput>
            <span>Destinatário</span>
            <AsyncSelect
              onInputChange={handleRecipientInput}
              defaultOptions={recipients}
              loadOptions={promiseRcpOptions}
            />
          </FirstLineInput>
          <FirstLineInput>
            <span>Entregador</span>
            <AsyncSelect
              onInputChange={handleDmanInput}
              defaultOptions={deliverymen}
              loadOptions={promiseDmanOptions}
            />
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
