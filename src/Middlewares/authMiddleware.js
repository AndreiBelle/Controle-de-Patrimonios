const jwt = require('jsonwebtoken');


const verificarToken = (req, res, next) => {
    
    const authHeader = req.headers['authorization'];
    
    
    const token = authHeader && authHeader.split(' ')[1];

    
    if (!token) {
        return res.status(401).json({ mensagem: 'Acesso negado! Faça login.' });
    }

    try {
        
        const verificado = jwt.verify(token, process.env.CHAVE_TOKEN_JWT);
        
        
        req.usuario = verificado;
        
        
        next(); 
    } catch (err) {
        res.status(403).json({ mensagem: 'Token inválido ou expirado!' });
    }
};

module.exports = verificarToken;