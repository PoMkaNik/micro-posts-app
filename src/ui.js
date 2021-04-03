class UI {
  constructor() {
    this.form = document.querySelector('.card-form');
    this.posts = document.querySelector('#posts');
    this.postsContainer = document.querySelector('.postsContainer');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.submitBtn = document.querySelector('.post-submit');
    this.formState = 'add';
  }

  showPosts(posts) {
    let html = '';
    posts.forEach((post) => {
      html += `
       <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fas fa-pencil-alt"></i>
            </a>
            <a href="#" class="delete card-link" data-id="${post.id}">
              <i class="fas fa-trash-alt"></i>
            </a>
          </div>
        </div>
      `;
    });

    this.posts.innerHTML = html;
  }

  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;

    // change form state
    this.changeFormState('edit');
  }

  changeFormState(type) {
    if (type === 'edit') {
      // change button text
      this.submitBtn.textContent = 'Update Post!';
      // change button color
      this.submitBtn.classList.remove('btn-primary');
      this.submitBtn.classList.add('btn-warning');
      // create Cancel button
      const button = document.createElement('button');
      button.className = 'btn btn-danger btn-block edit-cancel';
      button.appendChild(document.createTextNode('Cancel'));
      // add cancel button to the DOM
      this.form.insertAdjacentElement('beforeend', button);
    } else {
      // change button text
      this.submitBtn.textContent = 'Post It!';
      // change button color
      this.submitBtn.classList.add('btn-primary');
      this.submitBtn.classList.remove('btn-warning');
      // remove cancel button
      const cancelBtn = document.querySelector('.edit-cancel');
      cancelBtn && cancelBtn.remove();
      // clear id
      this.clearIdInput();
      // clear text fields
      this.clearFields();
    }
  }

  clearIdInput() {
    this.idInput.value = '';
  }

  showAlert(message, className) {
    this.clearAlert();
    // create alert div
    const div = document.createElement('div');
    div.className = className;
    div.appendChild(document.createTextNode(message));
    // insert in DOM
    this.postsContainer.insertBefore(div, this.posts);

    // timeout
    setTimeout(() => this.clearAlert(), 3000);
  }

  clearAlert() {
    const alert = document.querySelector('.alert');
    alert && alert.remove();
  }

  clearFields() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }
}

export const ui = new UI();
