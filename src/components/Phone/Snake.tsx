import React, { useState, useEffect, useRef } from 'react'
import { SETTINGS } from 'src/styles/settings'
import useKeypress from 'src/hooks/useKeypress'
import useAnimationFrame from 'src/hooks/useAnimationFrame'
import useClick from 'src/hooks/useClick'
import { Food, Snake, ISnake, ISnakePlatform, IBlock, ISnakeBlock, IPos } from './lib/snake'

import styles from './Snake.module.scss'

export const SnakePlatform: React.FC<ISnakePlatform> = ({ pos, size, width, height, swipeDirection, type }) => {
    
    let BACKGROUND = SETTINGS.background
    let SECONDARY = SETTINGS.secondary
    let TERTIARY = SETTINGS.tertiary

    const [isSwipe, setIsSwipe] = useState(true)

    const [food, setFood] = useState(new Food({
        color: SECONDARY, 
        stroke: 'black',
        pos: { x: 0, y: 0 }, 
        platformWidth: width, 
        platformHeight: height,
        size
    }))

    const[snake, setSnake] = useState(new Snake({
        color: TERTIARY, 
        length: 6, 
        platformWidth: width, 
        platformHeight: height, 
        size
    }))
    
    const [count, setCount] = useState(0)

    // Controls 
    useKeypress('ArrowUp', () => {
        snake.setDirection(1)
        setSnake(snake)
        setIsSwipe(false)
    });

    useKeypress('ArrowRight', () => {
        snake.setDirection(2)
        setSnake(snake)
        setIsSwipe(false)
    });

    useKeypress('ArrowDown', () => {
        snake.setDirection(3)
        setSnake(snake)
        setIsSwipe(false)
    });

    useKeypress('ArrowLeft', () => {
        snake.setDirection(4)
        setSnake(snake)
        setIsSwipe(false)
    });

    useAnimationFrame(deltaTime => {
        setCount(prevCount => (prevCount + deltaTime * 0.05) % 100)
    })

    // useEffect(() => {
    //     snake.setDirection(swipeDirection)
    // }, [snake, swipeDirection])

    useEffect(() => {
        snake.setHeadNextPos(snake.direction)
        if(count > 5) {
            // Move the snake
            snake.moveSnake()
            setSnake(snake)

            if(snake.isHit(food)) {
                food.reposition()
                snake.growSnake()
                setFood(food)
                setSnake(snake)
            }
            
            setCount(0)
        }
    }, [count, food, snake])

    const leftTouchPadAction = () => {
        snake.turnAntiClockwise()
        setSnake(snake)
    }

    const rightTouchPadAction = () => {
        snake.turnClockwise()
        setSnake(snake)
    }

    useClick(() => leftTouchPadAction(), () => rightTouchPadAction())

    
    return (
        <svg xmlns="http://www.w3.org/2000/svg" x={pos.x} y={pos.y} width={width} height={height} fill='#000'>
            
            <SnakeComp snake={snake} type={type}/>
            <FoodComp food={food} type={type}/>
            
        </svg>
    )
}

interface SnakeProps {
    snake: ISnake,
    type: 'tiny' | 'normal' | 'fullscreen'
}

const SnakeComp: React.FC<SnakeProps> = ({ snake, type }) => {
    let snakeBlocks = snake.body.map((block, i) => (
            <SnakeBlock key={i}
                        nextPos={block.nextPos}
                        pos={block.pos} 
                        width={snake.size}
                        height={snake.size}
                        color={block.color}
                        stroke={'black'}
            />
        )
    )

    let snakeBlocksShadow = snake.body.map((block, i) => (
        <SnakeBlock key={i}
                    nextPos={block.nextPos}
                    pos={{
                        x: (type === 'tiny') ? block.pos.x + 10 : block.pos.x,
                        y: block.pos.y + 10
                    }} 
                    width={snake.size}
                    height={snake.size}
                    color={'white'}
                    stroke={'black'}
        />
    )
)
    
    return (
        <g> 
            {snakeBlocksShadow}
            {snakeBlocks}
        </g>
    )
}

const SnakeBlock: React.FC<ISnakeBlock> = ({ pos, width, height, color, stroke }) => {
    return (
        <rect x={pos.x} 
              y={pos.y} 
              width={width} 
              height={height} 
              fill={color} 
              stroke={stroke} 
              style={{ transition: 'all .1s linear' }}
              strokeWidth={2}
        />
    )
}

interface FoodProps {
    food: IBlock, 
    type: 'tiny' | 'normal' | 'fullscreen'
}

const FoodComp: React.FC<FoodProps> = ({ food, type }) => {
    return (
        <>
            <rect x={(type === 'tiny') ? food.pos.x + 10 : food.pos.x} 
                y={food.pos.y + 10} 
                width={food.width} 
                height={food.height} 
                fill={'white'} 
                stroke={'black'} 
                strokeWidth={2}
            />
            <rect x={food.pos.x} 
                y={food.pos.y} 
                width={food.width} 
                height={food.height} 
                fill={food.color} 
                stroke={'black'} 
                strokeWidth={2}
            />
        </>
    )
}