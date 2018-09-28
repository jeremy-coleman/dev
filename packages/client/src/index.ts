import { Post } from '@coglite/shared';

function renderPost(post: Post) {
  const header = document.createElement('h1');
  header.textContent = post.name;

  const body = document.createElement('div');
  body.textContent = post.body;

  const container = document.createElement('div');
  container.appendChild(header);
  container.appendChild(body);

  return container;
}

async function init() {
  const result = await fetch('/api/posts');
  const posts = (await result.json()) as Post[];

  const root = document.getElementById('root');

  if (!root) {
    throw new Error('No root');
  }

  for (const post of posts) {
    root.appendChild(renderPost(post));
  }
}

init();
