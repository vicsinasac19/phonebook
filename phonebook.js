// CONTACT STORAGE: Each object represents one contact with a permanent ID.
const contacts = [
  { id: 1, name: "Victor Sinasac", phone: "514-476-2013", email: "vic.sinasac@gmail.com" },
  { id: 2, name: "Maria Mccarthy", phone: "514-245-3179", email: "mariafrommagan@gmail.com" },
  { id: 3, name: "Alannah Mccarthy", phone: "514-404-5840", email: "mccarthyalannah@gmail.com" },
  { id: 4, name: "John Doe", phone: "514-123-4567", email: "john.doe@gmail.com" },
  { id: 5, name: "Chase", phone: "438-555-0104", email: "chase@example.com" }
];

// VALIDATION: Check required fields and the optional email before changing data.
function isValidContact(contact) {
  return (
    contact !== null &&
    typeof contact === "object" &&
    Number.isSafeInteger(contact.id) &&
    contact.id > 0 && // The ID must be greater than zero.
    typeof contact.name === "string" &&
    contact.name.trim() !== "" &&
    typeof contact.phone === "string" &&
    /\d/.test(contact.phone) &&
    (contact.email === undefined ||
      (typeof contact.email === "string" &&
        (contact.email.trim() === "" ||
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim()))))
  );
}

// ADD: Validate a contact and reject duplicate IDs before storing it.
function addContact(contact) {
  if (!isValidContact(contact)) {
    console.log("Invalid contact: use a positive integer ID, name, phone number, and optional valid email.");
    return false;
  }

  if (findContactById(contact.id)) {
    console.log("A contact with this ID already exists.");
    return false;
  }

  contacts.push({
    id: contact.id,
    name: contact.name.trim(),
    phone: contact.phone.trim(),
    email: (contact.email ?? "").trim()
  });
  return true;
}

// FIND: Check contacts one at a time and return the first matching ID.
function findContactById(id) {
  return contacts.find(contact => contact.id === id);
}

// UPDATE: Change name, phone, or email while keeping the original ID.
function updateContact(id, changes) {
  const contact = findContactById(id);

  if (!contact) {
    console.log("Contact not found.");
    return false;
  }

  // Only these fields may be updated; the ID stays unchanged.
  const allowedFields = ["name", "phone", "email"];
  if (
    !changes ||
    typeof changes !== "object" ||
    Object.keys(changes).length === 0 ||
    Object.keys(changes).some(field => !allowedFields.includes(field))
  ) {
    console.log("Provide changes to name, phone, or email.");
    return false;
  }

  // Validate a temporary copy so invalid changes cannot overwrite the contact.
  const updated = { ...contact, ...changes };
  if (!isValidContact(updated)) {
    console.log("Invalid contact: use a positive integer ID, name, phone number, and optional valid email.");
    return false;
  }

  contact.name = updated.name.trim();
  contact.phone = updated.phone.trim();
  contact.email = (updated.email ?? "").trim();
  console.log("Contact updated.");
  return true;
}

// PHONE UPDATE: Keep the function used in our earlier examples.
function updateContactPhone(id, newPhone) {
  return updateContact(id, { phone: newPhone });
}

// DELETE: Find the array position for the ID and remove exactly one contact.
function deleteContact(id) {
  const index = contacts.findIndex(contact => contact.id === id);

  // A result of minus one means there was no matching contact.
  if (index === -1) {
    console.log("Contact not found.");
    return false;
  }

  contacts.splice(index, 1);
  console.log("Contact deleted.");
  return true;
}

// MERGE HELPER: Combine two sorted arrays using the selected contact field.
function merge(left, right, sortBy = "name") {
  const result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  // Continue while BOTH halves still have a contact to compare.
  while (leftIndex < left.length && rightIndex < right.length) {
    let leftValue = left[leftIndex][sortBy] ?? "";
    let rightValue = right[rightIndex][sortBy] ?? "";

    // Phone sorting compares digits, ignoring spaces, brackets, and dashes.
    if (sortBy === "phone") {
      leftValue = leftValue.replace(/\D/g, "");
      rightValue = rightValue.replace(/\D/g, "");
    }

    // Compare text without case differences; compare phone digits numerically.
    const comparison = leftValue.localeCompare(rightValue, "en", {
      sensitivity: "base",
      numeric: sortBy === "phone"
    });

    // Zero or a negative result means the left value comes first or matches.
    if (comparison <= 0) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  // One half is empty. Append the already sorted contacts from the other.
  return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}

// MERGE SORT: Return a new array sorted by name, phone, or email.
function mergeSort(entries, sortBy = "name") {
  if (!["name", "phone", "email"].includes(sortBy)) {
    throw new Error("Sort field must be name, phone, or email.");
  }

  // One contact or fewer needs no further splitting.
  if (entries.length <= 1) {
    return entries.slice();
  }

  const middle = Math.floor(entries.length / 2);
  const left = entries.slice(0, middle);
  const right = entries.slice(middle);

  // Pass the selected field along EVERY time the function calls itself.
  const sortedLeft = mergeSort(left, sortBy);
  const sortedRight = mergeSort(right, sortBy);

  // Pass that same field to the helper when combining the sorted halves.
  return merge(sortedLeft, sortedRight, sortBy);
}

// DEMONSTRATION 1: Add two contacts and display all seven.
addContact({
  id: 6,
  name: "Ben Ruest",
  phone: "514-502-4720",
  email: "Ben.Ruest@example.com"
});
addContact({
  id: 7,
  name: "Jim Jameson",
  phone: "514-555-0107",
  email: "JJJAMESON@example.com"
});
console.log("\nAll contacts:");
console.table(contacts);

// DEMONSTRATION 2: Find a contact by ID.
console.log("\nContact with ID 3:");
console.log(findContactById(3));

// DEMONSTRATION 3: Update a phone number, then display the changed contact.
console.log("\nUpdate contact 4:");
updateContactPhone(4, "514-555-0199");
console.log(findContactById(4));

// DEMONSTRATION 4: Delete an existing contact, then try a missing ID.
console.log("\nDelete contact 4:");
deleteContact(4);
console.log("Total contacts:", contacts.length);
console.log("\nTry deleting missing contact 999:");
deleteContact(999);
console.log("Total contacts:", contacts.length);

// DEMONSTRATION 5: Display three sorted copies of the remaining six contacts.
console.log("\nContacts sorted by name:");
console.table(mergeSort(contacts, "name"));

console.log("\nContacts sorted by phone:");
console.table(mergeSort(contacts, "phone"));

console.log("\nContacts sorted by email:");
console.table(mergeSort(contacts, "email"));

// DEMONSTRATION 6: Sorting preserves the original array order.
console.log("\nOriginal contact order after sorting:");
console.table(contacts);

