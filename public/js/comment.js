
const handleCommentSubmit = async (event) => {
  event.preventDefault();
  const text = document.querySelector('#comment-text').value.trim();
  const post_id = document.querySelector('#submit-comment').dataset.postid;
  if (text){
    const response = await fetch('/api/comments/', {
      method: 'POST',
      body: JSON.stringify({text, post_id}),
      headers: {'Content-Type': 'application/json'}
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('#submit-comment').addEventListener('click', handleCommentSubmit);