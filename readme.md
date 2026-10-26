# The story behind the code

One challenge I faced was keeping track of how the merge sort functions worked together. I had added the `merge()` helper but missed the `mergeSort()` function that splits the contacts into smaller groups. Reviewing my actual code helped identify the missing piece.

The solution appeared when I compared contacts to cards: split them into smaller piles, then combined them alphabetically. Adding comments before each new section also helped me follow the logic. Next time, I would build and check one complete function at a time, with clear comments and small examples, before moving to the next step.

I also struggled with some of the symbols. I have dyslexia and the < sign and > sign I often get reversed and that caused me some struggle with errors.

I will try to limit the comments in future builds, but for now it helps me keep track of my thoughts when coding.

# Phone Book Sorting Exercise

A JavaScript console application for the Algorithm and Structural Foundations assignment.
It stores contacts, supports adding, finding, updating, and deleting them, and uses
merge sort to display contacts by name, phone number, or email.

## How to run

Install Node.js. No packages or build step are required.

Open a terminal in this repository and run:

```bash
node phonebook.js
```

The labelled demonstration calls run automatically. This is a console demonstration;
there is no interactive menu or database. Data resets each time the program runs.

## Data structure

The phone book uses an **array of contact objects**. Each object has:

| Field | Purpose |
| --- | --- |
| `id` | A unique positive integer identifying the contact |
| `name` | A required, nonblank name |
| `phone` | A required string containing at least one digit |
| `email` | An optional email address; an omitted address is stored as an empty string |

An array makes it straightforward to traverse, split, and merge the contacts.
An ID stays the same when the array is sorted or a contact is deleted.
An array index is only a contact's current position.

Phone validation is basic: it checks for a digit, not a complete international
phone-number format. Email validation is also basic. Added and updated text is trimmed.
The sample data is intended for the assignment demonstration.

## Functions

| Function | Purpose |
| --- | --- |
| `isValidContact(contact)` | Checks the ID, name, phone, and optional email |
| `addContact(contact)` | Validates and adds a contact; rejects duplicate IDs |
| `findContactById(id)` | Returns the matching contact, or `undefined` |
| `updateContact(id, changes)` | Updates name, phone, and/or email without changing the ID |
| `updateContactPhone(id, newPhone)` | Calls the general update function to change only the phone |
| `deleteContact(id)` | Removes the contact with the requested ID |
| `merge(left, right, sortBy)` | Combines two already sorted halves using the same selected field |
| `mergeSort(entries, sortBy)` | Returns a new array sorted by name, phone, or email; defaults to name |

Add, update, and delete return `true` on success and `false` on failure.
Failed validation leaves stored contacts unchanged.
A missing update or delete ID prints `Contact not found.`.
An unsupported sorting field throws an error with the allowed field names.

## Sorting plan

Think of contacts as cards with one contact on each card:

1. Divide the cards into two groups.
2. Keep dividing each group until it has one card or fewer.
3. Compare the first remaining card from each sorted group.
4. Take the card that comes first and move to the next card in that group.
5. When a group runs out, append the remaining cards from the other group.
6. Repeat the combining process until all cards form one sorted list.

The recursive calls and the merge helper all receive the same `sortBy` field.
Names and emails use an English, case-insensitive text comparison.
Phone sorting ignores punctuation and compares the remaining digits numerically;
it does not normalize country codes or extensions.
Equal values retain their original relative order, making this a stable sort.

Sorting creates a new array and preserves the original order in `contacts`.
The new array still refers to the same contact objects; it is not a deep copy.

## Examples

### Add and find a contact

```js
addContact({
  id: 8,
  name: "Alex Example",
  phone: "514-555-0108",
  email: "alex@example.com"
});
console.log(findContactById(8));
```

### Update contact details

```js
updateContact(8, {
  name: "Alex Updated",
  email: "alex.updated@example.com"
});
updateContactPhone(8, "514-555-0118");
```

### Delete a contact

```js
deleteContact(8);   // Removes Alex.
deleteContact(999); // Prints "Contact not found." and leaves the array unchanged.
```

### Sort by each supported field

```js
console.table(mergeSort(contacts));          // Name is the default.
console.table(mergeSort(contacts, "name"));
console.table(mergeSort(contacts, "phone"));
console.table(mergeSort(contacts, "email"));
```

After the included demonstration deletes John Doe, six contacts remain.
The expected display orders are:

| Sort field | Contact order |
| --- | --- |
| Name | Alannah, Ben, Chase, Jim, Maria, Victor |
| Phone | Chase, Maria, Alannah, Victor, Ben, Jim |
| Email | Ben, Chase, Jim, Maria, Alannah, Victor |

To try these examples, place calls at the bottom of `phonebook.js`.
Run the add example before the update and delete examples.

## Efficiency in plain language

Here, **n means the number of contacts**. These bounds treat contact field lengths
as bounded; comparing unusually long strings also takes work.

| Operation | Complexity | Meaning |
| --- | --- | --- |
| Merge sort | O(n log n) time | Processes the contacts over several rounds of splitting and combining |
| Extra sorting memory | O(n) space | Uses temporary arrays whose peak storage grows in proportion to the contact count |
| Find, update, or delete by ID | O(n) worst-case time | May check every contact; deleting may also shift remaining array items |
| Add with duplicate-ID check | O(n) worst-case time | Checks existing IDs before adding the new contact |

Merge sort is suitable for large lists because its worst-case sorting time is
O(n log n). The recursion also uses an O(log n) call stack, within the O(n)
overall auxiliary-space bound.

## Verification

The completed version was syntax-checked and run with Node.js. Nineteen additional
checks passed, covering:

- Sorting by all three fields and preserving original array order.
- Empty and single-contact arrays, equal values, missing emails, and phone punctuation.
- Invalid sorting fields.
- Duplicate IDs, blank names, and phones without digits.
- Adding contacts with an optional email and trimming input.
- Updating all supported fields and rejecting invalid updates or ID changes.
- Existing and missing IDs for updates and deletion.

These additional checks were run during development; no separate test runner is
included in this repository. The labelled calls in `phonebook.js` provide the
runnable demonstration.

