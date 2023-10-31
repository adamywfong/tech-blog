const showButton = document.querySelector('#show-create');
const newPost = document.querySelector('#new-post');

const postFormHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#new-title').value.trim();
  const text = document.querySelector('#new-content').value.trim();
  if (title && text) {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({title,text}),
      headers: {'Content-Type': 'application/json'},
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

const toggleCreate = (event) => {
  event.preventDefault();
  if (showButton.dataset.shown == 'true') {
    newPost.reset();
    newPost.classList.add('d-none');
    document.querySelector('#posts').classList.remove('d-none');
    showButton.textContent='+ New Post';
    showButton.dataset.shown = 'false';
  } else {
    newPost.classList.remove('d-none');
    document.querySelector('#posts').classList.add('d-none');
    showButton.textContent='Cancel';
    showButton.dataset.shown = 'true';
  }
}

newPost.addEventListener('submit', postFormHandler);
showButton.addEventListener('click', toggleCreate);
