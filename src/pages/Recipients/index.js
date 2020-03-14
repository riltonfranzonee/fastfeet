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

import {
  Container,
  SearchRow,
  SearchIcon,
  TableWrapper,
  Table,
  ActionsWrapper,
  ActionsMenu,
  PageNav,
} from '~/pages/Deliveries/styles';

import { IdTd, NameTd, AddressTd } from './styles';

import api from '~/services/api';
import history from '~/services/history';

export default function Recipients() {
  const [recipients, setRecipients] = useState([]);
  const [page, setPage] = useState(1);

  async function loadRecipients(pageSelected, q) {
    const response = await api.get('recipient', {
      params: {
        q,
        page: pageSelected,
      },
    });

    setRecipients(response.data);
  }

  useEffect(() => {
    loadRecipients(page, null);
  }, [page]);

  function handleSearch({ searchInput }) {
    const q = searchInput;
    loadRecipients(null, q);
  }

  function increment() {
    setPage(page + 1);
  }

  function decrement() {
    setPage(page - 1);
  }

  function toggleMenu(recipientId) {
    const formatedRecipients = recipients.map(recipient => {
      if (recipient.id === recipientId) {
        recipient.showActionsMenu = !recipient.showActionsMenu;
      } else {
        recipient.showActionsMenu = false;
      }
      return recipient;
    });

    setRecipients(formatedRecipients);
  }

  function handleEdit(recipient) {
    if (recipient.showActionsMenu) {
      history.push({
        pathname: '/recipients/edit',
        state: { recipient },
      });
    }
  }

  async function handleDelete(id) {
    const confirmation = window.confirm(
      'Tem certeza que deseja apagar este destinatário do sistema?'
    );
    if (confirmation === true) {
      try {
        await api.delete('recipient', {
          data: {
            id,
          },
        });
        toast.success('Destinatário deletado com sucesso do sistema');
        loadRecipients(page, null);
      } catch (err) {
        toast.error('Não foi possível deletar o destinatário do sistema');
      }
    }
  }

  return (
    <Container>
      <h1>Gerenciador de destinatários</h1>
      <SearchRow>
        <Form onSubmit={handleSearch}>
          <SearchIcon size={19} color="#999999" />
          <Input name="searchInput" placeholder="Buscar por destinatários" />
        </Form>
        <AddButton onClick={() => history.push('/recipients/register')} />
      </SearchRow>

      {recipients.length > 0 ? (
        <TableWrapper>
          <Table>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Ações</th>
            </tr>

            {recipients.map(recipient => (
              <tr>
                <IdTd>{`#${recipient.id}`}</IdTd>
                <NameTd>{recipient.name}</NameTd>
                <AddressTd>{`${recipient.street}, ${recipient.number}, ${recipient.city} - ${recipient.state}`}</AddressTd>
                <ActionsWrapper>
                  <button
                    type="button"
                    onClick={() => toggleMenu(recipient.id)}
                  >
                    •••
                  </button>

                  <ActionsMenu showActionsMenu={recipient.showActionsMenu}>
                    <li onClick={() => handleEdit(recipient)}>
                      <MdCreate color="#4D85EE" />
                      <span>Editar</span>
                    </li>
                    <li onClick={() => handleDelete(recipient.id)}>
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
