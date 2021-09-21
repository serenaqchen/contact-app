import dotenv from "dotenv";
import pgp from "pg-promise";

const db = initDb();

export const getContacts = () => db.any("SELECT * FROM contacts");

export const addContact = (newContact) =>
  db.one(
    "INSERT INTO contacts(first_name, last_name, email, phone, notes) VALUES($1, $2, $3, $4, $5) RETURNING *",
    [
      newContact.first_name,
      newContact.last_name,
      newContact.email,
      newContact.phone,
      newContact.notes,
    ],
  );

export const updateContact = (contactID, updateContact) =>
  db.one(
    "UPDATE contacts SET first_name = $1, last_name = $2, email = $3, phone = $4, notes = $5 WHERE contact_id = $6 RETURNING *",
    [
      updateContact.first_name,
      updateContact.last_name,
      updateContact.email,
      updateContact.phone,
      updateContact.notes,
      contactID,
    ],
  );

export const deleteContact = (contactID) =>
  db.one("DELETE FROM contacts WHERE contact_id = $1 RETURNING *", contactID);

function initDb() {
  let connection;

  if (process.env.DATABASE_URL === undefined) {
    dotenv.config({ path: "../.env" });
    connection = {
      user: "postgres",
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: 5442,
    };
  } else {
    connection = {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    };
  }

  return pgp()(connection);
}
