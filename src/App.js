import React, { useState, useEffect } from 'react';
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';
import contatosService from './models/contatos.json'

function App() {
  const [contatos, setContatos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [contatoSelecionado, setContatoSelecionado] = useState(null);
  const [showLoad, setShowLoad] = useState(false);

  useEffect(()=>{
    setShowLoad(true);
    setTimeout(() => {
      setContatos(contatosService);
      setShowLoad(false);
    }, 1000);
  }, []);

  useEffect(()=>{
    if(contatoSelecionado){
      setShowModal(true);
    }else{
      setShowModal(false);
    }
  }, [contatoSelecionado]);


  const exluirContatp = () =>{
    setShowLoad(true);
    setShowModal(false);
    setTimeout(() => {
      const contatosNew = contatos.filter(c => c.id !== contatoSelecionado.id);
      setContatos(contatosNew);
      setContatoSelecionado(null);
      setShowLoad(false);
    }, 1000);
  }



  return (
    <div className={'p-4'}>
      { showLoad && <div> Loading.... </div> }
      <Table>
        <tr>
          <th>Id</th>
          <th>Nome</th>
          <th></th>
        </tr>

        { contatos.map(c => (
        <tr>
          <td>{c.id}</td>
          <td>{c.nome}</td>
          <td><a href={ 'javascript:' } onClick={ () => {
            setContatoSelecionado(c);
          } }>Delete</a></td>
          </tr>
        )) }

      </Table>
      <Modal isOpen={ showModal } toggle={ () => {}}>
        <ModalHeader toggle={ () =>  setContatoSelecionado(null) }>Confirma Exclusão</ModalHeader>
        <ModalBody>
          Confirma Exclusão de { contatoSelecionado && contatoSelecionado.nome }
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={exluirContatp}>Confirma Exclusão</Button>{ ' ' }
          <Button color="secondary" onClick={ () => setContatoSelecionado(null) }>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
