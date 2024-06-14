import Editora from '../modelo/Editora';


const editoras: Array<Editora> = [
    new Editora(1, "Editora A"),
    new Editora(2, "Editora B"),
    new Editora(3, "Editora C")
];

class ControleEditora {
    getEditoras(): Array<Editora> {
        return editoras;
    }

    getNomeEditora(codEditora: number): string | undefined {
        const editora = editoras.find(editora => editora.codEditora === codEditora);
        return editora ? editora.nome : undefined;
    }
}

export default ControleEditora;
