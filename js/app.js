const $level = $("#level")

const $round = $("#round")

const $lives = $("#lives")

const pattern = []

const patternCheck = []

const game = {

level : 1,

round : 1,

lives : 3,

setUpLevel() {
    if (this.level === 1) {
        this.setTiles(4, "48", "46")
        setTimeout(() => $("div").removeClass(), 3000)
        }

    else if (this.level === 2) {
        this.setTiles(8, "48", "23")
        setTimeout(() => $("div").removeClass(), 4000)
        }

    else if (this.level === 3) {
        this.setTiles(16, "24", "23")
        setTimeout(() => $("div").removeClass(), 8000)
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

        const $tile = $(`<div/>`)

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

        $tile.attr("class", "animated zoomIn")

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

        $("main").append($tile)

        tileCounter++
            }
        }, 250)
    },

displayRandomPattern(numberOfTiles) {
        const flashNumber = Math.floor(Math.random() * numberOfTiles)
        for (let i = 0; i < flashNumber; i++){

            const random = Math.floor(Math.random() * numberOfTiles)
            
            if (pattern[i] !== random && pattern[i-1] !== random && pattern[i+1] !== random) {
                pattern.push(random)
                patternCheck.push(random)
            }

        }
        const patternInterval = setInterval(() => {
            if (pattern.length === 0) {
                clearInterval(patternInterval)
            } else {
                $("div").eq(pattern[0]).attr("class", "animated zoomIn")
                setTimeout(() => $("div").removeClass(), 500)
                pattern.shift(0)
            }
        }, 1000)
    }
}

game.setUpLevel()

$("#titleBar").on("click", () => {
    if (game.level === 1) {
        game.displayRandomPattern(4)
    }
    else if (game.level === 2) {
        game.displayRandomPattern(8)
    }
    else if (game.level === 3) {
        game.displayRandomPattern(16)
    }
  })

  $("main").on("click", () => {
      console.log(pattern)
      console.log(patternCheck)
  })