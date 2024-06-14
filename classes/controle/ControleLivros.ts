import Livro from '../modelo/Livro';

const baseURL = 'http://localhost:3030/livros';

class ControleLivros {
    async obterLivros(): Promise<Livro[]> {
        try {
            const response = await fetch(baseURL);
            if (!response.ok) {
                throw new Error('Erro ao obter os livros');
            }
            const livros: Livro[] = await response.json();
            return livros;
        } catch (error) {
            console.error('Erro ao obter os livros:', error);
            return [];
        }
    }

    async incluir(novoLivro: Livro): Promise<boolean> {
        try {
            const response = await fetch(baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoLivro)
            });
            if (!response.ok) {
                throw new Error('Erro ao incluir o livro');
            }
            const result = await response.json();
            return result.ok;
        } catch (error) {
            console.error('Erro ao incluir o livro:', error);
            return false;
        }
    }

    async excluir(codigo: string): Promise<boolean> {
        try {
            const response = await fetch(`${baseURL}/${codigo}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Erro ao excluir o livro');
            }
            const result = await response.json();
            return result.ok;
        } catch (error) {
            console.error('Erro ao excluir o livro:', error);
            return false;
        }
    }
}

export default ControleLivros;
