import { Request, Response } from "express";
import { Types } from "mongoose";

import { HttpError, ctrlWrapper } from "helpers";
import { IAddContact, IGetAll, IGetByID, IUpdateFavorite } from "interfaces";
import Contact from "models/contact-model";

interface IRequest extends Request {
  user?: { _id?: Types.ObjectId };
}

const getAll = async (req: IRequest, res: Response): Promise<void> | never => {
  const { _id: owner } = req.user ?? {};
  const { page = 1, limit = 20 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);
  const result: Array<IGetAll> = await Contact.find(
    { owner },
    "-createdAt -updatedAt",
    {
      skip,
      limit: Number(limit),
    }
  ).populate("owner", "email");
  res.json(result);
};

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result: IGetByID | null = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};

const addContact = async (
  req: IRequest,
  res: Response
): Promise<void | never> => {
  const { _id: owner } = req.user ?? {};
  const result: IAddContact = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deleteContact = async (
  req: Request,
  res: Response
): Promise<void | never> => {
  const { id } = req.params;
  const result: IAddContact | null = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json({
    message: "contact successfully deleted",
  });
};

const updateById = async (
  req: Request,
  res: Response
): Promise<void | never> => {
  const { id } = req.params;
  const result: IAddContact | null = await Contact.findByIdAndUpdate(
    id,
    req.body,
    { new: true }
  );
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(result);
};

const updateFavorite = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result: IUpdateFavorite | null = await Contact.findByIdAndUpdate(
    id,
    req.body,
    { new: true }
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

export const contactsController = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
};
