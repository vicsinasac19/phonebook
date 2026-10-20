const contacts = [
    {
        id: 1,
        name: 'Victor Sinasac',
        phone: '514-476-2013',
        email: 'vic.sinasac@gmail.com',
    },
    {
        id: 2,
        name: 'Maria Mccarthy',
        phone: '514-245-3179',
        email: 'mariafrommagan@gmail.com',
    },
    {
        id: 3,
        name: 'Alannah Mccarthy',
        phone: '514-404-5840',
        email: 'mccarthyalannah@gmail.com',
    },
    {
        id: 4,
        name: 'John Doe',
        phone: '514-123-4567',
                email: 'john.doe@gmail.com',
        },
];

    contacts.push({
    id: 5,
    name: 'Chase',
    phone: '438-555-0104',
    email: 'chase@example.com',
});

console.table(contacts);
function addContact(contact) {
  // Stop if the contact is missing or either required field is blank.
  if (
    !contact ||
    typeof contact.name !== 'string' ||
    !contact.name.trim() ||
    typeof contact.phone !== 'string' ||
    !contact.phone.trim()
  ) {
    console.error('A name and phone number are required.');
    return false;
  }

  contacts.push(contact);
  return true;
}
addContact({
  id: 6,
  name: "Ben Ruest",
  phone: "514-502-4720",
  email: "Ben.Ruest@example.com"
});

console.table(contacts);
addContact({
  id: 7,
  name: "Jim Jameson",
  phone: "514-555-0107",
  email: "JJJAMESON@example.com"
});

console.log(contacts.length);
// Find a contact by its unique ID.
function findContactById(id) {
  return contacts.find(contact => contact.id === id);
}
// Call the function and display the result.
console.log(findContactById(3));