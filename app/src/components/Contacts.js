import React from "react";

//Renders a list with all your contacts
function Contacts({ contacts, setViewDeatails, setMoreInfo }) {
  let handleMoreInfo = (contact) => {
    setViewDeatails(true);
    setMoreInfo(contact);
  };

  const listOfContacts = contacts.map((contact) => (
    <ContactsList
      key={contact.contact_id}
      handleMoreInfo={handleMoreInfo}
      contact={contact}
    />
  ));

  return (
    <section id="listOfContacts" className="center">
      <p>{listOfContacts}</p>
    </section>
  );
}

function ContactsList({ contact, handleMoreInfo }) {
  return (
    <div>
      <button className="contactButton" onClick={(e) => handleMoreInfo(contact)}>
        {contact.first_name} {contact.last_name}
      </button>
      <br />
    </div>
  );
}

export default Contacts;
