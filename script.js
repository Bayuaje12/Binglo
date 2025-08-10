// Toggle like button
function toggleLike(button) {
    const icon = button.querySelector('i');
    const countElement = button.querySelector('.count');
    let count = parseInt(countElement.textContent.replace(/[^\d]/g, '')) || 0;
    
    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        count++;
        button.style.color = '#fe2c55';
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        count--;
        button.style.color = '#fff';
    }
    
    // Format the count (e.g., 1200 -> 1.2K)
    countElement.textContent = formatCount(count);
}

// Format large numbers
function formatCount(count) {
    if (count >= 1000000) {
        return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
        return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
}

// Toggle comment section
function toggleCommentSection(button) {
    const videoCard = button.closest('.video-card');
    const commentSection = videoCard.querySelector('.comment-section');
    
    if (commentSection.style.display === 'none') {
        commentSection.style.display = 'block';
    } else {
        commentSection.style.display = 'none';
    }
}

// Close comment section
function closeCommentSection(closeButton) {
    const commentSection = closeButton.closest('.comment-section');
    commentSection.style.display = 'none';
}

// Handle post comment
document.querySelectorAll('.post-comment-btn').forEach(button => {
    button.addEventListener('click', function() {
        const commentInput = this.previousElementSibling;
        const commentText = commentInput.value.trim();
        
        if (commentText) {
            const commentsList = this.closest('.comment-section').querySelector('.comments-list');
            
            // Create new comment element
            const newComment = document.createElement('div');
            newComment.className = 'comment';
            newComment.innerHTML = `
                <img src="https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 50) + 1}.jpg" alt="User" class="comment-avatar">
                <div class="comment-content">
                    <span class="comment-username">@user${Math.floor(Math.random() * 1000)}</span>
                    <p class="comment-text">${commentText}</p>
                </div>
            `;
            
            commentsList.appendChild(newComment);
            commentInput.value = '';
            
            // Update comment count
            const commentBtn = this.closest('.video-card').querySelector('.action-btn:nth-child(2)');
            const countElement = commentBtn.querySelector('.count');
            let count = parseInt(countElement.textContent.replace(/[^\d]/g, '')) || 0;
            count++;
            countElement.textContent = formatCount(count);
        }
    });
});

// Auto-play videos when they're visible
const videoCards = document.querySelectorAll('.video-card');
const options = {
    threshold: 0.7
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const video = entry.target.querySelector('.video-player');
        if (entry.isIntersecting) {
            video.play();
        } else {
            video.pause();
        }
    });
}, options);

videoCards.forEach(card => {
    observer.observe(card);
});

// Bottom navigation active state
document.querySelectorAll('.bottom-nav .nav-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelector('.bottom-nav .nav-item.active').classList.remove('active');
        this.classList.add('active');
    });
});