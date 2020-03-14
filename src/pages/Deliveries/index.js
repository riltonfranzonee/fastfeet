/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import { utcToZonedTime, format } from 'date-fns-tz';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import {
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdCreate,
  MdRemoveRedEye,
  MdDeleteForever,
} from 'react-icons/md';

import Modal from '~/components/Modal';
import useToggle from '~/hooks/useToggle';
import AddButton from '~/components/AddButton';
import Empty from '~/components/Empty';

import {
  Container,
  SearchRow,
  SearchIcon,
  TableWrapper,
  Table,
  IdTh,
  RecipientTh,
  CityTh,
  StateTh,
  DeliverymanTh,
  StatusTh,
  ActionsTh,
  IdTd,
  RecipientTd,
  CityTd,
  StateTd,
  DeliverymanTd,
  StatusTd,
  PageNav,
  ActionsWrapper,
  ActionsMenu,
  Wrapper,
  DeliverInfo,
  DateInfo,
  TakeDate,
  DeliverDate,
  Signature,
} from './styles';

import api from '~/services/api';
import history from '~/services/history';

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useToggle(false);
  const [selectedDeliver, setSelectedDeliver] = useState();

  async function loadDeliveries(pageSelected, q) {
    const response = await api.get('deliver', {
      params: {
        page: pageSelected,
        q,
      },
    });

    response.data.map(deliver => {
      if (!deliver.recipient) {
        return (deliver.recipient = {
          name: 'Destinatário Deletado',
          state: 'N/A',
          city: 'Deletado',
          street: 'N/A',
          zip: 'N/A',
          number: 'N/A',
        });
      }
      return deliver;
    });

    setDeliveries(response.data);
  }

  useEffect(() => {
    loadDeliveries(page);
  }, [page]);

  function handleSearch({ searchInput }) {
    const q = searchInput;
    loadDeliveries(null, q);
  }

  function increment() {
    setPage(page + 1);
  }

  function decrement() {
    setPage(page - 1);
  }

  function toggleMenu(deliverId) {
    const formatedDeliveries = deliveries.map(deliver => {
      if (deliver.id === deliverId) {
        deliver.showActionsMenu = !deliver.showActionsMenu;
      } else {
        deliver.showActionsMenu = false;
      }
      return deliver;
    });

    setDeliveries(formatedDeliveries);
  }

  function handleEdit(deliver) {
    if (deliver.showActionsMenu) {
      history.push({
        pathname: '/deliveries/edit',
        state: { deliver },
      });
    }
  }

  async function handleDelete(id) {
    const confirmation = window.confirm(
      'Tem certeza que deseja apagar esta encomenda?'
    );
    if (confirmation === true) {
      try {
        await api.delete('deliver', {
          data: {
            id,
          },
        });
        toast.success('Encomenda deletada com sucesso');
        loadDeliveries(page, null);
      } catch (err) {
        toast.error('Não foi possível deletar a encomenda');
      }
    }
  }

  function formatDate(date) {
    if (!date) {
      return null;
    }

    const pattern = 'dd/MM/yyyy';
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
    const zonedDate = utcToZonedTime(date, timeZone);
    const formattedDate = format(zonedDate, pattern);

    return formattedDate;
  }

  async function handleModal(deliverId) {
    const foundDeliver = await deliveries.find(
      deliver => deliver.id === deliverId
    );
    foundDeliver.formattedStartDate = formatDate(foundDeliver.start_date);
    foundDeliver.formattedEndDate = formatDate(foundDeliver.end_date);
    setSelectedDeliver(foundDeliver);
    setOpen(!open);
  }

  return (
    <Container>
      <h1>Gerenciador de encomendas</h1>
      <SearchRow>
        <Form onSubmit={handleSearch}>
          <SearchIcon size={19} color="#999999" />
          <Input name="searchInput" placeholder="Buscar por encomendas" />
        </Form>
        <AddButton onClick={() => history.push('/deliveries/register')} />
      </SearchRow>
      {deliveries.length > 0 ? (
        <TableWrapper>
          <Table>
            <tr>
              <IdTh>ID</IdTh>
              <RecipientTh>Destinatário</RecipientTh>
              <DeliverymanTh>Entregador</DeliverymanTh>
              <CityTh>Cidade</CityTh>
              <StateTh>Estado</StateTh>
              <StatusTh>Status</StatusTh>
              <ActionsTh>Ações</ActionsTh>
            </tr>
            {deliveries.map(deliver => (
              <tr key={deliver.id}>
                <IdTd>{`#${deliver.id}`}</IdTd>
                <RecipientTd>{deliver.recipient.name}</RecipientTd>
                <DeliverymanTd>
                  <img
                    src={`https://ui-avatars.com/api/?name=${deliver.deliveryman.name.replace(
                      /\s/g,
                      '+'
                    )}`}
                    alt="{deliver.deliveryman.name}"
                  />
                  {deliver.deliveryman.name}
                </DeliverymanTd>
                <CityTd>{deliver.recipient.city}</CityTd>
                <StateTd>{deliver.recipient.state}</StateTd>
                {deliver.start_date &&
                deliver.end_date === null &&
                deliver.canceled_at === null ? (
                  <StatusTd status="retirado">
                    <span />
                    Retirado
                  </StatusTd>
                ) : deliver.canceled_at ? (
                  <StatusTd status="cancelado">
                    <span />
                    Cancelado
                  </StatusTd>
                ) : deliver.end_date ? (
                  <StatusTd status="entregue">
                    <span />
                    Entregue
                  </StatusTd>
                ) : deliver.start_date === null ? (
                  <StatusTd status="pendente">
                    <span />
                    Pendente
                  </StatusTd>
                ) : null}
                <ActionsWrapper>
                  <button type="button" onClick={() => toggleMenu(deliver.id)}>
                    •••
                  </button>
                  <ActionsMenu showActionsMenu={deliver.showActionsMenu}>
                    <li
                      onClick={() => {
                        handleModal(deliver.id);
                        deliver.showActionsMenu = false;
                      }}
                    >
                      <MdRemoveRedEye color="#8E5BE8" />
                      <span>Visualizar</span>
                      {open && (
                        <Modal open={open}>
                          <Wrapper>
                            <DeliverInfo>
                              <strong>Informações da encomenda</strong>
                              <span>{`${selectedDeliver.recipient.street}, ${selectedDeliver.recipient.number}`}</span>
                              <span>{`${selectedDeliver.recipient.city} - ${selectedDeliver.recipient.state}`}</span>
                              <span>{selectedDeliver.recipient.zip}</span>
                            </DeliverInfo>
                            <DateInfo>
                              <strong>Datas</strong>
                              <TakeDate>
                                <span>Retirada: </span>
                                <span>
                                  {selectedDeliver.formattedStartDate ||
                                    'Pendente'}
                                </span>
                              </TakeDate>
                              <DeliverDate>
                                <span>Entrega: </span>
                                <span>
                                  {selectedDeliver.formattedEndDate ||
                                    'Pendente'}
                                </span>
                              </DeliverDate>
                            </DateInfo>
                            <Signature>
                              <strong>Assinatura do usuário</strong>
                              {selectedDeliver.signature ? (
                                <img
                                  src={selectedDeliver.signature.url}
                                  alt="assinatura do destinatário"
                                />
                              ) : (
                                <span>
                                  Assinatura ainda não registrada no sistema
                                </span>
                              )}
                            </Signature>
                          </Wrapper>
                        </Modal>
                      )}
                    </li>
                    <li onClick={() => handleEdit(deliver)}>
                      <MdCreate color="#4D85EE" />
                      <span>Editar</span>
                    </li>
                    <li onClick={() => handleDelete(deliver.id)}>
                      <MdDeleteForever color="#DE3B3B" />
                      <span>Deletar</span>
                    </li>
                  </ActionsMenu>
                </ActionsWrapper>
              </tr>
            ))}
          </Table>
        </TableWrapper>
      ) : (
        <Empty />
      )}
      <PageNav>
        {page > 1 ? (
          <MdKeyboardArrowLeft size={30} onClick={decrement} />
        ) : (
          <MdKeyboardArrowLeft size={30} color="#999" />
        )}
        <span>{page}</span>
        <MdKeyboardArrowRight size={30} onClick={increment} />
      </PageNav>
    </Container>
  );
}
