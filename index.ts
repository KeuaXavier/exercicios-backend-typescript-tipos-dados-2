const fs = require('fs');

type Usuario = {
    nome: string,
    email: string,
    cpf: string,
    profissao?: string
    endereco: Endereco | null
}

type Endereco = {
    cep: string,
    rua: string,
    complemento?: string,
    bairro: string,
    cidade: string
}

function lerArquivo(): unknown {
    return JSON.parse(fs.readFileSync('./bd.json'))
}

function escreverArquivo(dados: any): void {
    fs.writeFileSync('./bd.json', JSON.stringify(dados))
}

function cadastrarUsuarios(dados: Usuario): Usuario {
    const bd = lerArquivo() as Usuario[]
    bd.push(dados)

    escreverArquivo(bd)

    return dados
}

function ListarUsuarios(filtro?: string): Usuario[] {
    const bd = lerArquivo() as Usuario[]

    const usuarios = bd.filter(usuario => {
        if (filtro) {
            return usuario.profissao === filtro
        }

        return usuario
    })
    return usuarios
}

function detalharUsuario(cpf: string): Usuario {
    const bd = lerArquivo() as Usuario[]

    const usuario = bd.find(usuario => { return usuario.cpf === cpf })

    if (!usuario) throw new Error('Usuário não encontrado')

    return usuario
}

function atualizarUsuario(cpf: string, dados: Usuario): Usuario {
    const bd = lerArquivo() as Usuario[]
    const usuario = bd.find(usuario => { return usuario.cpf === cpf })
    if (!usuario) throw new Error('Usuário não encontrado')

    Object.assign(usuario, dados)

    escreverArquivo(bd)

    return dados
}

function excluirUsuario(cpf: string): Usuario {
    const bd = lerArquivo() as Usuario[]
    const usuario = bd.find(usuario => { return usuario.cpf === cpf })
    if (!usuario) throw new Error('Usuário não encontrado')

    const excluir = bd.filter(usuario => { return usuario.cpf !== cpf })

    escreverArquivo(excluir)

    return usuario
}

// const kell = cadastrarUsuarios({
//     nome: 'Kell Xavier',
//     email: 'kell@email.com',
//     cpf: '123.456.789-00',
//     profissao: 'Back End',
//     endereco: {
//         cep: '38.770-000',
//         rua: 'Rua 333 A',
//         bairro: 'Jardim Central',
//         cidade: 'João Pinheiro'
//     }
// }
// )

// const usuario = cadastrarUsuarios({
//     nome: 'Kell',
//     email: 'kell@email.com',
//     cpf: '123.456.789-03',
//     profissao: 'Full Stack',
//     endereco: null
// }
// )

// const kell = detalharUsuario('123.456.789-00')

// const atualizarKell = atualizarUsuario(
//     '123.456.789-00',
//     {
//         nome: 'Kell Xavier',
//         email: 'kell@email.com',
//         cpf: '123.456.789-00',
//         profissao: 'Desenvolvedor Full Stack',
//         endereco: {
//             cep: '38.770-000',
//             rua: 'Rua 333 A',
//             complemento: "Casa",
//             bairro: 'Jardim Central',
//             cidade: 'João Pinheiro'
//         }
//     }
// )

// excluirUsuario('123.456.789-00')

// const arquivo = lerArquivo();
const arquivo = ListarUsuarios('Back End');
console.log(arquivo)