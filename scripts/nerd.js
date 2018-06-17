nerd = {

    x: 60,
    y: 0,
    frame: 0,
    animation: [0, 1, 2, 1],
    rotation: 0,
    radius: 20,
    gravity: 0.25,
    _jump: 4.6,
    velocity: 0,
    pi: Math.PI,

    jump: function () {
        this.velocity = -this._jump;
    },

    update: function (pi) {
        var n = currentstate === states.Splash ? 10 : 5;
        this.frame += frames % n === 0 ? 1 : 0;
        this.frame %= this.animation.length;

        if (currentstate === states.Splash || currentstate == states.FlappyNerd) {
            this.y = height - 280 + 5 * Math.cos(frames / 10);
            this.rotation = 0;
        }

        
        else {
            this.velocity += this.gravity;
            this.y += this.velocity;

            if (this.y >= height - s_fg.height - 10) {
                this.y = height - s_fg.height - 10;
                if (currentstate === states.Game) {
                    currentstate = states.Score;
                }
                this.velocity = this._jump;
            }

            if (this.velocity >= this._jump) {
                this.frame = 1;
                this.rotation = Math.min(pi / 8, this.rotation + 0.3);
            } else {
                this.rotation = -0.4;
            }

        }

    },

    draw: function (ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        var n = this.animation[this.frame];

        s_bird[n].draw(ctx, -s_bird[n].width / 2, -s_bird[n].height / 2);

        ctx.restore();
    }


}