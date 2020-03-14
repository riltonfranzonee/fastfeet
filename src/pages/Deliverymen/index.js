import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import {
  MdCreate,
  MdDeleteForever,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
} from 'react-icons/md';

import AddButton from '~/components/AddButton';
import Empty from '~/components/Empty';

import { Container, SearchRow, SearchIcon } from '~/pages/Deliveries/styles';

import {
  TableWrapper,
  Table,
  ActionsWrapper,
  ActionsMenu,
  PageNav,
  NameTd,
  EmailTd,
  AvatarTd,
} from './styles';

import api from '~/services/api';
import history from '~/services/history';

export default function Deliverymen() {
  const [deliverymen, setDeliverymen] = useState([]);
  const [page, setPage] = useState(1);

  async function loadDeliverymen(pageSelected, q) {
    const response = await api.get('deliveryman', {
      params: {
        q,
        page: pageSelected,
      },
    });

    setDeliverymen(response.data);
  }

  useEffect(() => {
    loadDeliverymen(page, null);
  }, [page]);

  function handleSearch({ searchInput }) {
    const q = searchInput;
    loadDeliverymen(null, q);
  }

  function increment() {
    setPage(page + 1);
  }

  function decrement() {
    setPage(page - 1);
  }

  function toggleMenu(deliverymanId) {
    const formatedDeliverymen = deliverymen.map(deliveryman => {
      if (deliveryman.id === deliverymanId) {
        deliveryman.showActionsMenu = !deliveryman.showActionsMenu;
      } else {
        deliveryman.showActionsMenu = false;
      }
      return deliveryman;
    });

    setDeliverymen(formatedDeliverymen);
  }

  function handleEdit(deliveryman) {
    if (deliveryman.showActionsMenu) {
      history.push({
        pathname: '/deliverymen/edit',
        state: { deliveryman },
      });
    }
  }

  async function handleDelete(id) {
    const confirmation = window.confirm(
      'Tem certeza que deseja apagar este entregador do sistema?'
    );
    if (confirmation === true) {
      try {
        await api.delete('deliveryman', {
          data: {
            id,
          },
        });
        toast.success('Entregador deletado do sistema com sucesso');
        loadDeliverymen(page, null);
      } catch (err) {
        toast.error('Não foi possível deletar o entregador do sistema');
      }
    }
  }

  return (
    <Container>
      <h1>Gerenciador de entregadores</h1>
      <SearchRow>
        <Form onSubmit={handleSearch}>
          <SearchIcon size={19} color="#999999" />
          <Input name="searchInput" placeholder="Buscar por entregadores" />
        </Form>
        <AddButton onClick={() => history.push('/deliverymen/register')} />
      </SearchRow>

      {deliverymen.length > 0 ? (
        <TableWrapper>
          <Table>
            <tr>
              <th>ID</th>
              <th>Foto</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>

            {deliverymen.map(deliveryman => (
              <tr>
                <td>{`#${deliveryman.id}`}</td>
                <AvatarTd>
                  <img
                    src={
                      (deliveryman.avatar && deliveryman.avatar.url) ||
                      `https://ui-avatars.com/api/?name=${deliveryman.name.replace(
                        /\s/g,
                        '+'
                      )}`
                    }
                    alt=""
                  />
                </AvatarTd>
                <NameTd>{deliveryman.name}</NameTd>
                <EmailTd>{deliveryman.email}</EmailTd>
                <ActionsWrapper>
                  <button
                    type="button"
                    onClick={() => toggleMenu(deliveryman.id)}
                  >
                    •••
                  </button>

                  <ActionsMenu showActionsMenu={deliveryman.showActionsMenu}>
                    <li onClick={() => handleEdit(deliveryman)}>
                      <MdCreate color="#4D85EE" />
                      <span>Editar</span>
                    </li>
                    <li onClick={() => handleDelete(deliveryman.id)}>
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
