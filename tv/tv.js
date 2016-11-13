var smrTVServerUrl = "http://api.smridh.com/tv/v1";
var activeChannel;

if(window.location.hash) {
    activeChannel = window.location.hash.substr(2); // remove #/
}

document.addEventListener("DOMContentLoaded", function() {
    startTV();
});

window.onhashchange = function() {
    window.location.reload(true);
};

function startTV() {
    loadChannelList();
    if(activeChannel) {
        $("#menu").show();
        $("#media-player").show();
    } else {
        $("#pick-header").show();
        $("#channel-list").show();
    }
}

function loadChannelList() {
    var channelListUrl = smrTVServerUrl + "/channel-list";
    $.getJSON(channelListUrl)
        .success(function(channelList) {
            var channelListContent = "<ul>";
            $.each(channelList, function(index, channel){
                channelListContent += "<li><a href='#/" + channel.channelName + "'>"
                    + channel.channelName + "</a></li>";
            });
            channelListContent += "</ul>";
            $("#channel-list").html(channelListContent);
            $("#menu-channel-list").html(channelListContent);
        })
        .fail(function (error) {
            $("#channel-list").text("Unable to list the channels");
            $("#menu-channel-list").text("Unable to list the channels");
        });
}

// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Replace the 'media-player' element with an <iframe> and
// YouTube player after the API code downloads.
var player;
function onYouTubePlayerAPIReady() {
    player = new YT.Player("media-player", {
        playerVars: {
            // Reference: https://developers.google.com/youtube/player_parameters
            controls: 0, // don't show video controls
            disablekb: 1, // disable keyboard
            playsinline: 1, // play inline on iOS
            iv_load_policy: 3, // annotations off
            rel: 0, // don't show related videos at end
            showinfo: 0 // don't show video title
        },
        events: {
            'onReady': playNextTrack,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        playNextTrack();
    }
}

function playNextTrack() {
    if(!activeChannel) return;

    var trackFeed = smrTVServerUrl + "/channel/" + activeChannel + "/now-playing";
    $.getJSON(trackFeed)
        .success(function (track) {
            player.loadVideoById(track.videoId, track.startSeconds);
            player.playVideo();
            gaPushTrackPageview();
        })
        .fail(function (error) {
            if (error.status == 503) {
                setTimeout(function(){playNextTrack(player);}, 5000);
            } else {
                alert("Unable to play this channel");
            }
        });
}
