# Phone Book Sorting Exercise

A JavaScript project for the Algorithm and Structural Foundations
assignment, built step by step to practise data structures and algorithms.

## Data Structure

Contacts are stored in an array of objects. Each contact contains:
- ID
- Name
- Phone number
- Email address

An ID identifies a contact. An index represents its current array
position, which can change after deletion or sorting.

Data is stored in memory and resets whenever the program runs.

## How to Run

Install Node.js, open a terminal in the project folder, and run:

```bash
node phonebook.js
```

The demonstration calls run automatically and display their results
in the terminal.

## Implemented Functions

- `addContact(contact)`: validates the required name and phone number,
  then adds the contact.
- `findContactById(id)`: returns the matching contact, or undefined.
- `updateContactPhone(id, newPhone)`: validates and updates a contact's
  phone number.
- `deleteContact(id)`: finds and removes a contact by ID. If the ID
  does not exist, the array remains unchanged.
- `merge(left, right)`: combines two sorted arrays alphabetically by name.
- `mergeSort(entries)`: recursively splits the array and uses the merge
  helper to return a sorted copy.

## Sorting Example

```js
console.table(mergeSort(contacts));
```

Displays contacts alphabetically by name without changing the order
of the original contacts array.

## Algorithm Efficiency

Merge sort splits the array until each piece contains one contact
or fewer, then merges the pieces into sorted order.

- Sorting time: O(n log n).
- Auxiliary space: O(n).
- Finding, updating, and deleting by ID: O(n) worst-case time.

## Next Steps

- Finish passing a selected sorting field through both sorting functions.
- Demonstrate sorting by phone number and email.
- Review validation and documentation before submission.

## Resume Point

Deletion and merge sort by name are working.
The next tutorial step is to finish support for selecting the sort field.