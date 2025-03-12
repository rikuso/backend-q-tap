class Page {
  constructor({
    title,
    slug,
    content,
    meta_title,
    meta_description,
    meta_keywords,
    meta_robots,
    created_at,
    updated_at
  }) {
    this.title = title;
    this.slug = slug;
    this.content = content;
    this.meta_title = meta_title;
    this.meta_description = meta_description;
    this.meta_keywords = meta_keywords;
    this.meta_robots = meta_robots;
    this.created_at = created_at || new Date();
    this.updated_at = updated_at || new Date();
  }

  // Método para convertir a objeto simple
  toFirestoreObject() {
    return {
      title: this.title,
      slug: this.slug,
      content: this.content,
      meta_title: this.meta_title,
      meta_description: this.meta_description,
      meta_keywords: this.meta_keywords,
      meta_robots: this.meta_robots,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }
}

module.exports = Page;
