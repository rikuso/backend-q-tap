class ContactMessage {
    constructor({
      name,
      email,
      message,
      celphone,
      created_at
    }) {
      this.name = name;
      this.email = email;
      this.message = message;
      this.celphone = celphone;
      this.created_at = created_at || new Date();
    }
    toFirestoreObject() {
      return {
        name: this.name,
        email: this.email,
        message: this.message,
        celphone : this.celphone,
        created_at: this.created_at,
      };
    }
  }
  
  module.exports = ContactMessage;
  