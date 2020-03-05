import React, { useState, useEffect } from 'react';

import {
  MdRemoveRedEye,
  MdDeleteForever,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
} from 'react-icons/md';

import Empty from '~/components/Empty';

import {
  Container,
  TableWrapper,
  Table,
  ActionsWrapper,
  PageNav,
} from '~/pages/Deliveries/styles';

import { ActionsMenu } from './styles';

import api from '~/services/api';

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [page, setPage] = useState(1);

  async function loadProblems(pageSelected) {
    const response = await api.get('delivery/problems', {
      params: {
        page: pageSelected,
      },
    });

    setProblems(response.data);
  }

  useEffect(() => {
    loadProblems(page);
  }, [page]);

  function increment() {
    setPage(page + 1);
  }

  function decrement() {
    setPage(page - 1);
  }

  function toggleMenu(problemId) {
    const formatedProblems = problems.map(problem => {
      if (problem.id === problemId) {
        problem.showActionsMenu = !problem.showActionsMenu;
      } else {
        problem.showActionsMenu = false;
      }
      return problem;
    });

    setProblems(formatedProblems);
  }
  return (
    <Container>
      <h1>Problemas na entrega</h1>

      {problems.length > 0 ? (
        <TableWrapper>
          <Table>
            <tr>
              <th>Encomenda</th>
              <th>Problema</th>
              <th>Ações</th>
            </tr>

            {problems.map(problem => (
              <tr>
                <td>{`#${problem.delivery_id}`}</td>
                <td>{problem.description}</td>
                <ActionsWrapper>
                  <button type="button" onClick={() => toggleMenu(problem.id)}>
                    •••
                  </button>

                  <ActionsMenu showActionsMenu={problem.showActionsMenu}>
                    <li onClick={() => console.tron.log('')}>
                      <MdRemoveRedEye color="#8E5BE8" />
                      <span>Visualizar</span>
                    </li>
                    <li>
                      <MdDeleteForever color="#DE3B3B" />
                      <span>Cancelar encomenda</span>
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
