export const validateCoordinates = (x, y) => {
    if (x < 1 || x > 8) {
        return false
    }

    if (y < 1 || y > 8) {
        return false
    }

    return true
}

export const moveRook = (oldCords, newCords) => {
    let results = {
        x: null,
        y: null,
    }
    if (oldCords.x === newCords.x && oldCords.y !== newCords.y) {
        results.y = newCords.y
        results.x = newCords.x
    }

    if (oldCords.y === newCords.y && oldCords.x !== newCords.y) {
        results.x = newCords.x
        results.y = newCords.y
    }

    if ((!results.x && !results.y) || !validateCoordinates(results.x, results.y)) {
        throw new Error("move not allowed")
    }

    return results
}

export const moveBishop = (oldCords, newCords) => {
    const newX = oldCords.x - newCords.x
    const newY = oldCords.y - newCords.y

    if(Math.abs(newX) !== Math.abs(newY) || !validateCoordinates(newCords.x, newCords.y)) {
        throw new Error("move not allowed")
    }

    return {
        x: newCords.x,
        y: newCords.y,
    }
}

export const movePawn = (figures, id, newCords) => {
    if (!validateCoordinates(newCords.x, newCords.y)) {
        throw new Error("illegal move")
    }

    if (!figures[id] || figures[id].type !== "pawn") {
        throw new Error("invalid figure type")
    }

    const pawn = figures[id]

    if (newCords.x !== pawn.x) {
        // TODO add logic for eating
        throw new Error("illegal move")
    }

    let diffForY
    if (pawn.color === "black") {
        diffForY = newCords.y - pawn.y

        // check move for start position
        if (pawn.y === 2 && diffForY > 2) {
            throw new Error("illegal move")
        }

        // check move for non-start position
        if (pawn.y !== 2 && diffForY > 1) {
            throw new Error("illegal move")
        }
    } else {
        diffForY = pawn.y - newCords.y

        // check move for start position
        if (pawn.y === 7 && diffForY > 2) {
            throw new Error("illegal move")
        }

        // check move for non-start position
        if (pawn.y !== 7 && diffForY > 1) {
            throw new Error("illegal move")
        }
    }

    if (diffForY < 1) {
        throw new Error("illegal move")
    }

    return newCords
}

export const moveKnight = (figures, id, newCords) => {
    const knight = figures[id]

    if (knight.type !== "knight") {
        throw new Error("figure is not the knight")
    }

    if (!validateCoordinates(newCords.x, newCords.y)) {
        throw new Error("illegal move")
    }

    // This par will determinate how many fields figure has moved
    const xMoved = Math.abs(knight.x - newCords.x)
    const yMoved = Math.abs(knight.y - newCords.y)

    if (!((xMoved === 2 && yMoved === 1) || (yMoved === 2 && xMoved === 1))) {
        throw new Error("illegal move")
    }

    return newCords
}
