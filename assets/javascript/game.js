$(document).ready(function(){
// Set the variables - make them global at this time

var isFighterChosen = 1;
var countRounds = 1;

var selFighter;
var selStyle;
var imgContent;

var indexHero;
var indexVillian;

var arrayCharacters = ["fighter-1", "fighter-2", "fighter-3", "fighter-4"];
var arrayCharactersName = ["The Wizard", "Mr. Death", "The Warlock", "The Buddha"];
var arrayCharacterImages = ["wizard.png", "death.png", "warlock.png", "buddha.png"]
var arrayHealthPoints = [120, 140, 160, 170];
var arrayAttackPower = [7, 4, 9, 4];

var heroName;
var villName;

var heroAttackPower;
var villianHP;
var heroHP;

var vilValue;
var heroValue;


  $(".fighter").on("click", function() {
   
    if (isFighterChosen === 1) {  
      selFighter = $('img', $(this)).attr('src');
      // selStyle  =  $('img', $(this)).attr('style');
      selDiv = $('img', $(this)).attr('id'); 

      parent = $(this).closest(".fighter").attr("class").match(/\b(fighter-\d+)\b/)[1]; 
      // Get the index of the array

      indexHero = arrayCharacters.indexOf(parent);

      heroName = arrayCharactersName[indexHero];
      heroValue = arrayHealthPoints[indexHero];

       vilInstructions =("<h2 id='vil-caption'>Then go get your villian!</h2>");  

      imgHero = ("<div class='hero'><p> " + heroName + "</p><img src=' " + selFighter + "' id='borders-good'><p> Power Level: " + heroValue + "</p> </div>");
      
      $(".sel-fighter").html(imgHero);
      $(".sel-opp").html(vilInstructions);
      $(".ineedcolortoo").css("background", "#603a14");

      $("#hero-caption").hide();

      $("." + parent).hide();
      $(".announcement").hide();

      isFighterChosen++;
    }

    else if ((isFighterChosen === 2) && (countRounds<5)) {
      selFighter = $('img', $(this)).attr('src');
      $("#vil-caption").hide();
      $(".place-winner").empty();

      // selStyle  =  $('img', $(this)).attr('style');
      selDiv = $('img', $(this)).attr('id'); 

      parent = $(this).closest(".fighter").attr("class").match(/\b(fighter-\d+)\b/)[1]; 

      indexVillian = arrayCharacters.indexOf(parent);

      villName = arrayCharactersName[indexVillian];
      vilValue = arrayHealthPoints[indexVillian];
      
      imgVillian = ("<div class='villian'><p class='color'> " + villName + "</p><img src=' " + selFighter + "' id='borders-bad'><p class='color'> Power Level: " + vilValue + "</p> </div>");

      $(".sel-opp").append(imgVillian);
      $("." + parent).hide();
      
      $(".the-villian").css("background", "#603a14");
      $(".color").css("color", "#ffffff");     

      isFighterChosen++;
      countRounds++;

      heroHP = arrayHealthPoints[indexHero];
      heroAttackPower = arrayAttackPower[indexHero];
      basePower = arrayAttackPower[indexHero];

      villianHP = arrayHealthPoints[indexVillian];
      villianAttackPower = arrayAttackPower[indexVillian];

      // $(".instruct").hide();
    }
    else {
      alert("Yo. Start the fight already!");
    }
  })
//The figggghtttt is ON LIKE DONKEY KONG!
  $(".fight-button").on("click", function(){

  if (isFighterChosen === 3) {
      //DURING GAME
      if ((heroHP > 0) && (villianHP > 0)) {     
  
          heroAttackPower += basePower;
          villianHP -= heroAttackPower;
          heroHP -= villianAttackPower;

          var scoreContent1 = ("<div><h5 class='scoreInfo'> Your hero, " + heroName + ", has attacked, " + villName + " for " + heroAttackPower + " points!</h5></div>");

          var scoreContent2 = ("<div><h5 class='scoreInfo'> The villian, " + villName + ", has attacked, " + heroName + " for " + villianAttackPower + " points!</h5></div>");         

          $(".scoreHero").html(scoreContent1);
          $(".scoreVillian").html(scoreContent2);
        
      }
      //LOSER
      else if ((heroHP <= 0) && (villianHP > 0)) {
        alert("You lost!");
        isFighterChosen = 1;
        countRounds = 1;


        $(".sel-fighter").empty();
        $(".sel-opp").empty();
        $(".fighter-4").show();
        //Restart game - put images back in their places and reset variables
          for (var i=0; i < arrayCharacters.length; i++) {

            var indexTag = arrayCharacters[i];
            $("." + indexTag).show();
        }
      }
      //WINNER - of the exisitng round - but not of the game
      else if ((heroHP > 0) && (villianHP <= 0) && (countRounds<4)) {
          $(".villian").hide();
          
          var pickNewPlayer = $("<h2 class='announcement'> You've won! Pick a new opponent from the brown area below.</h2>");
          
          $(".place-winner").html(pickNewPlayer);

          vilInstructions =("<h2 id='vil-caption'>Go pick a new villian!</h2>");  
          $("#vil-caption").css("color", "#ffffff");
          $(".the-villian").css("background", "#ffffff");     
          $(".sel-fighter").html(imgHero);
          $(".sel-opp").html(vilInstructions);
          
          (isFighterChosen = 2);
      }   
      //WINNER - of the exisitng GAME
      else if (countRounds===4) {
          var pickNewPlayer = $("<h2 class='announcement'> CONGRATULATIONS, WINNER! </h2>");
        $(".sel-fighter").empty();
        $(".sel-opp").empty();
        $(".ineedcolortoo").css("background", "#ffffff");


          $(".place-winner").html(pickNewPlayer);
          isFighterChosen = 1;
          countRounds = 1;

          for (var i=0; i < arrayCharacters.length; i++) {
              var indexTag = arrayCharacters[i];
              $("." + indexTag).show();

        }
      }
    }
    //THis is here to make sure people aren't hitting the fight button before selecting their players
  else {
    alert("Wait! Choose both a hero and a villian!");
    }
  })
})
