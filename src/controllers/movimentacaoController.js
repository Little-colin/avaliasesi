const Movimentacao = require('../models/Movimentacao');
const Produto = require('../models/Produto');

async function cadastrar(req, res) {
    try {
        const { produto_id, tipo, quantidade } = req.body;

        const produto = await Produto.findByPk(produto_id);

        if (!produto) {
            return res.status(404).json({
                mensagem: 'Produto não encontrado',
            });
        }

        if (tipo === 'saida' && produto.quantidade_estoque < quantidade) {
            return res.status(400).json({
            mensagem: 'Saída não permitida: estoque insuficiente. disponível: ' + produto.quantidade_estoque + '. Solicitado: ' + quantidade,
            });
        }

        if (quantidade > 0) {
            const novaQuantidade =
            tipo === 'entrada'
                ? produto.quantidade_estoque + quantidade
                : produto.quantidade_estoque - quantidade;

        await produto.update({
            quantidade_estoque: novaQuantidade,
        });
        } else {
            return res.status(400).json({
                mensagem: 'Quantidade imprópria para movimentação',
            });
        }

        

        const movimentacao = await Movimentacao.create({
            produto_id,
            tipo,
            quantidade,
            usuario_id: req.usuario.id,
        });

        res.status(201).json(movimentacao);
    } catch (erro) {
        res.status(400).json({
            mensagem: 'Erro ao cadastrar movimentação',
            erro: erro.message,
        });
    }
}

module.exports = { cadastrar };