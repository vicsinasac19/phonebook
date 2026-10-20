# Phone Book Sorting Exercise

A JavaScript project for the Algorithm and Structural Foundations
assignment. This project explores data structures and algorithms
by building a phone book step by step.

## Current Features

- Store contacts in an array of objects.
- Include an ID, name, phone number, and email for each contact.
- Add contacts using an addContact function.
- Check for missing or empty names and phone numbers before adding.
- Find a contact by ID using a findContactById function.
- Display contacts in the terminal.

## Data Structure

The phone book uses an array of objects. Each object represents
one contact, and the array holds the contact collection.

Each contact has a unique ID. An ID identifies a contact, while
an array index represents its current position. Sorting can change
a contact's index without changing its ID.

## How to Run

Install Node.js, open a terminal in the project folder, and run:

    node phoneBook.js

The sample contacts and demonstration calls run automatically.
Data is stored in memory and resets each time the program runs.

## Functions Implemented

### addContact(contact)

Checks that a contact has a name and phone number, then adds
the contact to the end of the array.

### findContactById(id)

Checks contacts in sequence and returns the first matching ID.
Returns undefined if no match exists.

This is a linear search with O(n) worst-case time complexity:
it may need to check every contact.

## Planned Features

- Update contact details.
- Delete contacts by ID.
- Sort contacts by name, phone number, and email using merge sort.
- Add an interactive interface.
- Document the sorting algorithm and demonstrate its results.

## Current Progress

Contact storage, adding contacts, basic validation, and finding
contacts by ID are implemented.

Next tutorial step: implement updating a contact's phone number.