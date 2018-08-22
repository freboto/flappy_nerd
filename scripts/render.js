function render() {

    ctx.fillRect(0, 0, width, height);
    s_bg.draw(ctx, 0, height - s_bg.height);
    s_bg.draw(ctx, s_bg.width, height - s_bg.height);


    pipes.draw(ctx);
    nerd.draw(ctx);


    s_fg.draw(ctx, fgpos, height - s_fg.height);
    s_fg.draw(ctx, fgpos + s_fg.width, height - s_fg.height);


    var width2 = width / 2;
    if(currentstate === states.FlappyNerd){
        s_text.FlappyNerd.draw(ctx, width2 - s_text.FlappyNerd.width / 2, height - 360);
        s_buttons.Start.draw(ctx, startbtn.x, startbtn.y);

        highScore = document.getElementById('highScore');
        highScore.close();
    }

    if (currentstate === states.Splash) {
        s_splash.draw(ctx, width2 - s_splash.width / 2, height - 300);
        s_text.GetReady.draw(ctx, width2 - s_text.GetReady.width / 2, height - 380);
        highScore = document.getElementById('highScore');
        highScore.close();
    }

    if (currentstate === states.Score) {
        s_text.GameOver.draw(ctx, width2 - s_text.GameOver.width / 2, height - 500);
        //s_score.draw(ctx, width2 - s_score.width / 2, height - 540);
        //s_buttons.Ok.draw(ctx, okbtn.x, okbtn.y);

        
        //s_numberS.draw(ctx, width2 - 47, height - 504, score, null, 10);
        //s_numberS.draw(ctx, width2 - 47, height - 462, best, null, 10);

        var x = document.getElementById("highScore").open;
        if(x === false){
            highScore.showModal();
            document.getElementById("playerName").value = " ";
            document.getElementById("playerEmail").value = " ";
            document.getElementById("hiddenField").value = score;
            document.getElementById("score").innerHTML = score;

            
        }
        
        //highScore = document.getElementById('highScore');
        

    } else {
        s_numberB.draw(ctx, null, 20, score, width2);
    }


}