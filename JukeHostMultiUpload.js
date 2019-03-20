// ==UserScript==
// @name         JukeHost MultiUpload
// @namespace    http://tampermonkey.net/
// @version      0.0.21
// @description  Upload several files at once
// @author       exp111
// @match        https://jukehost.co.uk/upload
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Allow multiple upload
    document.getElementById('audioFileUpload').setAttribute('multiple', "");

    // Insert Our Script

    var script = document.createElement('script');
    script.innerHTML = `
window.onload = function()
{
    $(document).on('change', "input[type=file]", function() {
    addMusicFile(this)
});
function addMusicFile(obj) {
    var files = obj.files;
    var length = obj.files.length;
    for (var i = 1; i< length; i++)
    {
        var file = files[i];
        var inputs = document.getElementsByClassName('row col-12');
        var lastInput = inputs[inputs.length - 1];
        lastInput.children[1].children[0].children[1].innerText = file.name;
        lastInput.children[1].children[0].children[0].files[0] = file;
        lastInput.children[0].children[1].value = file.name.substr(0, file.name.lastIndexOf("."));
        addMusicEntry();
    }
}
function addMusicEntry() {
    $("#formU").append(musicInput);
}
var musicInput = '              <div id="musicSection" class="row col-12">                <div class="input-group col-6" id="titleField">                  <div class="input-group-prepend">                    <div class="input-group-text">                      Title                    </div>                  </div>                  <input type="text" class="form-control text-center " name="jh_audio_name[]" id="audioPrettyNameInput" placeholder="...">                </div>                <div class="input-group col-6">                  <div class="custom-file ">                    <input type="file" class="custom-file-input" name="jh_audio[]" id="audioFileUpload" aria-describedby="inputGroupFileAddon01" accept=".mp3,.wav,.ogg" multiple>                    <label id="audioFileUploadLabel" class="custom-file-label" for="inputGroupFile01">Choose Audio File</label>                  </div>                </div>              </div>              ';
}
 `;
    document.getElementsByTagName('head')[0].appendChild(script);
})();