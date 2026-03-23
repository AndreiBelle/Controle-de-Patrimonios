const { Workbook } = require('exceljs');
const dadosModel = require('../Models/dadosModel');
const importacao = require('../services/apiExcel');
const path = require('path')

module.exports = {

listaPatrimonios: async (req, res) => {
    try {
    const dados = await dadosModel.buscaPatrimonio();
    return res.status(200).json(dados)
    } catch (err) {
        console.log("Erro: " + err);
        return res.status(500).json({mensagem: "Erro do server: " + err})
    }
},

criarPatrimonios: async (req, res) => {

    const {situacao, usuario, setor, local, item, marca, modelo, informacoes, observacoes} = req.body;
    const patrimonio = Number(req.body.patrimonio);

    const caminho_pdf = req.files['caminho_pdf'] ? req.files['caminho_pdf'][0].path : null;
    const caminho_termo = req.files['caminho_termo'] ? req.files['caminho_termo'][0].path : null;

    const userFront = req.body.usuario;
    const itemFront = req.body.item

    const verifica = await dadosModel.verificaExistente(userFront, itemFront)

    if (verifica.length > 0) {
        console.log("Usuario já existe!")
        return res.status(409).json({mensagem : "Usuario já existe"})
    } 

    try{
        const novoPatrimonio = await dadosModel.cadastraPatrimonio({patrimonio, situacao, usuario, setor, local, item, marca, modelo, informacoes, caminho_termo, caminho_pdf, observacoes});
        return res.status(201).json(novoPatrimonio);
    } catch (err) {
        console.error(err);
        return res.status(500).json({mensagem: "Erro interno ao salvar!"})
    }
},

editarPatrimonios: async (req, res) => {
    const {id} = req.params;
    const {situacao, usuario, setor, local, item, marca, modelo, informacoes, observacoes} = req.body;
    const patrimonio = Number(req.body.patrimonio);
    const dados = {patrimonio, situacao, usuario, setor, local, item, marca, modelo, informacoes, observacoes}

    if(req.file) {
        dados.caminho_termo = req.file.path;
    }

    try {
        await dadosModel.editarPatrimonio(id, dados)
        return res.status(200).json({mensagem : 'Deu boa'})
    } catch (err) {
        console.error(err);
        return res.status(500).json({mensagem: "SERVIDOR FORA."})
    }
},

deletarPatrimonio: async (req, res) => {
    const {id} = req.params;
    
    try {
        await dadosModel.deletarPatrimonio(id)
        return res.status(200).json({mensagem : "Sucesso"})
    } catch (err) {
        console.error(err);
        return res.status(501).json({ mensagem: "SERVIDOR FORA"})
    }
},

buscarPorId: async (req, res) => {
    const {id} = req.params;

    try {
        const patrimonio = await dadosModel.buscaPorId(id)

        if(patrimonio) {
            return res.json(patrimonio);
        } else {
            return res.status(404).json({ mensagem: "Patrimônio não encontrado" });
        }
    } catch (err) {
        console.error(err)
        return res.status(501).json({mensagem:"Servidor Fora!"})
    }
},

buscaDocumento: async (req, res, next) => {
    const {id} = req.params;
    const resultado = await dadosModel.buscaPorId(id);

    const registro = Array.isArray(resultado) ? resultado[0] : resultado;

    if(!registro) {
        return res.status(404).send("Documento não encontrado");
    }

    let texto_pdf = String(registro.caminho_pdf);
    let texto_termo = String(registro.caminho_termo);

    req.caminho_pdf = texto_pdf ? path.join(__dirname, '..', '..', texto_pdf) : null;
    req.caminho_termo = texto_termo ? path.join(__dirname, '..', '..', texto_termo) : null;

    

    next();
},

importarPlanilha: async (req, res) => {
    if(!req.file) {
        return res.status(400).json({mensagem: "Envie uma planilha!"})
    }

    try {
        const dadosExtraidos = await importacao.ExcelService(req.file.buffer);

        
        for(const item of dadosExtraidos) {

            const situacao = (item.situacao == "Ativo") ? 1 : 2;

            await dadosModel.cadastraPatrimonio({
                patrimonio: String(item.patrimonio), 
                situacao: situacao,
                usuario: item.usuario || "Sem Usuario",
                setor: item.setor || null,
                local: item.local || null,
                item: item.item,
                marca: item.marca,
                modelo: item.modelo || null,
                informacoes: item.informacoes || null,
                caminho_termo: null,
                caminho_pdf: null,
                observacoes: item.observacao || null
            })

        }

    } catch(err) {
        console.error("ERRO AQUI:", err);
        return res.status(500).json({
            mensagem: "Erro ao processar a planilha",
            detalhe: err.message 
        });
    }
}

};