window.onload = init;

// The contact manager as a global variable
let contactManager; 

function init() { 
	// create an instance of the contact manager
	contactManager = new MyContactsManager();
	
  	// contactManager.addTestData();
  	// contactManager.printContactsToConsole();

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

  // Get the contacts values
//   get name() {
//     return this.name;
//   }

//   get age() {
//     return this.age;
//   }

//   get phonenumber() {
//     return this.phonenumber;
//   }

//   get address() {
//     return this.address;
//   }

//   // Set the contact values
//   set name(newName) {
//     this.name = newName;
//   }

//   set age(newAge) {
//     this.age = newAge;
//   }

//   set phonenumber(newPhonenumber) {
//     this.phonenumber = newPhonenumber;
//   }

//   set address(newAddress) {
//     this.address = newAddress;
//   }

  
}

class MyContactsManager {
    constructor () {
        this.contactsList = [];
        alert('MyContactsManager created');
    }

    
    // Erase all contacts
    empty () {
        this.contactsList = [];
    }

    // add a contact
    add (contact) {
        this.contactsList.push(contact);
        this.save();
        alert(this.contactsList.length);
    }

    // Remove contact
    remove (contact) {
        for (let i = 0; i < this.contactsList.length; i++) {
            var d = this.contactsList[i];

            if (d.email === contact.email) {
                // remove at index i
                this.contactsList.splice(i, i);
                // stop
                break;
            }
        }
    }

    // Sort the contact list
    sort () {
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
		this.contactsList.forEach(function(c) {
			console.log(c.name);
		});
	}
	
	load() {
		if(localStorage.contacts !== undefined) {
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

		
		if(this.contactsList.length === 0) {
			container.innerHTML = "<li>No contacts to display!</li>";
			// stop the execution of this method
			return;
		}  
  
    	         
    	// iterate on the array of users
    	this.contactsList.forEach(function(currentContact) {
            // creates a list item
            var list = document.createElement("li");
            // 
        	list.appendChild(document.createTextNode(currentContact.name));
            container.appendChild(list);   
     	    
			
     	});
  
     	
  	}
}



Contact.numberCreated = 0;
