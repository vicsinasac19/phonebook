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
// Update a contact's phone number using their unique ID.
function updateContactPhone(id, newPhone) {
  const contact = findContactById(id);

  if (!contact) {
    console.log("Contact not found.");
    return;
  }

  if (typeof newPhone !== "string" || newPhone.trim() === "") {
    console.log("A phone number is required.");
    return;
  }

  contact.phone = newPhone.trim();
  console.log("Phone number updated.");
}
updateContactPhone(4, "514-555-0199");

console.log(findContactById(4));
console.log("Total contacts:", contacts.length);
function deleteContact(id) {
  const index = contacts.findIndex(contact => contact.id === id);

  if (index === -1) {
    console.log("Contact not found.");
    return;
  }

  contacts.splice(index, 1);
  console.log("Contact deleted.");
}
deleteContact(4);
console.table(contacts);
console.log("Total contacts:", contacts.length);

deleteContact(999);
console.log("Total contacts:", contacts.length);
// STEP 1: Find the halfway point of the contacts array
const middle = Math.floor(contacts.length / 2);

// STEP 2: Copy contacts before the halfway point into the left half
const left = contacts.slice(0, middle);

// STEP 3: Copy contacts from the halfway point onward into the right half
const right = contacts.slice(middle);

// STEP 4: Display both halves to check the split
console.table(left);
console.table(right);
// MERGE HELPER: Combine two sorted arrays alphabetically by name
function merge(left, right) {
  // Store the contacts in their sorted order
  const result = [];

  // Track our current position in each half
  let leftIndex = 0;
  let rightIndex = 0;

  // NEW: Keep comparing while both halves still have contacts
  while (leftIndex < left.length && rightIndex < right.length) {
    // Compare the current names alphabetically
    const comparison = left[leftIndex].name.localeCompare(
      right[rightIndex].name
    );

    // If the left name comes first or the names match, take the left contact
    if (comparison <= 0) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      // Otherwise, take the right contact
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  // NEW: Append any contacts remaining in either half
  return result.concat(
    left.slice(leftIndex),
    right.slice(rightIndex)
  );
}
// NEW: Split the contacts, sort each half, and merge them together
function mergeSort(entries) {
  // Stop splitting when the array has one contact or fewer
  if (entries.length <= 1) {
    return entries;
  }

  // Find the halfway point of this array
  const middle = Math.floor(entries.length / 2);

  // Copy this array into two halves
  const left = entries.slice(0, middle);
  const right = entries.slice(middle);

  // Repeat the process on each half
  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);
    // NEW: Merge the sorted halves and return the combined array
  return merge(sortedLeft, sortedRight);

  // Use your existing helper to combine the sorted halves
  return merge(sortedLeft, sortedRight);
}


// NEW: Display a copy of the contacts sorted by name
console.log("Contacts sorted by name:");
console.table(mergeSort(contacts));
