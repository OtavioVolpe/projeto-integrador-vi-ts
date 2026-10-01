import request from "supertest";
import app from "../app";
import { sequelize } from "../config/database";

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

beforeEach(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("CRUD de Produtos", () => {
  it("deve criar um produto com sucesso (POST)", async () => {
    const res = await request(app)
      .post("/produtos")
      .send({ nome: "Teclado", preco: 150 });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.nome).toBe("Teclado");
  });

  it("deve falhar ao criar produto sem nome ou preco (POST)", async () => {
    const res = await request(app)
      .post("/produtos")
      .send({ preco: 150 });

    expect(res.status).toBe(400);
    expect(res.body.mensagem).toBe("nome e preco são obrigatórios");
  });

  it("deve listar todos os produtos (GET)", async () => {
    await request(app).post("/produtos").send({ nome: "Mouse", preco: 80 });

    const res = await request(app).get("/produtos");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });

  it("deve buscar um produto por ID existente (GET)", async () => {
    const criado = await request(app).post("/produtos").send({ nome: "Monitor", preco: 900 });

    const res = await request(app).get(`/produtos/${criado.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.nome).toBe("Monitor");
  });

  it("deve retornar 404 ao buscar ID inexistente (GET)", async () => {
    const res = await request(app).get("/produtos/999");
    expect(res.status).toBe(404);
  });

  it("deve atualizar um produto (PUT)", async () => {
    const criado = await request(app).post("/produtos").send({ nome: "Teclado", preco: 150 });

    const res = await request(app)
      .put(`/produtos/${criado.body.id}`)
      .send({ nome: "Teclado Mecânico", preco: 200 });

    expect(res.status).toBe(200);
    expect(res.body.nome).toBe("Teclado Mecânico");
  });

  it("deve falhar ao atualizar produto sem dados (PUT)", async () => {
    const criado = await request(app).post("/produtos").send({ nome: "Teclado", preco: 150 });

    const res = await request(app)
      .put(`/produtos/${criado.body.id}`)
      .send({ nome: "" });

    expect(res.status).toBe(400);
  });

  it("deve retornar 404 ao atualizar produto inexistente (PUT)", async () => {
    const res = await request(app)
      .put("/produtos/999")
      .send({ nome: "Teste", preco: 10 });

    expect(res.status).toBe(404);
  });

  it("deve deletar um produto (DELETE)", async () => {
    const criado = await request(app).post("/produtos").send({ nome: "Headset", preco: 300 });

    const res = await request(app).delete(`/produtos/${criado.body.id}`);
    expect(res.status).toBe(204);
  });

  it("deve retornar 404 ao deletar produto inexistente (DELETE)", async () => {
    const res = await request(app).delete("/produtos/999");
    expect(res.status).toBe(404);
  });

  it("deve falhar ao atualizar produto se faltar preco (PUT)", async () => {
    const criado = await request(app).post("/produtos").send({ nome: "Mouse", preco: 50 });

    const res = await request(app)
        .put(`/produtos/${criado.body.id}`)
        .send({ nome: "Mouse Gamer" });

    expect(res.status).toBe(400);
    expect(res.body.mensagem).toBe("nome e preco são obrigatórios para atualização");
    });
});