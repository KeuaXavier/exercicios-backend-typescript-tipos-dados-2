// {
//     const fs = require('fs');

//     function lerArquivo(): unknown {
//         return JSON.parse(fs.readFileSync('./bd1.json'))
//     }

//     function escreverArquivo(dados: any): void {
//         fs.writeFileSync('./bd1.json', JSON.stringify(dados))
//     }

//     const dados = lerArquivo() as string[]

//     dados.push('Kell')

//     escreverArquivo(dados)

//     console.log(lerArquivo());
// }