const express = require('express');
const sequelize = require('./config/database');
const path = require('path');

require('dotenv').config();

const app = express();

app.use(express.json());

const usuarioRoutes = require('./routes/usuarioRoutes');
const authRoutes = require('./routes/authRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const movimentacaoRoutes = require('./routes/movimentacaoRoutes');

app.use(usuarioRoutes);
app.use(authRoutes);
app.use(produtoRoutes);
app.use(movimentacaoRoutes);

sequelize
    .authenticate()
    .then(() => console.log('Conectado ao banco de dados'))
    .catch(err => console.error('Erro ao conectar:', err));

    sequelize.sync();

app.listen(3000, () =>
    console.log('Servidor rodando na porta 3000')
);