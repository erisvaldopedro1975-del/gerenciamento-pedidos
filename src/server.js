const express = require("express");
const pedidoRoutes = require("./routes/pedidoRoutes");

const app = express();
app.use(express.json());

app.use("/", pedidoRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ erro: "Erro interno inesperado no servidor." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
