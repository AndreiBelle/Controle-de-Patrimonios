const dadosModel = require('./src/Models/dadosModel');

async function testeUpdate() {
    
    id = 1;
    patrimonio = 23,
    situacao = 1,
    nome = "null",
    usuario = "null",
    setor = "null",
    local = "null null",
    item = "null null null",
    marca = "null null",
    modelo = "null null",
    informacoes = "null"
    nome_nota = "null ",
    caminho_pdf = "null",
    observacoes = "null"

    const dados = {patrimonio, situacao, nome, usuario, setor, local, item, marca, modelo, informacoes, nome_nota, caminho_pdf, observacoes};

    const resultado = JSON.stringify(dados); 

    try {
        console.log("Acessando banco para realizar UPDATE...")
        const resultado = await dadosModel.editarPatrimonio(id, (dados));

        if(resultado.success) {
            console.log("Dados atualizados no banco!")
        }
    } catch (err) {
        console.log("Erro ao adicionar ao banco: ",err);
    } finally {
        console.log("Teste finalizado");
        process.exit();
    }
    
}

async function testeCreate() {

    patrimonio = 23,
    situacao = 1,
    nome = "pedrinho testando",
    usuario = "pedrinho testando",
    setor = "testes",
    local = "de testes",
    item = "item de testes",
    marca = "testista hehe",
    modelo = "modelo teste",
    informacoes = "informo sim",
    nome_nota = "nonme dela",
    caminho_pdf = "vira a direta e vai reto",
    observacoes = "observo sim"

    const dados = {patrimonio, situacao, nome, usuario, setor, local, item, marca, modelo, informacoes, nome_nota, caminho_pdf, observacoes};

    const resultado = JSON.stringify(dados); 

    try {
        console.log("Acessando banco para realizar INSERT...")
        const resultado = await dadosModel.cadastraPatrimonio(dados);

        if(resultado.success) {
            console.log("Dados adicionados ao banco!")
        }
    } catch (err) {
        console.log("Erro ao adicionar ao banco: ",err);
    } finally {
        console.log("Teste finalizado");
        process.exit();
    }
    
}

async function teste() {
    try{
        console.log("Consultando Banco...")
        const resultado = await dadosModel.buscaPatrimonio();

        if(resultado && resultado.length > 0) {
            console.log("Conexão e Model funcionando!");
            console.log(`Total de registros encontrados: ${resultado.length}`);

            console.table(resultado);
        } else {
            console.warn("O Model executou, mas não retornou nenhum dado (tabela vazia).");
        }
    } catch (err) {
        console.error('Falha')
        console.error('Motivo: ', err.message);
    } finally {
        console.log("Teste finalizado");
        process.exit();
    }
}

async function testeDelete() {
    id = 1

    console.log("Acessando o banco")

    try {
        const executa = await dadosModel.deletarPatrimonio(id)
        console.log("Realizando o DELETE no banco...")

    } catch (err) {
        console.log("Erro ao deletar: ",err)
    }
    finally {
        console.log("Finalizado...")
        process.exit();
    }

}

testeDelete();