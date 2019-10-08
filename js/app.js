const $level = $("#level")

const $round = $("#round")

const $lives = $("#lives")

const pattern = []

const patternCheck = []

const game = {

firstPlay : true,

firstRound : true,

level : 2,

round : 1,

lives : 3,

setUpLevel() {
    if (this.level === 1) {
        this.setTiles(4, "48", "46")
        setTimeout(() => {
            $(".animated").removeClass()
            this.modals()
        }, 2000)
    }

    else if (this.level === 2) {
        this.setTiles(8, "48", "23")
        setTimeout(() => {
            $(".animated").removeClass()
            this.modals()
        }, 3000)
    }

    else if (this.level === 3) {
        this.setTiles(16, "24", "23")
        setTimeout(() => {
            $(".animated").removeClass()
            this.modals()
        }, 5000)
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

        // $tile.hover(function(){
        //     $tile.css("opacity", ".5")
        // }, function(){
        //     $tile.css("opacity", "1")
        // })

        $("main").append($tile)

        tileCounter++
            }
        }, 250)
    },

displayRandomPattern() {
        let numberOfTiles = 0
        if (this.level === 1) {
            numberOfTiles = 4
        }
        else if (this.level === 2){
            numberOfTiles = 8
        }
        else if (this.level === 3){
            numberOfTiles = 16
        }
        const flashNumber = Math.floor(Math.random() * numberOfTiles)
        for (let i = 0; i < flashNumber; i++){

            const random = Math.floor(Math.random() * numberOfTiles)
            
            if (pattern.length === 0 || pattern[i] !== random && pattern[i-1] !== random && pattern[i+1] !== random) {
                pattern.push(random)
                patternCheck.push(random)
                console.log(random)
            }

        }
        const patternInterval = setInterval(() => {
            if (pattern.length === 0) {
                clearInterval(patternInterval)
            } else {
                $("div").eq(pattern[0]).attr("class", "animated flash")
                setTimeout(() => $(".animated").removeClass(), 500)
                pattern.shift(0)
            }
        }, 1000)
        console.log(pattern)
        console.log(patternCheck)
        setTimeout(() => this.modals(), patternCheck.length * 1000 + 500)
    },
modals() {
    if (this.firstPlay === true) {
        const $open = $("#openModal")
        const $modal = $(".modal")
        setTimeout(() => {
            $open.attr("class", "animated bounceInDown")
            $open.css("display", "block")
        }, 1000)
        $open.removeClass()
        $modal.on("click", () => {
            $open.attr("class", "animated bounceOutDown")
            setTimeout(() => $open.css("display", "none"), 1000)
            setTimeout(() => $open.removeClass(), 1000)
            setTimeout(() => $open.attr("class", "modal"), 1000)
            this.firstPlay = false
            this.displayRandomPattern()
            })
        }
    else if (this.firstPlay === false){
        const $first = $("#firstTurn")
        const $modal = $(".modal")
        setTimeout(() => {
            $first.attr("class", "animated bounceInDown")
            $first.css("display", "block")
        }, 1000)
        $first.removeClass()
        $modal.on("click", () => {
            $first.attr("class", "animated bounceOutDown")
            setTimeout(() => $first.css("display", "none"), 1000)
            setTimeout(() => $first.removeClass(), 1000)
            setTimeout(() => $first.attr("class", "modal"), 1000)
            this.firstRound = false
            this.displayRandomPattern()
            })
        }
    }
}

game.setUpLevel()

// $("#titleBar").on("dblclick", () => {
//     if (game.level === 1) {
//         game.displayRandomPattern(4)
//     }
//     else if (game.level === 2) {
//         game.displayRandomPattern(8)
//     }
//     else if (game.level === 3) {
//         game.displayRandomPattern(16)
//     }
//   })

  //okey doke, next things to set up are the modals
  //one modal at the start to announce the rules, one to tell the user that they are going to see a random pattern and one to tell them to recreate it.
  //have to make a function to check the reproduction of the pattern by user
  //have to figure out way to go through levels, rounds and deal with lives, add replay option etc
  //add opening animation, see if you can't suss out shine effect from animate.css splash page
  //add sounds?
  //add backend for highscore?
  //add social share?
  //additional mechanics? I even wanna mess with that?