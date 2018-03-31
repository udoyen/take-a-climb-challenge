window.onload = init;

// The contact manager as a global variable
let contactManager;

/**
 * Init function
 */
function init() {
  // create an instance of the contact manager
  contactManager = new MyContactsManager();

  // Load any stored contacts information
  contactManager.load();

  // Display contacts in a table
  // Pass the id of the HTML element that will contain the table
  contactManager.displayContactsAsList("contact-list");
}

/**
 * Helper function to add new contacts
 */
function addNewContact() {
  // Get the values from input fields
  let name = document.querySelector("#name");
  let email = document.querySelector("#email");
  let age = document.querySelector("#age");
  let phonenumner = document.querySelector("#phonenumber");
  let address = document.querySelector("#address");

  if (!inputChecker()) {
    alert('Empty fields are not allowed!');
    return
  }

  let newContact = new Contact(
    contactManager.trim(name.value),
    contactManager.trim(age.value),
    contactManager.trim(email.value),
    contactManager.trim(phonenumber.value),
    contactManager.trim(address.value)
  );
  contactManager.add(newContact);
  // Empty the input fields
  name.value = "";
  email.value = "";
  age.value = "";
  phonenumber.value = "";
  address.value = "";
  // refresh the list
  contactManager.displayContactsAsList("contact-list");

}

/**
 * Helper function
 */
function inputChecker() {
  // Get the values from input fields
  let name = document.querySelector("#name");
  let email = document.querySelector("#email");
  let age = document.querySelector("#age");
  let phonenumner = document.querySelector("#phonenumber");
  let address = document.querySelector("#address");

  if (name.value == "" || email.value === "" || age.value === "" || phonenumber === "" || address.value === "") {
    return false;
  } else {
    return true;
  }
}

/**
 * Helper function
 */
function emptyList() {
  contactManager.empty();
  contactManager.displayContactsAsList("contact-list");
}

/**
 * Helper function
 */
function loadList() {
  contactManager.load();
  contactManager.displayContactsAsList("contact-list");
}

/**
 * Helper function
 * @param {conatact number} number 
 */
function details(number) {
  contactManager.details(number);
}

/**
 * Heper function
 * @param {contact number} contactNum 
 */
function edit(contactNum) {
  contactManager.edit(contactNum);
}

/**
 * Helper function
 */
function remove(contactNum) {
  contactManager.remove(contactNum);
}

/**
 * Helper function
 */
function sRemove() {
  contactManager.sRemove();
}

/**
 * Helper function
 */
function save(contactNum) {
  contactManager.save(contactNum);
}

/**
 * Helper function
 */
function sEdit() {
  contactManager.sEdit();
}

/**
 * Helper function
 */
function clearForm() {
  contactManager.clearForm();
}

/**
 * Helper function
 */
function clearOtherForm() {
  contactManager.clearOtherForm();
}

/**
 * Helper function
 */
function save() {
  contactManager.eSave();
}

/**
 * Helper function
 */
function valid() {
  contactManager.valid();
}

// function addCheck() {
//     contactManager.addCheck();
// }

/**
 * Contact class
 */
class Contact {
  constructor(name, age, email, phonenumber, address) {
    this.name = name;
    this.email = email;
    this.age = age;
    this.phonenumber = phonenumber;
    this.address = address;
    // Static property
    Contact.numberCreated++;
  }

  // Static method
  static getContactsObjNum() {
    return numberCreated;
  }
}

/**
 * Contacts Manager class
 */
class MyContactsManager {
  constructor() {
    this.contactsList = [];
    this.contactOfInterest;
    this.checkIfValid;
    this.addBtnCheck;
  }

  // Erase all contacts
  empty() {
    this.contactsList = [];
  }

  trim(value) {
    return value.replace(/^\s+|\s+$/g, "");
  }

