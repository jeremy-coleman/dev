export interface Post {
  name: string;
  body: string;
}

export function getPosts(): Post[] {
  return [
    {
      name: 'Typescript',
      body: '...is awesome!'
    }
  ];
}
