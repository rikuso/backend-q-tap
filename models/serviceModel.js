class Service {
    constructor({
      name,
      slug,
      description,
      price_range,
      image_url,
      created_at,
      updated_at
    }) {
      this.name = name;
      this.slug = slug;
      this.description = description;
      this.price_range = price_range;
      this.image_url = image_url;
      this.created_at = created_at || new Date();
      this.updated_at = updated_at || new Date();
    }
      // Método para convertir a objeto simple
  toFirestoreObject() {
    return {
      name: this.name,
      slug: this.slug,
      description: this.description,
      price_range: this.price_range,
      image_url: this.image_url,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }
  }
  
  module.exports = Service;
  