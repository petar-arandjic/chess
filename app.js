import express from 'express'
import {moveBishop, moveKnight, movePawn, moveRook} from "./figures.js";

const PORT = 4002
const app = express();

app.use(express.json())

const figures = {
    1: {
        type: "pawn",
        color: "black",
        x: 1,
        y: 2
    },
    9: {
        type: "pawn",
        color: "white",
        x: 1,
        y: 7
    },
    17: {
        type: "rook",
        color: "black",
        x: 1,
        y: 1
    },
    19: {
        type: "knight",
        color: "black",
        x: 1,
        y: 1
    },
}

const board = {
    y: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
    },
    x: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
    }
}

let figura = {
    x: 2,
    y: 6
}

let figure = {
    "rook": {
        x: 2,
        y: 6
    },
    "bishop": {
        x: 3,
        y: 6
    },
    "pawn": {

    }
}

app.post('/moveRook', (req, res) => {
    const { x, y } = req.body
    try {
        figure.rook = moveRook(figure.rook, { x, y })
        res.json(figura)
    } catch (e) {
        res.json({ message: e.message })
    }
})

app.post('/moveKnight/:id', (req, res) => {
    const { x, y } = req.body
    const id = req.params.id
    try {
        const legalCords = moveKnight(figures, id, { x, y })
        figures[id].x = legalCords.x
        figures[id].y = legalCords.y
        res.json(legalCords)
    } catch (e) {
        res.json({message: e.message})
    }
})

app.post('/movePawn/:id', (req, res) => {
    const { x, y } = req.body
    const id = req.params.id
    try {
        const legalCords = movePawn(figures, id, { x, y })
        figures[id].x = legalCords.x
        figures[id].y = legalCords.y
        res.json(legalCords)
    } catch (e) {
        res.json({message: e.message})
    }
})

app.post('/moveBishop', (req, res) => {
    const { x, y } = req.body
    try {
        figure.bishop = moveBishop(figure.bishop, { x, y })
        res.json(figure.bishop)
    } catch (e) {
        res.json({ message: e.message })
    }
})

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
})