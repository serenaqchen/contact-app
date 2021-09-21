import * as React from "react";

import { Routes, Route, Link } from "react-router-dom";

import * as apiClient from "./apiClient";
import Contacts from "./components/Contacts";
import CreateContacts from "./components/CreateContacts";
import ViewContacts from "./components/ViewContacts";
// import ViewContacts from "./components/ViewContacts";

const App = () => (
  <main>
    <nav>
      <Link to="/">Home</Link> | <Link to="mycontacts">Contacts</Link>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mycontacts" element={<MyContacts />} />
    </Routes>
  </main>
);

const Home = () => (
  <>
    <p>Home</p>
  </>
);

const MyContacts = () => {
  const [contacts, setContacts] = React.useState([]);
  const [viewDeatails, setViewDetails] = React.useState(false);
  const [moreInfo, setMoreInfo] = React.useState({});

  const loadContacts = async () => setContacts(await apiClient.getContacts());
  const addContact = (newContact) => {
    apiClient.addContact(newContact).then(loadContacts);
  };
  const updateContact = (id, newContact) => {
    apiClient.updateContact(id, newContact).then(loadContacts);
  };
  const deleteContact = (id, newContact) => {
    apiClient.deleteContact(id, newContact).then(loadContacts);
  };

  React.useEffect(() => {
    loadContacts();
  }, []);

  return (
    <>
      <h1>My Phone Book</h1>
      <Contacts
        contacts={contacts}
        setViewDeatails={setViewDetails}
        setMoreInfo={setMoreInfo}
      />
      {viewDeatails && (
        <ViewContacts
          moreInfo={moreInfo}
          setViewDetails={setViewDetails}
          updateContact={updateContact}
          deleteContact={deleteContact}
          setMoreInfo={setMoreInfo}
        />
      )}
      <CreateContacts addContact={addContact} />
    </>
  );
};

export default App;
