import { http } from './http';
import { ui } from './ui';
const URL = 'http://localhost:3000/posts';

const getPosts = async function () {
  try {
    const posts = await http.get(URL);
    ui.showPosts(posts);
  } catch (err) {
    ui.showAlert(err.message, 'alert alert-danger');
    throw new Error(err);
  }
};

const submitPost = async function () {
  const postId = ui.idInput.value;

  const data = {
    ...(postId && { id: postId }),
    title: ui.titleInput.value,
    body: ui.bodyInput.value,
  };

  if (!data.title || !data.body) {
    ui.showAlert('All fields must be filled!', 'alert alert-danger');
    return;
  }
  try {
    // add or update post to DB
    if (postId) {
      // update
      await http.put(`${URL}/${postId}`, data);
      ui.showAlert('Post updated!', 'alert alert-success');
      ui.changeFormState('add');
    } else {
      // add
      await http.post(URL, data);
      ui.showAlert('Post added!', 'alert alert-success');
      ui.clearFields();
    }
    // update UI on new/updated posts
    getPosts();
  } catch (err) {
    ui.showAlert(err.message, 'alert alert-danger');
    throw new Error(err);
  }
};

const deletePost = async function (e) {
  e.preventDefault();
  // event delegation check
  const deleteBtn = e.target.closest('.delete');
  if (!deleteBtn) return;
  // get id from data- attribute
  const postId = deleteBtn.dataset.id;
  // confirm deletion
  if (!confirm('Are you sure?')) return;
  // delete from DB
  try {
    await http.delete(`${URL}/${postId}`);
    // show alert
    ui.showAlert('Post deleted', 'alert alert-success');
    // show posts with deleted one
    getPosts();
  } catch (err) {
    ui.showAlert(err.message, 'alert alert-danger');
    throw new Error(err);
  }
};

const updatePost = async function (e) {
  e.preventDefault();
  // event delegation check
  const editBtn = e.target.closest('.edit');
  if (!editBtn) return;
  // get data of post in fields
  const postId = editBtn.dataset.id;
  const post = editBtn.closest('.card-body');
  const postTitle = post.querySelector('.card-title').textContent;
  const postBody = post.querySelector('.card-text').textContent;
  // create post obj
  const data = {
    id: postId,
    title: postTitle,
    body: postBody,
  };
  // fill in data in inputs
  ui.fillForm(data);
};

const cancelEdit = function (e) {
  e.preventDefault();
  // event delegation check
  const cancelEditBtn = e.target.closest('.edit-cancel');
  if (!cancelEditBtn) return;
  // exit edit mode
  ui.changeFormState('add');
};

// get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// add posts functionality
ui.submitBtn.addEventListener('click', submitPost);

// delete post
ui.posts.addEventListener('click', deletePost);

// edit post
ui.posts.addEventListener('click', updatePost);

// cancel edit button click event
ui.form.addEventListener('click', cancelEdit);
