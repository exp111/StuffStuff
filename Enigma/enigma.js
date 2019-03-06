document.addEventListener("keydown", onKeyDown);
document.addEventListener("keyup", onKeyUp);

var downLetter = null;
function isLetter(char) 
{
    return char.length == 1 && char.match(/[a-z]/);
}

function encode(char)
{
    return char; // TODO: do the fuckin encoding here
}

function onKeyDown(event)
{
    if (!isLetter(event.key))
        return;

    if (downLetter != null) //Already pressed a key? -> ignore
        return;

    document.getElementById('input').value += event.key;
    downLetter = event.key;

    // Encode here
    var encoded = encode(event.key);

    document.getElementById('output').value += encoded;
    
    document.getElementById('key' + encoded.toUpperCase()).focus(); //turn on lamp
}

function onKeyUp(event)
{
    if (!isLetter(event.key))
        return;

    if (downLetter != event.key) //Wrong key released? -> ignore
        return;

    downLetter = null;
    document.activeElement.blur(); //be gone thot focus -> turn of lamp
}