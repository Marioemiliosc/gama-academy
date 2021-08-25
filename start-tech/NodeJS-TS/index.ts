// Importacao de biblioteca
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { parse } from 'query-string';
import * as url from 'url';
import { writeFile, readFile, unlink } from 'fs';

// Definicao de porta
const port = 5000;

const server = createServer((request: IncomingMessage, response: ServerResponse) => {

    // Implementar codigo aqui
    const urlparse = url.parse(request.url ? request.url : '', true);

    var resposta;
    
    //Receber informacoes do usuario
    const params = parse(urlparse.search ? urlparse.search : '');

    // Criar um usuario - Atualizar um usuario
    if(urlparse.pathname == '/criar-atualizar-usuario') { // O .pathname é a parte que está antes da interrogação na nossa url
  
        // salvar as informacoes
        writeFile('users/' + params.id + '.txt', JSON.stringify(params), function (err: any) {
            if (err) throw err;
            console.log('Saved!');
            
            resposta = 'Usuario criado/atualizado com sucesso'

            response.statusCode = 200;
            response.setHeader('Content-Type', 'text/plain');
            response.end(resposta);
        });
    }
    // Selecionar usuario
    else if (urlparse.pathname == '/selecionar-usuario') {

        // Busca pelo usuario atravez do parametro passado
        readFile('users/' + params.id + '.txt', function(err: any, data) {
        resposta = data;

            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.end(resposta);
        });
    }
    // Remover o usuario
    else if (urlparse.pathname == '/remover-usuario') {
        unlink('users/' + params.id + '.txt', function (err: any) {
            console.log('File deleted!');

            resposta = err ? "Usuario nao encontrado." : "Usuario removido.";

            response.statusCode = 200;
            response.setHeader('Content-Type', 'text/plain');
            response.end(resposta);
        }); 
    }
});

// Execucao
server.listen( port, () => {
    console.log(`Server running on port ${port}`);
});

// localhost:5000/criar-atualizar-usuario?id=123&nome=mario&idade=29&sexo=masculino&cidade=campinas
// localhost:5000/selecionar-usuario?id=123
// localhost:5000/remover-usuario?id=123
