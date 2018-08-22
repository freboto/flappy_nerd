function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function getTouchPos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.touches[0].clientX - rect.left,
        y: evt.touches[0].clientY - rect.top
    };
}

function onpress(evt) {
    switch (currentstate) {
        case states.Splash:
            currentstate = states.Game;
            nerd.jump();
            break;

        case states.Game:
            nerd.jump();
            break;

        case states.FlappyNerd:
            var clickPos = getMousePos(canvas, evt)
            var mx = clickPos["x"],
                my = clickPos["y"];

            if (isNaN(mx) || isNaN(my)) {
                var touchPos = getTouchPos(canvas, evt)
                mx = touchPos["x"],
                    my = touchPos["y"];
            }
        

            if (startbtn.x < mx && mx < startbtn.x + startbtn.width && startbtn.y < my && my < startbtn.y + startbtn.height) {
                pipes.reset();
                currentstate = states.Splash;
                score = 0;
            }
            break;

        case states.Score:
            var clickPos = getMousePos(canvas, evt)
            var mx = clickPos["x"],
                my = clickPos["y"];

            if (isNaN(mx) || isNaN(my)) {
                var touchPos = getTouchPos(canvas, evt)
                mx = touchPos["x"],
                    my = touchPos["y"];
            }

            // if (okbtn.x < mx && mx < okbtn.x + okbtn.width && okbtn.y < my && my < okbtn.y + okbtn.height) {
            //     pipes.reset();
            //     currentstate = states.Splash;
            //     score = 0;
            // }


            break;
    }

}