$(() => {

    var videoBtn = $("input.video-button");

    function changePage() {
        var videoPage = $("input.video-button:checked").next();
        var video = videoPage.find("video");
        var playBtn = videoPage.find(".play");
        var stopBtn = videoPage.find(".stop");
        var height = video.height(), width = video.width();
        var bigBtn = videoPage.find(".bigger");
        var smallBtn = videoPage.find(".smaller");
        var normalBtn = videoPage.find(".normal");
        var status = videoPage.find("span.status");
        var volume = videoPage.find("input[name='volume']");
        var voltext = videoPage.find("span.volume");
        var videoTime = videoPage.find("span.time");

        function playVideo() {
        video[0].play();
        status.text("播放");
        }

        function pauseVideo() {
            video[0].pause();
            status.text("暫停");
        }

        function biggerVideo() {
            video.height(height*2);
            video.width(width*2);
        }

        function smallerVideo() {
            video.height(height/2);
            video.width(width/2);
        }

        function normalVideo() {
            video.height(height);
            video.width(width);
        }

        function changeVol() {
            let vol = volume.val();
            video[0].volume = vol / 100;
            voltext.text(vol);
        }

        function showTime() {
            videoTime.text(video[0].currentTime + "/" + video[0].duration);
        }


        playBtn.click(playVideo);
        stopBtn.click(pauseVideo);
        bigBtn.click(biggerVideo);
        smallBtn.click(smallerVideo);
        normalBtn.click(normalVideo);
        volume.change(changeVol);

        window.setInterval(showTime, 1);
    }

    videoBtn.change(changePage);
    })