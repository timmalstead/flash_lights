const $level = $("#level")

const $round = $("#round")

const $lives = $("#lives")

const game = {

level : 2,

round : 1,

lives : 3,

setUpLevel() {
    if (this.level === 1) {
        this.setTiles(4, "48", "46")
        }

    else if (this.level === 2) {
        this.setTiles(8, "48", "23")
        }

    else if (this.level === 3) {
        this.setTiles(16, "24", "23")
        }

    $level.text(this.level)

    $round.text(this.round)

    $lives.text(this.lives)

    },

setTiles(numberOfTiles, width, height) { 
        
        let tileCounter = 0

        const boardInterval = setInterval(() => {
        if (tileCounter === numberOfTiles) {
            clearInterval(boardInterval)
        } else {
                for (let i = 0; i < 1; i++) {
        const $tile = $(`<div/ class="animated pulse">`)

        const random = Math.floor(Math.random() * 4)

        if (random === 0) {
        $tile.css("backgroundColor", "#f5d84b")
        }

        else if (random === 1) {
            $tile.css("backgroundColor", "#e91a3c")
            }

        else if (random === 2) {
            $tile.css("backgroundColor", "#2b67c1")
            }

        else if (random === 3) {
            $tile.css("backgroundColor", "#31c462")
            }

        $tile.css("width", `${width}%`)

        $tile.css("height", `${height}%`)

        $tile.css("borderRadius", "15%")

        if (this.level === 3) {
            $tile.css("margin", "0 .4%")
        }

        else {
            $tile.css("margin", "0 1%")
        }

        $tile.hover(function(){
            $tile.css("opacity", ".5")
        }, function(){
            $tile.css("opacity", "1")
        })

        $tile.active(function(){
            $tile.css("opacity", ".5")
        }, function(){
            $tile.css("opacity", "1")
        })

        $("main").append($tile)

        tileCounter++

                }
            }
        }, 250)
    }
}

game.setUpLevel()