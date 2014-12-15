var pickRandom = function(list) {
    // This function takes a list, and returns a random element
    // from the list
    var index = Math.floor( Math.random() * list.length );
    return list[index];
}

var shuffle = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var pickFiveRandom = function(list) {
    if (list.length < 5) {
        alert("that’s less than 5, not enough!");
        return;
    }
    
    shuffle(list);
    
    return list.slice(0,5);
}


var chooseWord = function(match, p1){
    // this function takes a string like "appropriate|perfect|the best"
    // and outputs one of the three
    var parts = p1.split('|');
    return pickRandom(parts);
}

var injectSpam = function() {
    
    // we get the contents of the <template>…</template> block
    var templateElement = document.querySelector('#comment-spam-template');
    var spamTemplate    = templateElement.innerHTML;
    
    // this is the tricky bit, it’s where we fill in the template
    
    // first we get all the bits between curly brackets { }
    // like: {appropriate|perfect|the best}
    // using a technique known as ‘regular expression’
    
    // these bits we then pass through the function `chooseWord`
    // which makes sure to pick one of three words
    
    // this word is what ends up replacing the original { } part
    
    // more on the `replace` function: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
    spamTemplate = spamTemplate.replace(/{([^}]*)}/g, chooseWord);
    
    // we filled in the entire template,
    // but we just need one of the messages.
    
    // the different spam messages themselves are also separated by `|`
    // so we split them up and randomly pick one
    var messages = spamTemplate.split("|");
    console.log();
    var horoscope = pickFiveRandom(messages).join(" "); // the trim.() part gets rid of excess new-lines around the text
    
    // the <pre>…</pre> block gets the generated spam message
    // as its new contents
    var p = document.querySelector('.app p');
    p.innerHTML = horoscope;
}

var initialize = function() {
    injectSpam();
    // and also each time the content is clicked (maybe change this to ‘pull to refresh?’)
    document.querySelector(".app").addEventListener('', injectSpam, false);
}
