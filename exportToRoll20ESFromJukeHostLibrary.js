class Song
{
    constructor(name, ref)
    {
        this.title = name;
        this.track_id = ref;
    }
    loop = false;
    playing = false;
    softstop = false;
    source = "My Audio";
    tags = "";
    title = "";
    track_id = "";
    volume = 100;
    libreaudio = true;
};
var output = {
    "schema_version": 1,
    "playlists": []
};
var obj = {"name": "Playlist", "mode": "s"}
var songs = [];
var childs = document.getElementsByClassName('table-responsive')[0].children[0].children[1].children;
for (var i = 0; i < childs.length; i++)
{
    var child = childs[i];
    var name = child.children[0].children[0].innerHTML;
    var ref = child.children[2].children[0].getAttribute('music-ref');
    songs.push(new Song(name, ref));
}
obj.songs = songs;
output.playlists.push(obj);
console.log(JSON.stringify(output));