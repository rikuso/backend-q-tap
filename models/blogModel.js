class BlogPost {
    constructor({
      title,
      slug,
      content,
      author,
      tags,
      published,
      views,
      imageUrl,
      created_at,
      updated_at
    }) {
      this.title = title;
      this.slug = slug;
      this.content = content;
      this.author = author;
      this.tags = tags || [];
      this.published = published || false;
      this.views = views || 0;
      this.imageUrl = imageUrl || '';
      this.created_at = created_at || new Date();
      this.updated_at = updated_at || new Date();
    }
      // Método para convertir a objeto simple
  toFirestoreObject() {
    return {
      title: this.title,
      slug: this.slug,
      content: this.content,
      author: this.author,
      tags: this.tags,
      published: this.published,
      views: this.views,
      imageUrl: this.imageUrl,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }
  }
  
  module.exports = BlogPost;
  