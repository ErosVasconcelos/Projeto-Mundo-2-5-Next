import  Livro  from '../classes/modelo/Livro';
import ControleEditora from '../classes/controle/ControleEditora';

interface LinhaLivroProps {
  livro: Livro;
  excluir: () => void;
}

const controleEditora = new ControleEditora();

export const LinhaLivro: React.FC<LinhaLivroProps> = ({ livro, excluir }) => {
  const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

  return (
    <tr>
      <td>{livro.título}</td>
      <td>{livro.resumo}</td>
      <td>{nomeEditora}</td>
      <td>
        {livro.autores.map((autor, index) => (
          <div key={index}>{autor}</div>
        ))}
      </td>
      <td>
        <button onClick={excluir} className="btn btn-danger">Excluir</button>
      </td>
    </tr>
  );
};
