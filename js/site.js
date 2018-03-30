window.onload = init;

// The contact manager as a global variable
let contactManager;

function init() {
    // create an instance of the contact manager
    contactManager = new MyContactsManager();

    // Load any stored contacts information
    contactManager.load();

    // Display contacts in a table
    // Pass the id of the HTML element that will contain the table
    contactManager.displayContactsAsList("contact-list");
}

function addNewContact() {
    // Get the values from input fields
    let name = document.querySelector("#name");
    let email = document.querySelector("#email");
    let age = document.querySelector('#age');
    let phonenumner = document.querySelector('#phonenumber');
    let address = document.querySelector('#address');

    let newContact = new Contact(name.value, age.value, email.value, phonenumber.value, address.value);
    contactManager.add(newContact);
    // Empty the input fields
    name.value = "";
    email.value = "";
    age.value = "";
    phonenumber.value = "";
    address.value = "";
    // refresh the table
    contactManager.displayContactsAsList("contact-list");
    // do not let your browser submit the form using HTTP
    // return false;
}

function emptyList() {
    contactManager.empty();
    contactManager.displayContactsAsList("contact-list");
}

function loadList() {
    contactManager.load();
    contactManager.displayContactsAsList("contact-list");
}

function details(number) {
    contactManager.details(number);
}

function edit(contactNum) {
    contactManager.edit(contactNum);
}

function remove(contactNum) {
    contactManager.remove(contactNum);
}


class Contact {
    constructor(name, age, email, phonenumber, address) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.phonenumber = phonenumber;
        this.address = address;
        // Static property
        Contact.numberCreated++;
        alert('Contacts created');
    }

    // Static method
    static getContactsObjNum() {
        return numberCreated;
    }

}

class MyContactsManager {
    constructor() {
        this.contactsList = [];
        alert('MyContactsManager created');
    }


    // Erase all contacts
    empty() {
        this.contactsList = [];
    }

    // add a contact
    add(contact) {

        if (this.contactsList.length > 0) {
            alert('inside add function')
            // Check for duplicates
            for (let c of this.contactsList) {
                if (contact.email === c.email ||
                    contact.phonenumber === c.phonenumber
                ) {
                    alert('This email is already registered!');
                    return;
                } else {
                    this.contactsList.push(contact);
                    this.save();
                    break;
                }
            }
        } else {
            alert('No contacts will add new one now');
            this.contactsList.push(contact);
            this.save();
        }



        // alert(this.contactsList.length);
    }

    details(number) {
        // Load the contacts
        this.load();

        let name = document.querySelector("#ename");
        let email = document.querySelector("#eemail");
        let age = document.querySelector('#eage');
        let phonenumber = document.querySelector('#ephonenumber');
        let address = document.querySelector('#eaddress');

        // Empty the input fields
        name.value = "";
        email.value = "";
        age.value = "";
        phonenumber.value = "";
        address.value = "";
        // Then load them with the contacts 
        // information
        for (let c of this.contactsList) {
            // Identify the clicked element
            if (number == c.phonenumber) {
                // now set the values of the 
                // input fields
                name.value = c.name;
                email.value = c.email;
                age.value = c.age;
                phonenumber.value = c.phonenumber;
                address.value = c.address;
                break;
            }
        }



    }



    // Remove contact
    remove(contactNum) {
        alert('remove');
        let ename = document.querySelector("#ename");
        let eemail = document.querySelector("#eemail");
        let eage = document.querySelector('#eage');
        let ephonenumber = document.querySelector('#ephonenumber');
        let eaddress = document.querySelector('#eaddress');
        this.load();

        alert(this.contactsList.length);

        for (let i = 0; i < this.contactsList.length; i++) {
            var c = this.contactsList[i];

            if (c.phonenumber === contactNum) {
                this.contactsList.splice(i, 1);
                if (ephonenumber.value === contactNum) {
                    alert('inside if for clearing');
                    // Empty the input fields
                    ename.value = "";
                    eemail.value = "";
                    eage.value = "";
                    ephonenumber.value = "";
                    eaddress.value = "";
                }
                this.save();
                break;
            }

        }

        
        this.displayContactsAsList("contact-list");
    }

    edit(contact) {
        alert('edit');
    }

    // Sort the contact list
    sort() {
        this.conatctsList.sort(MyContactsManager.compareByName);
    }

    static compareByName(name1, name2) {
        if (name1 < name2) {
            return -1;
        }

        if (name1 > name2) {
            return 1;
        }

        return 0;
    }

    printContactsToConsole() {
        this.contactsList.forEach(function (c) {
            console.log(c.name);
        });
    }

    load() {
        if (localStorage.contacts !== undefined) {
            // the array of contacts is saved in JSON, let's convert
            // it back to a reak JavaScript object.
            this.contactsList = JSON.parse(localStorage.contacts);
        }
    }

    save() {
        // We can only save strings in local Storage. So, let's convert
        // our array of contacts to JSON
        localStorage.contacts = JSON.stringify(this.contactsList);
    }

    displayContactsAsList(idOfContainer) {
        // empty the container that contains the results
        let container = document.querySelector("#" + idOfContainer);
        container.innerHTML = "";


        if (this.contactsList.length === 0) {
            container.innerHTML = "<li>No contacts to display!</li>";
            // stop the execution of this method
            return;
        }


        // iterate on the array of users
        this.contactsList.forEach(function (currentContact) {
            // creates a list item
            var list = document.createElement("li");
            list.innerHTML = "<li class='contact-name-box'>" +
                currentContact.name + " " + "<button onclick='details(" + JSON.stringify(currentContact.phonenumber) + ");'>Details</button>" + " " +
                "<button onclick='edit(" + JSON.stringify(currentContact.phonenumber) + ");'>Edit</button>" + " " +
                "<button onclick='remove(" + JSON.stringify(currentContact.phonenumber) + ")'>Delete</button></li>";
            container.appendChild(list);


        });


    }
}



Contact.numberCreated = 0;