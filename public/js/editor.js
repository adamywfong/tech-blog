const handleUpdate = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#post-title').value.trim();
  const text = document.querySelector('#post-content').value.trim();
  const postID = document.querySelector('#update-form').dataset.postid;
  if (title && text) {
    const response = await fetch(`/api/posts/${postID}`, {
      method: 'PUT',
      body: JSON.stringify({ title, text }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to edit post');
    }
  }
}

const handleDelete = async (event) => {
  event.preventDefault();
  const postID = document.querySelector('#update-form').dataset.postid;
  const response = await fetch(`/api/posts/${postID}`, {
    method: 'DELETE'
  });
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to delete post');
  }
}


document.querySelector('#submit-post').addEventListener('click', handleUpdate)
document.querySelector('#delete-post').addEventListener('click', handleDelete)