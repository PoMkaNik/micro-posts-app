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

const submitPost = async function () {
  try {
    const data = {
      title: document.querySelector('#title').value,
      body: document.querySelector('#body').value,
    };

    if (!data.title || !data.body) {
      ui.showAlert('All fields must be filled!', 'alert alert-danger');
      return;
    }

    const newPost = await http.post('http://localhost:3000/posts', data);
    // show alert
    ui.showAlert('Post added', 'alert alert-success');
    // clear inputs
    ui.clearFields();
    // show posts with just added
    getPosts();
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

// get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// add posts functionality
document.querySelector('.post-submit').addEventListener('click', submitPost);
