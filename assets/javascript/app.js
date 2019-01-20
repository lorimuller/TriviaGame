$(document).ready(function(){
  
    // event listeners
    $("#remaining-time").hide();
    $("#start").on('click', trivGame.startGame);
    $(document).on('click' , '.option', trivGame.checkGuess);
    
  })
  
  var trivGame = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',


    // questions, answer options, & answer
    questions: {
      quest1: "Eric Clapton played in several bands except this one:",
      quest2: "Who was not a member of Led Zepplin?",
      quest3: "What classic rock song starts with the tolling of a two-ton bell?",
      quest4: "Who designed the Rolling Stones tongue & lips logo?",
    },
    options: {
      quest1: ['Yardbirds', 'Cream', 'Deep Purple', 'Derek and the Dominos'],
      quest2: ['Jimmy Page', 'Robert Palmer', 'John Paul Jones', 'John Bonham'],
      quest3: ['Black Dog', 'Time', "Hell's Bells", 'Back in Black'],
      quest4: ['Freddy Mercury', 'Andy Warhol', 'Keith Richards', 'Mick Jagger'],
    },
    answers: {
      quest1: "Deep Purple",
      quest2: "Robert Palmer",
      quest3: "Hell's Bells",
      quest4: "Mick Jagger",
    },


    // starts game
    startGame: function(){

      // resetting game 
      trivGame.currentSet = 0;
      trivGame.correct = 0;
      trivGame.incorrect = 0;
      trivGame.unanswered = 0;
      clearInterval(trivGame.timerId);
      
      // show game 
      $('#game').show();
      
      //  clear last results
      $('#results').html('');
      
      // timer
      $('#timer').text(trivGame.timer);
      
      // hide start button
      $('#start').hide();
  
      $('#remaining-time').show();
      
      // start questions
      trivGame.nextQuestion();     
    },

    // displays questions and options
    nextQuestion : function(){
      
      // set timer to 10 seconds each question
      trivGame.timer = 10;
      $('#timer').removeClass('last-seconds');
      $('#timer').text(trivGame.timer);
      
      if(!trivGame.timerOn){
        trivGame.timerId = setInterval(trivGame.timerRunning, 1200);
      }
      
    
      var questionContent = Object.values(trivGame.questions)[trivGame.currentSet];
      $('#question').text(questionContent);
      console.log(questionContent);
      
      // all answer options for a question
      var questionOptions = Object.values(trivGame.options)[trivGame.currentSet];
      
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class=" btn option btn-toolbar btn-info btn-lg">'+key+'</button>'));
      })
      console.log(questionOptions);
    },


    // decrement counter and count unanswered if timer runs out
    timerRunning : function(){

      // if timer still has time left and there are still questions left to ask
      if(trivGame.timer > -1 && trivGame.currentSet < Object.keys(trivGame.questions).length){
        $('#timer').text(trivGame.timer);
        trivGame.timer--;
          if(trivGame.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }

      //no time left
      else if(trivGame.timer === -1){
        trivGame.unanswered++;
        trivGame.result = false;
        clearInterval(trivGame.timerId);
        resultId = setTimeout(trivGame.guessResult, 1200);
        $('#results').html('<h3>You waited too long. The answer was '+ Object.values(trivGame.answers)[trivGame.currentSet] +'</h3>');
      }

      // show results at the end
      else if(trivGame.currentSet === Object.keys(trivGame.questions).length){
        
        // adds results to the page
        $('#results').html('<h3>Thank you for playing!</h3></br>'+
         
          '<p>Correct: '+ trivGame.correct +'</p>'+
          '<p>Incorrect: '+ trivGame.incorrect +'</p>'+
          '<p>Unaswered: '+ trivGame.unanswered +'</p>'+
          '<p>Please try again!</p>');
        
        // hide game sction
        $('#game').hide();
        
        // show start button to begin a new game
        $('#start').show();
      }
      
    },

    // method to evaluate the option clicked
    checkGuess : function() {
      
      // the answer to the current question being asked
      var currentAnswer = Object.values(trivGame.answers)[trivGame.currentSet];
      
     
      if($(this).text() === currentAnswer){

        trivGame.correct++;
        clearInterval(trivGame.timerId);
        resultId = setTimeout(trivGame.guessResult, 1200);
        $('#results').html('<h3>You\'re a rock god!</h3>');
      }
      
      else{
    
        trivGame.incorrect++;
        clearInterval(trivGame.timerId);
        resultId = setTimeout(trivGame.guessResult, 1200);
        $('#results').html('<h3>Try again next time. The answer is '+ currentAnswer +'</h3>');
      }
      
    },
    // method to remove previous question results and options
    guessResult : function(){
      
      // increment to next question set
      trivGame.currentSet++;
      
      // remove the options and results
      $('.option').remove();
      $('#results h3').remove();
      
      // begin next question
      trivGame.nextQuestion();
       
    }
  
  }



