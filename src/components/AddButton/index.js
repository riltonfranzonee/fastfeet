import React from 'react';
import { MdAdd } from 'react-icons/md';
import { Button } from './styles';

export default function AddButton({ onClick }) {
  return (
    <Button type="button" onClick={onClick}>
      <MdAdd color="#ffffff" size={22} />
      <span>Cadastrar</span>
    </Button>
  );
}
