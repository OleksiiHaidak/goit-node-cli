import { program } from "commander";
import * as contactsActions from "./contacts.js";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contactsActions.listContacts();
      return console.table(allContacts);
      break;

    case "get":
      const getContact = await contactsActions.getContactById(id);
      return console.log(getContact);
      break;

    case "add":
      const addContact = await contactsActions.addContact(name, email, phone);
      return console.log(addContact);
      break;

    case "remove":
      const removeContact = await contactsActions.removeContact(id);
      return console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);