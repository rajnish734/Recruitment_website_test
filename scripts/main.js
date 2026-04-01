// HumanX Lab Website JavaScript

// Game unlocking system
document.addEventListener('DOMContentLoaded', function() {
  console.log('HumanX Lab website loaded');
  
  // Track which games are unlocked (game 1 is always unlocked)
  const unlockedGames = new Set([1]);
  
  // Initialize question buttons
  const questionButtons = document.querySelectorAll('.option-btn');
  
  questionButtons.forEach(button => {
    button.addEventListener('click', function() {
      const gameCard = this.closest('.game-card');
      const gameNumber = parseInt(gameCard.dataset.game);
      const questionSection = gameCard.querySelector('.question-section');
      const gameContent = gameCard.querySelector('.game-content');
      const feedback = questionSection.querySelector('.question-feedback');
      const allOptions = questionSection.querySelectorAll('.option-btn');
      
      // Disable all buttons in this question
      allOptions.forEach(btn => btn.disabled = true);
      
      const isCorrect = this.dataset.answer === 'correct';
      
      // Show feedback
      if (isCorrect) {
        feedback.textContent = '✓ Correct! The video is now unlocked.';
        feedback.className = 'question-feedback correct';
        feedback.style.display = 'block';
        this.classList.add('correct');
        
        // Unlock the current game
        unlockedGames.add(gameNumber);
        gameCard.classList.remove('locked');
        
        // Hide question section and show video after a short delay
        setTimeout(() => {
          questionSection.style.display = 'none';
          gameContent.style.display = 'block';
          
          // Unlock next game's question
          const nextGameNumber = gameNumber + 1;
          const nextGameCard = document.querySelector(`[data-game="${nextGameNumber}"]`);
          if (nextGameCard) {
            const nextQuestionSection = nextGameCard.querySelector('.question-section');
            const nextLockedMessage = nextGameCard.querySelector('.locked-message');
            if (nextQuestionSection) {
              // Hide locked message and show question
              if (nextLockedMessage) {
                nextLockedMessage.style.display = 'none';
              }
              nextQuestionSection.style.display = 'block';
              nextGameCard.classList.remove('locked');
            }
          }
        }, 1500);
      } else {
        feedback.textContent = '✗ Incorrect. Please try again.';
        feedback.className = 'question-feedback wrong';
        feedback.style.display = 'block';
        this.classList.add('wrong');
        
        // Re-enable buttons after showing feedback
        setTimeout(() => {
          allOptions.forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('correct', 'wrong');
          });
          feedback.style.display = 'none';
        }, 2000);
      }
    });
  });
});

