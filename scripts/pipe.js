pipes = {
    _pipes: [],

    reset: function () {
        this._pipes = [];
    },



    update: function () {
        // add new pipe each 100 frames
        if (frames % 100 === 0) {
            // calculate y position
            var _y = height - (s_pipeSouth.height + s_fg.height + gap + 200 * Math.random());
            // create and push pipe to array
            this._pipes.push({
                x: 500,
                y: _y,
                width: s_pipeSouth.width,
                height: s_pipeSouth.height
            });
        }
        for (var i = 0, len = this._pipes.length; i < len; i++) {
            var p = this._pipes[i];

            if (i === 0) {

                score += p.x === nerd.x ? 1 : 0;

                // collision check, calculates x/y difference and
                // use normal vector length calculation to determine
                // intersection
                var cx = Math.min(Math.max(nerd.x, p.x), p.x + p.width);
                var cy1 = Math.min(Math.max(nerd.y, p.y), p.y + p.height);
                var cy2 = Math.min(Math.max(nerd.y, p.y + p.height + gap), p.y + 2 * p.height + gap);
                // closest difference
                var dx = nerd.x - cx;
                var dy1 = nerd.y - cy1;
                var dy2 = nerd.y - cy2;
                // vector length
                var d1 = dx * dx + dy1 * dy1;
                var d2 = dx * dx + dy2 * dy2;
                var r = nerd.radius * nerd.radius;
                // determine intersection
                if (r > d1 || r > d2) {
                    currentstate = states.Score;
                }
            }
            // move pipe and remove if outside of canvas
            p.x -= 2;
            if (p.x < -p.width) {
                this._pipes.splice(i, 1);
                i--;
                len--;
            }
        }
    },

    draw: function (ctx) {
        for (var i = 0, len = this._pipes.length; i < len; i++) {
            var p = this._pipes[i];
            s_pipeSouth.draw(ctx, p.x, p.y);
            //gap variable, remember to set as a var.
            s_pipeNorth.draw(ctx, p.x, p.y + gap + p.height);
        }
    }

}

