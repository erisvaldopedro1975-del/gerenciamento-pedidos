const pedidoService = require("../services/pedidoService");

const criar = (req, res) => {
  try {
    const novoPedido = pedidoService.criarPedido(req.body);
    return res.status(201).json(novoPedido);
  } catch (error) {
    return res.status(error.status || 500).json({ erro: error.message });
  }
};

const listar = (req, res) => {
  try {
    const lista = pedidoService.listarPedidos();
    return res.status(200).json(lista);
  } catch (error) {
    return res.status(500).json({ erro: "Erro interno no servidor." });
  }
};

const buscarPorId = (req, res) => {
  try {
    const pedido = pedidoService.buscarPedidoPorId(req.params.id);
    return res.status(200).json(pedido);
  } catch (error) {
    return res.status(error.status || 500).json({ erro: error.message });
  }
};

const atualizarStatusPedido = (req, res) => {
  try {
    const { status } = req.body;
    const pedidoAtualizado = pedidoService.atualizarStatus(req.params.id, status);
    return res.status(200).json(pedidoAtualizado);
  } catch (error) {
    return res.status(error.status || 500).json({ erro: error.message });
  }
};

module.exports = {
  criar,
  listar,
  buscarPorId,
  atualizarStatusPedido
};
