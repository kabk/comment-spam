var pickRandom = function(list) {
    var index = Math.floor( Math.random() * list.length );
    return list[index];
}

var injectSpam = function() {
    var replacer = function(match, p1, p2, p3, offset, string){
        var parts = p1.split('|');
        return pickRandom(parts);
    }
    
    var pre = document.querySelector('pre');
    var spamTemplate = pre.innerHTML;
    spamTemplate = spamTemplate.replace(/{([^}]*)}/g, replacer);
    
    var messages = spamTemplate.split("|");
    var message = pickRandom(messages);
    
    pre.innerHTML = message;
}

var initialize = function() {
    document.addEventListener('deviceready', injectSpam, false);
}