import next from "next"
import { SETTINGS } from "src/styles/settings"

let SECONDARY = SETTINGS.secondary
let TERTIARY = SETTINGS.tertiary

export interface ISnakePlatform {
    pos: IPos
    width: number, 
    height: number, 
    size: number,
    swipeDirection: number,
    type: 'tiny' | 'normal' | 'fullscreen'
}

export interface ISnake {
    body: ISnakeBlock[]
    color: string
    direction: number
    length: number
    platformWidth: number
    platformHeight: number
    size: number
}

export interface IBlock {
    color: string,
    stroke: string,
    pos: IPos,
    width: number, 
    height: number, 
}

export interface ISnakeBlock extends IBlock {
    nextPos: IPos,
}

export interface IPos {
    x: number, 
    y: number
}

export class SnakePlatform {
    pos: IPos
    width: number
    height: number

    constructor(obj) {
        this.pos = obj.pos
        this.width = obj.width
        this.height = obj.height
    }
}

export interface IFood extends IBlock {
    platformWidth: number,
    platformHeight: number,
    size: number,
}

export class Food {
    color: string
    pos: IPos
    platformWidth: number
    platformHeight: number
    size: number
    stroke: string
    width: number
    height: number

    constructor(obj) {
        this.color = obj.color
        this.stroke = obj.stroke
        this.pos = obj.pos
        this.platformWidth = obj.platformWidth
        this.platformHeight = obj.platformHeight
        this.size = obj.size

        this.width = obj.platformWidth * obj.size
        this.height = obj.platformWidth * obj.size
    }

    reposition () { 
        let rows = Math.pow(this.size, -1)
        let columns = Math.floor(this.platformHeight / this.height)
        let randX = Math.floor(Math.random() * rows)
        let randY = Math.floor(Math.random() * columns)
        let x = this.platformWidth * (this.size * randX)
        let y = this.platformWidth * (this.size * randY)
        this.setPosition({x, y})
    }

    setPosition(pos: IPos) {
        this.pos = pos
    }
}

export class Snake {
    body: ISnakeBlock[]
    color: string
    direction: number
    length: number
    platformWidth: number
    platformHeight: number
    size: number
    snakeMoves: number

    constructor(obj) {
        this.color = obj.color
        this.length = obj.length
        this.platformWidth = obj.platformWidth
        this.platformHeight = obj.platformHeight
        this.size = obj.platformWidth * obj.size

        this.body = []
        this.direction = 3
        this.snakeMoves = 0

        this.init()
    }

    // Init Snake
    init () {
        // Create body
        for(var i = 0; i < this.length; i++) {
            this.addSnakeBlock()
        }
    }

    addSnakeBlock () {
        let temp: ISnakeBlock
        temp = {
            color: this.color, 
            stroke: this.color,
            nextPos: { x: 0, y: 0 },
            pos: { x: 0, y: 0 },
            width: this.size, 
            height: this.size
        }
        this.body.push(temp)
    }

    // Controls
    setDirection (direction) {
        this.direction = direction
    }

    turnSnake (action: 'left' | 'right') {
        let direction = this.direction
        switch(direction) {
            case 1:
            case 2:
                (action === 'right') ? this.turnClockwise() : this.turnAntiClockwise()
                break
            case 3:
            case 4:
                (action === 'right') ? this.turnAntiClockwise() : this.turnClockwise()
                break
            default:
                break
        }
    }

    turnClockwise () {
        let direction = ((this.direction + 1) % 4)
        if(direction === 0) {
            direction = 4
        }
        this.setDirection(direction)    }

    turnAntiClockwise () {
        let direction = ((this.direction - 1) % 4)
        if(direction === 0) {
            direction = 4
        }
        this.setDirection(direction)
    }

    // Move Snake
    setPos(i: number, pos: IPos) {
        this.body[i].pos = pos
    }

    setNextPos (i: number, nextPos: IPos) {
        this.body[i].nextPos = nextPos
    }

    setHeadNextPos (direction) {
        this.setDirection(direction)
        let head = this.body[0]

        switch(direction) {
            case 1:
                // if within boundries
                var nextY = head.pos.y - this.size
                if(nextY < -1) nextY = (this.platformHeight - this.size)
                this.setNextPos(0, {
                    ...head.pos,
                    y: nextY
                })
                break
            case 2:
                var nextX = head.pos.x + this.size
                if(nextX > (this.platformWidth - (this.size - 1))) nextX = 0
                this.setNextPos(0, {
                    ...head.pos,
                    x: nextX
                })
                break
            case 3:
                var nextY = head.pos.y + this.size
                if(nextY > (this.platformHeight - (this.size - 1))) nextY = 0
                this.setNextPos(0, {
                    ...head.pos,
                    y: nextY 
                })
                break
            case 4:
                var nextX = head.pos.x - this.size
                if(nextX < -1) nextX = (this.platformWidth - this.size)
                this.setNextPos(0, {
                    ...head.pos,
                    x: nextX
                })
                break
            default:
                break
        }
    }

    moveToNextPos(i: number) {
        this.setPos(i, this.body[i].nextPos)
        if(i !== 0) {
            this.setNextPos(i, this.body[i-1].pos)
        }
    }

    moveSnake() {
        if(this.snakeMoves >= this.body.length) {
            for(var i = 0; i < this.body.length; i++) {
                this.moveToNextPos(i)
            }
        } else {
            for(var i = 0; i < (this.snakeMoves + 1); i++) {
                this.moveToNextPos(i)
            }
            this.snakeMoves++
        }
    }

    distanceTo (from:IPos, to:IPos) {
        let xDiff = Math.abs(from.x - to.x)
        let yDiff = Math.abs(from.y - to.y)
        return [ xDiff, yDiff ]
    }

    isHit (block: IBlock) {
        const [ xDiff, yDiff ] = this.distanceTo(this.body[0].pos, block.pos)
        if(xDiff < (this.size / 2) && yDiff < (this.size / 2)) {
            return true
        }
        return false
    }

    growSnake () {
        this.addSnakeBlock()
    }

}