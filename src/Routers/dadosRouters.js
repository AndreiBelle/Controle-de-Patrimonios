require('dotenv').config()
const verificarToken = require('../Middlewares/authMiddleware');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const dadosController = require('../Controller/dadosController');
const path = require('path'); //'path' ajuda o Node a não se perder nas pastas
const fs = require('fs')

const storageTemp = multer.memoryStorage();
const uploadTemp = multer({storage:storageTemp});

const storage = multer.diskStorage({
    destination: (req, file, cd) => {

        let folder = 'uploads/';

        if(file.fieldname === 'caminho_pdf') {
            folder = 'uploads/notas/';
        }

        if(file.fieldname === 'caminho_termo') {
            folder = 'uploads/termos/'
        }

        cd(null, folder);

    },

    filename: (req, file, cd) => {
        const nome = Date.now() + '-' + file.originalname;
        cd(null, nome)
    }
})

const upload = multer ({storage : storage})


router.get('/patrimonios', (req, res) => {

    res.sendFile(path.join(__dirname, '..', '..', 'public', 'views', 'index.html'))

});

router.get('/cadastrar-patrimonio', (req,res) => {

    // res.sendFile: Comando para enviar um arquivo inteiro
    // path.join: Junta os pedaços do caminho para evitar erros entre Windows e Linux
    // __dirname: Pega o local onde este arquivo (dadosRouters.js) está agora
    // '..', '..': Comando para "voltar" duas pastas (sair de Routers e sair de src)
    // 'public', 'views', 'index.html': Entra na pasta onde está seu arquivo
    
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'views', 'cadastro.html'));
})

router.get('/editar/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'views', 'editar.html'));
})

router.get('/estoque', (req, res) => {
    res.sendFile(path.join('..', '..', 'public', 'views', 'estoque.html'));
})

router.get('/importacao-back', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'views', 'importacao.html'));
})

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'views', 'login.html'));
})

// router.get('/importacao-back', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', '..', 'public', 'views', 'importacao.html'));
// })

router.get('/patrimonios-backListar', verificarToken, dadosController.listaPatrimonios);
router.get('/patrimonios-back/:id', verificarToken, dadosController.buscarPorId);
router.post('/patrimonios-back',upload.fields([{name: 'caminho_pdf', maxCount: 1}, {name: 'caminho_termo', maxCount: 1}]), verificarToken, dadosController.criarPatrimonios);
router.put('/patrimonios-editar-back/:id',upload.single('caminho_termo'), verificarToken, dadosController.editarPatrimonios);
router.delete('/patrimonios-deletar-back/:id', verificarToken, dadosController.deletarPatrimonio);

router.post('/importacao', uploadTemp.single('excel'), verificarToken, dadosController.importarPlanilha);

router.get('/ver-pdf/:id', dadosController.buscaDocumento, (req, res) => {

    console.log(req.caminho_pdf)

    if(!fs.existsSync(req.caminho_pdf)) {
        return res.status(404).send("Arquivo não encontrado no servidor.");
    }

    const stat = fs.statSync(req.caminho_pdf);
    
    res.writeHead(200, {
        'Content-Type' : 'application/pdf',
        'content-Length' : stat.size
    })

    const readStream = fs.createReadStream(req.caminho_pdf);

    readStream.pipe(res);
})

router.get('/ver-termo/:id', dadosController.buscaDocumento, (req, res) => {

    console.log(req.caminho_termo)

    if(!fs.existsSync(req.caminho_termo)) {
        return res.status(404).send("Arquivo não encontrado no servidor.");
    }

    const stat = fs.statSync(req.caminho_termo);
    
    res.writeHead(200, {
        'Content-Type' : 'application/pdf',
        'content-Length' : stat.size
    })

    const readStream = fs.createReadStream(req.caminho_termo);

    readStream.pipe(res);
})

router.post('/cadastro-back', dadosController.cadastroUsuario);
router.post('/login-back', dadosController.loginUsuario)



module.exports = router;