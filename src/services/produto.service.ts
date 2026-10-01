import { ProdutoModel, ProdutoAttributes } from "../models/produto.model";

export async function listar(): Promise<ProdutoAttributes[]> {
  return await ProdutoModel.findAll();
}

export async function buscarPorId(id: number): Promise<ProdutoAttributes | null> {
  return await ProdutoModel.findByPk(id);
}

export async function criar(dados: { nome?: string; preco?: number }): Promise<ProdutoAttributes> {
  if (!dados.nome || dados.preco == null) {
    throw new Error("nome e preco são obrigatórios");
  }
  return await ProdutoModel.create({ nome: dados.nome, preco: dados.preco });
}

export async function atualizar(id: number, dados: { nome?: string; preco?: number }): Promise<ProdutoAttributes> {
  const produto = await ProdutoModel.findByPk(id);
  if (!produto) {
    throw new Error("Produto não encontrado");
  }
  if (!dados.nome || dados.preco == null) {
    throw new Error("nome e preco são obrigatórios para atualização");
  }

  produto.nome = dados.nome;
  produto.preco = dados.preco;
  await produto.save();
  return produto;
}

export async function deletar(id: number): Promise<boolean> {
  const produto = await ProdutoModel.findByPk(id);
  if (!produto) {
    throw new Error("Produto não encontrado");
  }
  await produto.destroy();
  return true;
}