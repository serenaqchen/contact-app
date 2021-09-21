export const getContacts = () => _get("/api/contacts");

export const addContact = (newContact) => _post("/api/contacts", newContact);

export const updateContact = (id, newContact) =>
  _update(`/api/contacts/updateID${id}`, newContact);

export const deleteContact = (id) => _delete(`/api/contacts/deleteID${id}`);

const _get = async (url) => (await fetch(url)).json();

const _post = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let result;
  try {
    result = await response.json();
  } catch {}

  return result;
};

const _update = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let result;
  try {
    result = await response.json();
  } catch {}

  return result;
};

const _delete = async (url) => {
  const response = await fetch(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  let result;
  try {
    result = await response.json();
  } catch {}

  return result;
};
