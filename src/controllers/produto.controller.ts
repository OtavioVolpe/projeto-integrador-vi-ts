import { Request, Response } from "express";
import * as service from "../services/produto.service";

export const listar = async (req: Request, res: Response): Promise<void> => {
  const produtos = await service.listar();
  res.status(200).json(produtos);
};

export const buscarPorId = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  const produto = await service.buscarPorId(id);

  if (!produto) {
    res.status(404).json({ mensagem: "Produto não encontrado" });
    return;
  }

  res.status(200).json(produto);
};

export const criar = async (req: Request, res: Response): Promise<void> => {
  try {
    const produto = await service.criar(req.body);
    res.status(201).json(produto);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ mensagem: err.message });
  }
};

export const atualizar = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const produto = await service.atualizar(id, req.body);
    res.status(200).json(produto);
  } catch (error) {
    const err = error as Error;
    const status = err.message === "Produto não encontrado" ? 404 : 400;
    res.status(status).json({ mensagem: err.message });
  }
};

export const deletar = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    await service.deletar(id);
    res.status(204).send();
  } catch (error) {
    const err = error as Error;
    res.status(404).json({ mensagem: err.message });
  }
};