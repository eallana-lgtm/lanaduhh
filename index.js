app.use(express.json());
app.post('/api/lista',(req, res) => {
  const novaObra = req.body;
  lista.push(novaObra);
  res.jsom({ status: "sucesso" });
});
app.post('/api/lista',(req, res) => {
  res.json(lista);
});
