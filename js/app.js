const $level = $("#level")

const $round = $("#round")

const $lives = $("#lives")

const pattern = []

const patternCheck = []

let patternCheckCounter = 0

const game = {

userTurn : false,

level : 1,

round : 1,

lives : 3,

setUpLevel() {
    if (this.level === 1) {
        this.setTiles(4, "48", "46")
        setTimeout(() => {
            $(".animated").removeClass()
            this.openModal()
        }, 2000)
    }

    else if (this.level === 2) {
        this.setTiles(8, "48", "23")
        setTimeout(() => {
            $(".animated").removeClass()
            this.openModal()
        }, 3000)
    }

    else if (this.level === 3) {
        this.setTiles(16, "24", "23")
        setTimeout(() => {
            $(".animated").removeClass()
            this.openModal()
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

        let flashNumber = Math.floor(Math.random() * numberOfTiles)

        if (flashNumber === 0) {
            flashNumber = 1
        }
        for (let i = 0; i < flashNumber; i++){

            let random = Math.floor(Math.random() * numberOfTiles)
            
            if (random === 0) {
                random = 1
            }

            if (pattern.length === 0 || pattern[i] !== random && pattern[i-1] !== random && pattern[i+1] !== random) {
                pattern.push(random)
                patternCheck.push(random)
            }

        }
        const patternInterval = setInterval(() => {
            if (pattern.length === 0) {
                clearInterval(patternInterval)
                this.userTurn = true
                this.secondModal()
            } else {
                $("div").eq(pattern[0]).attr("class", "animated flash")
                setTimeout(() => $(".animated").removeClass(), 500)
                pattern.shift(0)
            }
        }, 1000)
    },
openModal() {
        const $open = $("#openModal")
        setTimeout(() => {
            $open.attr("class", "animated bounceInDown")
            $open.css("display", "block")
        }, 1000)
        $open.removeClass()
        $open.on("click", () => {
            $open.attr("class", "animated bounceOutDown")
            setTimeout(() => $open.css("display", "none"), 1000)
            setTimeout(() => $open.removeClass(), 1000)
            setTimeout(() => $open.attr("class", "modal"), 1000)
            this.displayRandomPattern()
            })
    },
secondModal() {
        const $first = $("#firstTurn")
        setTimeout(() => {
            $first.attr("class", "animated bounceInDown")
            $first.css("display", "block")
        }, 1000)
        $first.removeClass()
        $first.on("click", () => {
            $first.attr("class", "animated bounceOutDown")
            setTimeout(() => $first.css("display", "none"), 1000)
            setTimeout(() => $first.removeClass(), 1000)
            setTimeout(() => $first.attr("class", "modal"), 1000)
            this.firstRound = false
            // this.checkInput()
            setTimeout(() => $("div").attr("class", "readyToClick"), 1000)
            })
},
checkInput(flashToCheck) {
    if (flashToCheck === patternCheck[patternCheckCounter]) {
        console.log("that should work")
        patternCheckCounter++
            if (patternCheckCounter === patternCheck.length) {
                console.log("looks like that's it")
            }
        }
    // else if (flashToCheck === patternCheck[patternCheckCounter]) {
    //     console.log("that should work")
    //     patternCheckCounter++
        
    //     }
    else {
        console.log("that's not gonna work")
    }
    }
}

game.setUpLevel()
   
$("main").on("click", (e) => {

    const $arrayPosition = $(e.target).index()

    if ($(e.target).hasClass("readyToClick")) {
        game.checkInput($arrayPosition)
    }
})

  //have to make a function to check the reproduction of the pattern by user
  //have to figure out way to go through levels, rounds and deal with lives, add replay option etc
  //add opening animation, see if you can't suss out shine effect from animate.css splash page
  //add sounds?
  //add backend for highscore?
  //add social share?
  //additional mechanics? I even wanna mess with that?