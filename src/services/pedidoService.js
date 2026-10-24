let pedidos = [];
let nextId = 1;

const estadosValidos = ["recebido", "em_preparacao", "enviado", "entregue", "cancelado"];

const criarPedido = (dados) => {
  const { cliente, tipo, valor, prioridade } = dados;

  if (!cliente || typeof cliente !== "string" || cliente.trim() === "") {
    throw { status: 400, message: "O campo 'cliente' é obrigatório e não pode ser vazio." };
  }
  if (valor === undefined || typeof valor !== "number" || valor <= 0) {
    throw { status: 400, message: "O campo 'valor' deve ser numérico e maior que zero." };
  }
  if (!tipo || typeof tipo !== "string") {
    throw { status: 400, message: "O campo 'tipo' é obrigatório." };
  }
  if (!prioridade || typeof prioridade !== "string") {
    throw { status: 400, message: "O campo 'prioridade' é obrigatório." };
  }

  const novoPedido = {
    id: nextId++,
    cliente: cliente.trim(),
    tipo,
    valor,
    prioridade,
    status: "recebido"
  };

  pedidos.push(novoPedido);
  return novoPedido;
};

const listarPedidos = () => {
  return pedidos;
};

const buscarPedidoPorId = (id) => {
  const pedidoId = Number(id);
  const pedido = pedidos.find(p => p.id === pedidoId);
  if (!pedido) {
    throw { status: 404, message: "Pedido não encontrado." };
  }
  return pedido;
};

const atualizarStatus = (id, novoStatus) => {
  const pedidoId = Number(id);
  const pedido = pedidos.find(p => p.id === pedidoId);
  
  if (!pedido) {
    throw { status: 404, message: "Pedido não encontrado." };
  }

  if (!novoStatus || !estadosValidos.includes(novoStatus)) {
    throw { status: 400, message: `Status inválido. Estados permitidos: ${estadosValidos.join(", ")}` };
  }

  pedido.status = novoStatus;
  return pedido;
};

module.exports = {
  criarPedido,
  listarPedidos,
  buscarPedidoPorId,
  atualizarStatus
};
