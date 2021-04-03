import { http } from './http';
import { ui } from './ui';

const getPosts = async function () {
  try {
    const posts = await http.get('http://localhost:3000/posts');
    ui.showPosts(posts);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

// get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);
