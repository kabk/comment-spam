var pickRandom = function(list) {
    // This function takes a list, and returns a random element
    // from the list
    var index = Math.floor( Math.random() * list.length );
    return list[index];
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
    var message = pickRandom(messages).trim(); // the trim.() part gets rid of excess new-lines around the text
    
    // the <pre>…</pre> block gets the generated spam message
    // as its new contents
    var pre = document.querySelector('pre');
    pre.innerHTML = message;
}

var initialize = function() {
    // we want to generate a spam message once the app is ready:
    document.addEventListener('deviceready', injectSpam, false);
    // and also each time the content is clicked (maybe change this to ‘pull to refresh?’)
    document.querySelector(".app").addEventListener('click', injectSpam, false);
}
