const $level = $("#level")

const $round = $("#round")

const $lives = $("#lives")

const game = {

level : 1,

round : 1,

lives : 3,

setUpLevel() {
    if (this.level === 1) {
        this.setTiles(4, "48", "48.5")
        }

    else if (this.level === 2) {
        this.setTiles(8, "48", "24.25")
        }

    else if (this.level === 3) {
        this.setTiles(16, "24", "24.25")
        }

    $level.text(this.level)

    $round.text(this.round)

    $lives.text(this.lives)
    },

setTiles(numberOfTiles, width, height) {
    for (let i = 0; i < numberOfTiles; i++) {
        const $tile = $("<div/>")

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

        $("main").append($tile)
        }
    }
}

game.setUpLevel()