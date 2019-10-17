$("#titleBar").attr("class", "animated bounceInLeft")

if ($(window).width() > 1040) {
    $("footer").attr("class", "animated bounceInRight")
}

const $level = $("#level")

const $round = $("#round")

const $lives = $("#lives")

$("main").on("click", (e) => {

    const $arrayPosition = $(e.target).index()
    
    if (game.readyToClick === true && e.target !== e.currentTarget) {
        audio.select.play()
        game.checkInput($arrayPosition)
        $(e.target).attr("class", "animated zoomIn")
        setTimeout(() => $("div").removeClass(), 750)
    }
})

const game = {

pattern : [],

patternCheck : [],

patternCheckCounter : 0,

level : 1,

round : 1,

lives : 10,

openingModals : true,

readyToClick : false,

youLose : false,

setUpLevel() {

    $("main").empty()

    if (this.level === 1 && this.openingModals === true) {
        this.setTiles(4, "48", "46")
        setTimeout(() => {
            $(".animated").removeClass()
            this.openModal()
        }, 2000)
    }

    if (this.level === 1 && this.openingModals === false) {
        this.setTiles(4, "48", "46")
        setTimeout(() => {
            $(".animated").removeClass()
            this.displayRandomPattern()
        }, 2000)
    }

    else if (this.level === 2) {
        this.setTiles(8, "48", "23")
        setTimeout(() => {
            $(".animated").removeClass()
            this.openingModals = false
            this.displayRandomPattern()
        }, 3000)
    }

    else if (this.level === 3) {
        this.setTiles(16, "24", "23")
        setTimeout(() => {
            $(".animated").removeClass()
            this.openingModals = false
            this.displayRandomPattern()
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
        $tile.hover(function(){
            $tile.css("boxShadow", "0 0 2em #f5d84b")
        }, function(){
            $tile.css("boxShadow", "none")
        })
        }

        else if (random === 1) {
            $tile.css("backgroundColor", "#e91a3c")
            $tile.hover(function(){
                $tile.css("boxShadow", "0 0 2em #e91a3c")
            }, function(){
                $tile.css("boxShadow", "none")
            })
            }

        else if (random === 2) {
            $tile.css("backgroundColor", "#2b67c1")
            $tile.hover(function(){
                $tile.css("boxShadow", "0 0 2em #2b67c1")
            }, function(){
                $tile.css("boxShadow", "none")
            })
            }

        else if (random === 3) {
            $tile.css("backgroundColor", "#31c462")
            $tile.hover(function(){
                $tile.css("boxShadow", "0 0 2em #31c462")
            }, function(){
                $tile.css("boxShadow", "none")
            })
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

        $("main").append($tile)

        tileCounter++
            }
        }, 250)
    },

displayRandomPattern() {
        let numberOfTiles = 0
        this.patternCheck = []
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

        if (flashNumber < 2) {
            flashNumber = 2
        }

        for (let i = 0; i < flashNumber; i++){

            let random = Math.floor(Math.random() * numberOfTiles)

            this.pattern.push(random)
            this.patternCheck.push(random)
        }

        if (this.pattern.length === 0 && this.patternCheck.length === 0) {
            const backupRandom = Math.floor(Math.random() * numberOfTiles)
            this.pattern.push(backupRandom)
            this.patternCheck.push(backupRandom)
        }

        const patternInterval = setInterval(() => {
            if (this.pattern.length === 0 && this.openingModals === true) {
                clearInterval(patternInterval)
                this.openingModals = false
                this.secondModal()
                }

                else if (this.pattern.length === 0 && this.openingModals === false) 
                    {
                    clearInterval(patternInterval)
                    this.readyToClick = true
                }
                else {
                    if (this.pattern.length === 0) {
                        this.pattern[0] = 0
                    }
                $("div").eq(this.pattern[0]).attr("class", "animated zoomIn")
                setTimeout(() => $("div").removeClass(), 750)
                this.pattern.shift(0)
            }
        },  1000)
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
        if (this.level === 1 && this.round === 1) {
        const $first = $("#firstTurn")
        setTimeout(() => {
            $first.attr("class", "animated bounceInUp")
            $first.css("display", "block")
        }, 1000)
        $first.removeClass()
        $first.on("click", () => {
            this.readyToClick = true
            $first.attr("class", "animated bounceOutUp")
            setTimeout(() => $first.css("display", "none"), 1000)
            setTimeout(() => $first.removeClass(), 1000)
            setTimeout(() => $first.attr("class", "modal"), 1000)
            })
    }
},

finalModal() {
    if (this.youLose === true) {
    const $lose = $("#youLose")
    setTimeout(() => {
        $lose.attr("class", "animated bounceInRight")
        $lose.css("display", "block")
    }, 1000)
    $lose.removeClass()
    $lose.on("click", () => {
        $lose.attr("class", "animated bounceOutLeft")
        setTimeout(() => $lose.css("display", "none"), 1000)
        setTimeout(() => $lose.removeClass(), 1000)
        setTimeout(() => $lose.attr("class", "modal"), 1000)
        this.pattern.length = 0
        this.patternCheck = []
        this.patternCheckCounter = 0
        this.firstPlay = false
        this.level = 1
        this.round = 1
        this.lives = 10
        this.setUpLevel()
        })
    }
    if (this.youLose === false) {
        const $win = $("#youWin")
        setTimeout(() => {
            $win.attr("class", "animated bounceInLeft")
            $win.css("display", "block")
        }, 1000)
        $win.removeClass()
        $win.on("click", () => {
            $win.attr("class", "animated bounceOutRight")
            setTimeout(() => $win.css("display", "none"), 1000)
            setTimeout(() => $win.removeClass(), 1000)
            setTimeout(() => $win.attr("class", "modal"), 1000)
            this.pattern.length = 0
            this.patternCheck = []
            this.patternCheckCounter = 0
            this.firstPlay = false
            this.level = 1
            this.round = 1
            this.lives = 10
            this.setUpLevel()
            })
        }
},

checkInput(flashToCheck) {
    if (flashToCheck === this.patternCheck[this.patternCheckCounter]) {
        this.patternCheckCounter += 1
            if (this.patternCheckCounter === this.patternCheck.length) {
                this.round++
                $round.text(this.round)
                setTimeout(() => $("div").removeClass(), 1000)
                this.patternCheck = []
                this.patternCheckCounter = 0
                this.readyToClick = false
                if (this.round === 6){
                    audio.win.play()
                    this.level++
                    this.round = 1
                    this.pattern.length = 0
                    this.patternCheck = []
                    this.patternCheckCounter = 0
                    this.setUpLevel()
                }
                else if (this.level === 3 && this.round === 6) {
                    audio.win.play()
                    this.pattern.length = 0
                    this.patternCheck = []
                    this.patternCheckCounter = 0
                    this.finalModal()
                }
                else {
                    this.displayRandomPattern()
                }
            }
        }
    else {
        audio.select.pause()
        audio.error.play()
        this.patternCheckCounter = 0
        $("main").attr("class", "animated jello")
        setTimeout(() => $("main").removeClass(), 750)
        this.lives--
        $lives.text(this.lives)
        $round.text(this.round)
        this.readyToClick = false
        if (this.lives === 0){
            audio.error.pause()
            audio.fail.play()
            this.youLose = true
            this.readyToClick = false
            this.finalModal()
        } else {
            this.displayRandomPattern()
            }
        }
    }
}

const audio = {
    error : new Audio("audio/error.mp3"),

    fail : new Audio("audio/fail.mp3"),

    select : new Audio("audio/select.mp3"),

    win : new Audio("audio/win.mp3")
}

game.setUpLevel()