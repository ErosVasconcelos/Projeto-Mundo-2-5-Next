import React, { useState } from 'react';
import Head from 'next/head';
import { Menu } from '../components/Menu';
import ControleEditora from '../classes/controle/ControleEditora';
import { useRouter } from 'next/router';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const controleEditora = new ControleEditora();
const baseURL = "http://localhost:3000/api/livros";

const LivroDados: React.FC = () => {
  const [titulo, setTitulo] = useState<string>('');
  const [resumo, setResumo] = useState<string>('');
  const [autores, setAutores] = useState<string>('');
  const [codEditora, setCodEditora] = useState<number>(0);
  const opcoes = controleEditora.getEditoras().map(editora => ({ value: editora.codigo, text: editora.nome }));
  const navigate = useRouter().push;

  const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCodEditora(Number(event.target.value));
  };

  const incluir = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const livro = {
      codigo: 0,
      codEditora: codEditora,
      titulo: titulo,
      resumo: resumo,
      autores: autores.split('\n')
    };

    try {
      const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(livro)
      });
      
      if (response.ok) {
        navigate('/LivroLista');
      } else {
        console.error('Erro ao incluir o livro:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao incluir o livro:', error);
    }
  };

  return (
    <div className="container-fluid">
      <Head>
        <title>Incluir Livro</title>
      </Head>
      <Menu />
      <main>
        <Card>
          <Card.Body>
            <Card.Title>Incluir Livro</Card.Title>
            <form onSubmit={incluir}>
              <div className="mb-3">
                <label className="form-label">Título:</label>
                <input type="text" value={titulo} onChange={e => setTitulo(e.target.value)} className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Resumo:</label>
                <textarea value={resumo} onChange={e => setResumo(e.target.value)} className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Autores (um por linha):</label>
                <textarea value={autores} onChange={e => setAutores(e.target.value)} className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Editora:</label>
                <select value={codEditora} onChange={tratarCombo} className="form-select">
                  {opcoes.map(opcao => (
                    <option key={opcao.value} value={opcao.value}>{opcao.text}</option>
                  ))}
                </select>
              </div>
              <Button variant="primary" type="submit">Incluir</Button>
            </form>
          </Card.Body>
        </Card>
      </main>
    </div>
  );
};

export default LivroDados;