  /**
   * Adds contact to contact list
   * @param {conatact obj} contact 
   */
  add(contact) {
    this.load();
    var d = this.contactsList;
    if (d.length > 0) {
      for (let c of d) {
        alert(c.email);
        alert('Contact email ' + contact.email);

        // Check for duplicates
        if (c.email === contact.email || c.phonenumber === contact.phonenumber) {
          alert('Contact already exists!');
          return;
        }

      }
      alert('Does not exist, added');
      alert('New contact added from inside for loop!');
      d.push(contact);
      this.save();

    } else {
      alert('New contact added!');
      d.push(contact);
      this.save();
    }

    // alert(this.contactsList.length);
  }

  /**
   * Details button function
   * @param {contact number} number 
   */
  details(number) {
    // Load the contacts
    this.load();

    let name = document.querySelector("#ename");
    let email = document.querySelector("#eemail");
    let age = document.querySelector("#eage");
    let phonenumber = document.querySelector("#ephonenumber");
    let address = document.querySelector("#eaddress");

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

  /**
   * Remove button for contact list
   * @param {contact number} contactNum 
   */
  remove(contactNum) {
    alert("remove");
    let ename = document.querySelector("#ename");
    let eemail = document.querySelector("#eemail");
    let eage = document.querySelector("#eage");
    let ephonenumber = document.querySelector("#ephonenumber");
    let eaddress = document.querySelector("#eaddress");
    this.load();

    for (let i = 0; i < this.contactsList.length; i++) {
      var c = this.contactsList[i];

      if (c.phonenumber === contactNum) {
        this.contactsList.splice(i, 1);
        if (ephonenumber.value === contactNum) {
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

  /**
   * Remove button for edit box
   */
  sRemove() {
    let ephonenumber = document.querySelector("#ephonenumber");
    if (ephonenumber) {
      let ename = document.querySelector("#ename");
      let eemail = document.querySelector("#eemail");
      let eage = document.querySelector("#eage");
      let ephonenumber = document.querySelector("#ephonenumber");
      let eaddress = document.querySelector("#eaddress");
      this.load();

      for (let i = 0; i < this.contactsList.length; i++) {
        var c = this.contactsList[i];

        if (c.phonenumber === ephonenumber.value) {
          this.contactsList.splice(i, 1);
          // Empty the input fields
          ename.value = "";
          eemail.value = "";
          eage.value = "";
          ephonenumber.value = "";
          eaddress.value = "";

          this.save();
          break;
        }
      }

      this.displayContactsAsList("contact-list");
    } else {
      alert("No COntact to remove, please add one!");
    }
  }

  /**
   * Edit button for contact lists
   * @param {contact number} number 
   */
  edit(number) {
    this.details(number);
    this.getIndex(number);
    let f = document.querySelectorAll(".i-edit");

    for (let d of f) {
      d.removeAttribute("readonly");
    }
  }

  /**
   * Edit button function
   * for edit box
   */
  sEdit() {
    this.getIndexSecond();
    console.log("interest " + this.contactOfInterest);
    let f = document.querySelectorAll(".i-edit");
    for (let d of f) {
      d.removeAttribute("readonly");
    }
  }

  /**
   * 
   * @param {contact number} number 
   */
  getIndex(number) {
    this.load();
    var c = this.contactsList;
    for (let i = 0; i < this.contactsList.length; i++) {
      if (number === c[i].phonenumber) {
        this.contactOfInterest = i;
        break;
      }
    }
    console.log(this.contactOfInterest);

    return this.contactOfInterest;
  }

  /**
   * Get the index of the contact of interest for 
   * edited contacts
   */
  getIndexSecond() {
    let ephonenumber = document.querySelector("#ephonenumber");
    this.load();

    var c = this.contactsList;
    for (let i = 0; i < this.contactsList.length; i++) {
      if (ephonenumber.value === c[i].phonenumber) {
        this.contactOfInterest = i;
        break;
      }
    }
    console.log(this.contactOfInterest);

    return this.contactOfInterest;
  }

  // Sort the contact list
  sort() {
    this.conatctsList.sort(MyContactsManager.compareByName);
  }

  /**
   * 
   * @param {parameter 1} name1 
   * @param {paremeter 2} name2 
   */
  static compareByName(name1, name2) {
    if (name1 < name2) {
      return -1;
    }

    if (name1 > name2) {
      return 1;
    }

    return 0;
  }

  /**
   * Clears new contact form fields
   */
  clearForm() {
    // Get the values from input fields
    let name = document.querySelector("#name");
    let email = document.querySelector("#email");
    let age = document.querySelector("#age");
    let phonenumner = document.querySelector("#phonenumber");
    let address = document.querySelector("#address");

    // Empty the input fields
    name.value = "";
    email.value = "";
    age.value = "";
    phonenumber.value = "";
    address.value = "";
  }

  /**
   * Clears edit form fields
   */
  clearOtherForm() {
    // Get the values from input fields
    let name = document.querySelector("#ename");
    let email = document.querySelector("#eemail");
    let age = document.querySelector("#eage");
    let phonenumber = document.querySelector("#ephonenumber");
    let address = document.querySelector("#eaddress");

    // Empty the input fields
    name.value = "";
    email.value = "";
    age.value = "";
    phonenumber.value = "";
    address.value = "";
  }

  /**
   * Loads contacts from localStorage
   */
  load() {
    if (localStorage.contacts !== undefined) {
      // the array of contacts is saved in JSON, let's convert
      // it back to a reak JavaScript object.
      this.contactsList = JSON.parse(localStorage.contacts);
    }
  }

  /**
   * Saves to localStorage
   */
  save() {
    // We can only save strings in local Storage. So, let's convert
    // our array of contacts to JSON
    localStorage.contacts = JSON.stringify(this.contactsList);
  }

  /**
   * checks form fields
   */
  inputChecker() {
    // Get the values from input fields
    let name = document.querySelector("#ename");
    let email = document.querySelector("#eemail");
    let age = document.querySelector("#eage");
    let phonenumner = document.querySelector("#ephonenumber");
    let address = document.querySelector("#eaddress");

    if (name.value == "" || email.value === "" || age.value === "" || phonenumber === "" || address.value === "") {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Saves update ot edited contacts information
   */
  eSave() {
    let ename = document.querySelector("#ename");
    let eemail = document.querySelector("#eemail");
    let eage = document.querySelector("#eage");
    let ephonenumber = document.querySelector("#ephonenumber");
    let eaddress = document.querySelector("#eaddress");
    if (!this.inputChecker()) {
      alert('Empty fields are not allowed!');
      return;
    }
    this.load();
    var c = this.contactsList;
    // Check and make sure no field is empty
    if (this.contactOfInterest === undefined || this.contactOfInterest === null) {
      alert('Please click the edit button before saving');
      return;
    }
    c[this.contactOfInterest].name = ename.value;
    c[this.contactOfInterest].email = eemail.value;
    c[this.contactOfInterest].age = eage.value;
    c[this.contactOfInterest].phonenumber = ephonenumber.value;
    c[this.contactOfInterest].address = eaddress.value;
    this.save();


    // Make all input fields readonly  again
    // after edit
    let f = document.querySelectorAll(".i-edit");
    for (let d of f) {
      d.setAttribute("readonly", "readonly");
    }

    this.displayContactsAsList("contact-list");
  }

  valid() {
    this.checkIfValid = false;
    return this.checkIfValid;
  }

  // addCheck() {
  //   this.addBtnCheck = false;
  //   return this.addBtnCheck;
  // }

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
      list.innerHTML =
        "<li class='contact-name-box'>" +
        currentContact.name +
        " " +
        "<button onclick='details(" +
        JSON.stringify(currentContact.phonenumber) +
        ");'>Details</button>" +
        " " +
        "<button onclick='edit(" +
        JSON.stringify(currentContact.phonenumber) +
        ");'>Edit</button>" +
        " " +
        "<button onclick='remove(" +
        JSON.stringify(currentContact.phonenumber) +
        ")'>Delete</button></li>";
      container.appendChild(list);
    });
  }
}

Contact.numberCreated = 0;