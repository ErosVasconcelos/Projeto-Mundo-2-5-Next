import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import Layout from '../components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';

const baseURL = "http://localhost:3030/livros";

const LivroLista: React.FC = () => {
  const [livros, setLivros] = useState<any[]>([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    obterLivros();
  }, []);

  const obterLivros = async () => {
    try {
      const response = await fetch(baseURL);
      if (response.ok) {
        const data = await response.json();
        setLivros(data);
        setCarregado(true);
      } else {
        console.error('Erro ao obter os livros:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao obter os livros:', error);
    }
  };

  const excluir = async (codigo: number) => {
    try {
      const response = await fetch(`${baseURL}/${codigo}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setLivros(livros.filter(livro => livro.codigo !== codigo));
      } else {
        console.error('Erro ao excluir o livro:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao excluir o livro:', error);
    }
  };

  return (
    <Layout> 
      <div className="container">
        <main>
          <h1>Lista de Livros</h1>
          {livros.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Resumo</th>
                  <th>Editora</th>
                  <th>Autores</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {livros.map((livro: any, index: number) => (
                  <tr key={index}>
                    <td>{livro.título}</td>
                    <td>{livro.resumo}</td>
                    <td>{livro.editora}</td>
                    <td>{livro.autores.join(", ")}</td>
                    <td>
                      <Button variant="danger" onClick={() => excluir(livro.codigo)}>Excluir</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : carregado ? (
            <div>Nenhum livro encontrado.</div>
          ) : (
            <div>Carregando...</div>
          )}
        </main>
      </div>
    </Layout>
  );
};

export default LivroLista;
