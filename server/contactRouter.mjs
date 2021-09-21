import express from "express";

import * as db from "./db.mjs";

const contactRouter = express.Router();

contactRouter.get("/", async (request, response) => {
  const contacts = await db.getContacts();
  response.json(contacts);
});

contactRouter.use(express.json());
contactRouter.post("/", async (request, response) => {
  const contact = await db.addContact(request.body);
  response.status(201).json(contact);
});

contactRouter.post("/updateID:contactID", async (request, response) => {
  const contactID = request.params.contactID;
  const contact = await db.updateContact(contactID, request.body);
  response.status(201).json(contact);
});

contactRouter.delete("/deleteID:contactID", async (request, response) => {
  const contactID = request.params.contactID;
  const contact = await db.deleteContact(contactID);
  response.status(201).json(contact);
});

export default contactRouter;
