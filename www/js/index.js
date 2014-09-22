var pickRandom = function(list) {
    var index = Math.floor( Math.random() * list.length );
    return list[index];
}

var injectSpam = function() {
    // this function will come in handy:
    // it takes a string like appropriate|perfect|the best
    // and outputs one of the three
    var chooseWord = function(match, p1){
        var parts = p1.split('|');
        return pickRandom(parts);
    }
    
    // we get the contents of the <pre>…</pre> block
    var pre = document.querySelector('pre');
    var spamTemplate = pre.innerHTML;
    
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
    var message = pickRandom(messages);
    
    // the <pre>…</pre> block gets the generated spam message
    // as its new contents
    pre.innerHTML = message;
}

var initialize = function() {
    document.addEventListener('deviceready', injectSpam, false);
}
