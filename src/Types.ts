export type Book = {
    _id: string;
    title: string;
    description: string;
    coverImage: string;
    file: string;
    genre: string;
    author: Author;
    updatedAt:string;
  };
  export type Author = {
    _id:string;
    name: string;
  };
  