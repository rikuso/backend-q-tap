class MediaFiles  {
    constructor({
        file_name,
        file_type ,
        file_url ,
        description ,
        created_at,
        updated_at
    }) {
      this.file_name = file_name;
      this.file_type = file_type || [];
      this.file_url = file_url;
      this.description = description;
      this.created_at = created_at || new Date();
      this.updated_at = updated_at || new Date();
    }
      // Método para convertir a objeto simple
  toFirestoreObject() {
    return {
        file_name: this.file_name,
      file_type: this.file_type,
      file_url: this.file_url,
      description: this.description,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }
  }
  
  module.exports = MediaFiles;
  