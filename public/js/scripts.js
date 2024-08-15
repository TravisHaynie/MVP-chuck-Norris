document.addEventListener('DOMContentLoaded', function () {
    // Handle form submissions for comments
    const commentForms = document.querySelectorAll('form[action^="/api/posts/"]');
    
    commentForms.forEach(form => {
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const formData = new FormData(form);
        const postId = form.action.split('/').slice(-2, -1)[0]; // Extract post ID from form action URL
        const content = formData.get('content');
  
        try {
          const response = await fetch(`/api/posts/${postId}/comments`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({ content }),
          });
  
          if (response.ok) {
            // Add new comment to the page
            const comment = await response.json();
            const commentsSection = form.closest('article').querySelector('section');
            
            const newCommentDiv = document.createElement('div');
            newCommentDiv.innerHTML = `<p>${comment.user.username} (${new Date(comment.createdAt).toLocaleString()}): ${comment.content}</p>`;
            
            commentsSection.appendChild(newCommentDiv);
            form.reset();
          } else {
            console.error('Failed to post comment');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      });
    });
  
    // Example: Handle post edit form (if applicable)
    const editForms = document.querySelectorAll('form[action^="/api/posts/"][method="PUT"]');
    
    editForms.forEach(form => {
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const formData = new FormData(form);
        const postId = form.action.split('/').slice(-1)[0]; // Extract post ID from form action URL
        const title = formData.get('title');
        const content = formData.get('content');
  
        try {
          const response = await fetch(`/api/posts/${postId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({ title, content }),
          });
  
          if (response.ok) {
            // Update the post content on the page
            const updatedPost = await response.json();
            const postElement = document.querySelector(`article[data-post-id="${postId}"]`);
            
            if (postElement) {
              postElement.querySelector('h2').textContent = updatedPost.title;
              postElement.querySelector('p').textContent = updatedPost.content;
            }
          } else {
            console.error('Failed to update post');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      });
    });
  
    // Example: Handle post delete (if applicable)
    const deleteButtons = document.querySelectorAll('button.delete-post');
    
    deleteButtons.forEach(button => {
      button.addEventListener('click', async (event) => {
        const postId = event.target.dataset.postId;
        
        try {
          const response = await fetch(`/api/posts/${postId}`, {
            method: 'DELETE',
          });
  
          if (response.ok) {
            // Remove the post from the page
            const postElement = document.querySelector(`article[data-post-id="${postId}"]`);
            if (postElement) {
              postElement.remove();
            }
          } else {
            console.error('Failed to delete post');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      });
    });
  });
  