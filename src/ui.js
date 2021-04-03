class UI {
  constructor() {
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
