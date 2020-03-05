import React from 'react';
import { NavLink } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import logo from '~/assets/logo.svg';
import {
  Container,
  Wrapper,
  LeftContent,
  NavigationOptions,
  RightContent,
} from './styles';

import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Wrapper>
        <LeftContent>
          <img src={logo} alt="Fastfeet" />
          <NavigationOptions>
            <NavLink to="/deliveries" activeStyle={{ color: '#444444' }}>
              Encomendas
            </NavLink>
            <NavLink to="/deliverymen" activeStyle={{ color: '#444444' }}>
              Entregadores
            </NavLink>
            <NavLink to="/recipients" activeStyle={{ color: '#444444' }}>
              Destinatários
            </NavLink>
            <NavLink to="/problems" activeStyle={{ color: '#444444' }}>
              Problemas
            </NavLink>
          </NavigationOptions>
        </LeftContent>
        <RightContent>
          <span>Admin FastFeet</span>
          <button type="button" onClick={handleLogout}>
            sair do sistema
          </button>
        </RightContent>
      </Wrapper>
    </Container>
  );
}
