const quizQuestions = [
    {
      question: '(1/6) Which country is known for the birthplace of "Dim Sum"?',
      choices: ["China", "Korea", "Taiwan", "Thailand"],
      correctAnswer: "China"
    },
    {
      question: '(2/6) Where did the dish "Moussaka" originally come from?',
      choices: ["Greece", "Lebanon", "Turkey", "Egypt"],
      correctAnswer: "Greece"
    },
    {
      question: '(3/6) What country is famous for "Kimchi"?',
      choices: ["Japan", "China", "Korea", "India"],
      correctAnswer: "Korea"
    },
    {
      question: '(4/6) "Tiramisu" is a dessert from which country?',
      choices: ["Italy", "France", "Spain", "Austria"],
      correctAnswer: "Italy"
    },
    {
      question: '(5/6) The spicy dish "Jerk Chicken" has its origins in which country?',
      choices: ["Jamaica", "Mexico", "India", "Brazil"],
      correctAnswer: "Jamaica"
    },
    {
      question: '(6/6) "Biryani" is a beloved dish from which country?',
      choices: ["Pakistan", "Bangladesh", "Sri Lanka", "India"],
      correctAnswer: "India"
    }
  ];
  
  
  let currentQuestionIndex = 0;
  let userAnswers = new Array(quizQuestions.length).fill(null);
  
  document.addEventListener('DOMContentLoaded', () => {
    showQuestion(currentQuestionIndex);
    updateNavigation(); // Ensure initial state is set correctly
  });
  
  function showQuestion(questionIndex) {
    const question = quizQuestions[questionIndex];
    document.getElementById('question').textContent = question.question;
    const choicesList = document.getElementById('choices');
    choicesList.innerHTML = '';
  
    question.choices.forEach((choice, index) => {
      const isChecked = userAnswers[questionIndex] === choice;
      const li = document.createElement('li');
      li.innerHTML = `<input type="radio" id="choice${index}" name="choice" value="${choice}" ${isChecked ? 'checked' : ''}>
                      <label for="choice${index}">${choice}</label>`;
      choicesList.appendChild(li);
  
      li.querySelector('input[type="radio"]').addEventListener('change', () => {
        userAnswers[questionIndex] = choice;
        updateNavigation(); // Update navigation state based on new selection
      });
    });
  
    updateNavigation(); // Call this to update the navigation state
  }
  
  function updateNavigation() {
    const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;
    document.getElementById('previous').disabled = currentQuestionIndex === 0;
    document.getElementById('next').disabled = !userAnswers[currentQuestionIndex]; // Disable if no answer selected
    const submitBtn = document.getElementById('submit');
    submitBtn.style.display = isLastQuestion ? 'inline-block' : 'none';
    submitBtn.disabled = !userAnswers[currentQuestionIndex]; // Disable if no answer selected for the last question
  }
  
  document.getElementById('next').addEventListener('click', () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      currentQuestionIndex++;
      showQuestion(currentQuestionIndex);
    }
  });
  
  document.getElementById('previous').addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      showQuestion(currentQuestionIndex);
    }
  });
  
  document.getElementById('submit').addEventListener('click', showResults);
  
  function showResults() {
    if (userAnswers.includes(null)) {
      alert('Please select an answer for all the questions');
      return;
    }
  
    const score = userAnswers.reduce((total, answer, index) => {
      return total + (answer === quizQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
  
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = quizQuestions.map((question, index) => {
      const userAnswer = userAnswers[index];
      const isCorrect = userAnswer === question.correctAnswer;
      
      // Generate choices list with highlighting
      const choicesHtml = question.choices.map(choice => {
        const choiceClass = choice === question.correctAnswer 
          ? 'correct-answer' 
          : (choice === userAnswer ? 'incorrect-answer' : '');
        return `<li class="${choiceClass}">${choice}</li>`;
      }).join('');
  
      return `
        <div>
          <p><strong>Question: ${question.question}</strong></p>
          <ul>${choicesHtml}</ul>
          <hr> <!-- Horizontal line -->
        </div>
      `;
    }).join('') + `<h2>Your Score: ${score}/${quizQuestions.length}</h2>`;
  
    const retryButton = document.createElement('button');
    retryButton.textContent = 'Retry';
    retryButton.onclick = resetQuiz;
    resultsDiv.appendChild(retryButton);
  
    document.getElementById('quiz').style.display = 'none';
    resultsDiv.classList.remove('hidden'); // instead of setting style.display to 'block', we remove 'hidden' class
    resultsDiv.style.display = 'block';
  }
  
  function resetQuiz() {
    userAnswers.fill(null);
    currentQuestionIndex = 0;
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('results').style.display = 'none';
    showQuestion(currentQuestionIndex);
  }
  
  document.getElementById('next').addEventListener('click', () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    }
  });
  
  document.getElementById('previous').addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
    }
  });
  
  document.getElementById('submit').addEventListener('click', showResults);
  
  showQuestion(currentQuestionIndex);