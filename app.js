var vids = [
    
];

var YoutubeMp3Downloader = require("youtube-mp3-downloader");
 
//Configure YoutubeMp3Downloader with your settings 
var YD = new YoutubeMp3Downloader({
    "ffmpegPath": "/usr/local/bin/ffmpeg",        // Where is the FFmpeg binary located? 
    "outputPath": "/Users/Meldiron/Desktop/YtToMp3/video",    // Where should the downloaded and encoded files be stored? 
    "youtubeVideoQuality": "highest",       // What video quality should be used? 
    "queueParallelism": 2,                  // How many parallel downloads/encodes should be started? 
    "progressTimeout": 2000                 // How long should be the interval of the progress reports 
});

next();

function next() {
    if(!vids[0]) {
        console.log("HOTOVO UPLNE!!!");
        return; 
    }
    YD.download(vids[0]);
}


 
YD.on("finished", function(err, data) {
    if(err) { console.log(err); process.exit(); }
    console.log(data.videoId + ": HOTOVO! (" + data.videoTitle + ")");

    vids.shift();
    next();
});
 
YD.on("error", function(error) {
    console.log(error);
    process.exit();
});
 
YD.on("progress", function(progress) {
    console.log(progress.videoId + ": " + Math.floor(progress.progress.percentage) + "%");
});