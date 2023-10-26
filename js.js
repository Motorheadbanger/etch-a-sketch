let size = 16;
let changeSize = document.querySelector('#size');
let reset = document.querySelector('#reset');

generateGrid(size);

changeSize.addEventListener('click', promptUser)
reset.addEventListener('click', resetGrid)

function changeColour(element) {
    let colour = element.style.backgroundColor;
    let newColour = element.style.backgroundColor;

    if (colour == '') {
        let red = Math.floor(Math.random() * 255);
        let green = Math.floor(Math.random() * 255);
        let blue = Math.floor(Math.random() * 255);

        newColour = `rgba(${red}, ${green}, ${blue}, 0.1)`;
        element.style.backgroundColor = newColour;
    } else {
        let parsedColours = colour.split('(').join('').split(', ');
        let red = parsedColours[0].substring(4);
        let green = parsedColours[1];
        let blue = parsedColours[2];
        let alpha = parsedColours[3].substring(0, parsedColours[3].length - 1);
        let parsedAlpha = parseFloat(alpha);

        if (parsedAlpha == 1)
            return;

        parsedAlpha = parsedAlpha + 0.1;
        newColour = `rgba(${red}, ${green}, ${blue}, ${parsedAlpha})`
        element.style.backgroundColor = newColour;
    }

    element.style.border = `1px dotted ${newColour}`;
}

function generateGrid(size) {
    let box = document.querySelector('#box');
    let boxesInARowAmount = size;
    let boxHeight = window.getComputedStyle(box).height;
    let dimensions = `${parseInt(boxHeight) / boxesInARowAmount - 2}px`
    
    for (let i = 0; i < boxesInARowAmount * boxesInARowAmount; i++) {
        let cell = document.createElement('div');
        cell.setAttribute('class', 'cell');
        cell.style.height = dimensions;
        cell.style.width = dimensions;
        cell.style.border = '1px dotted rgba(0,0,255,0.25)';
        cell.addEventListener('mouseenter', event => changeColour(event.target))
        box.appendChild(cell);
    }
}

function promptUser() {
    size = prompt('New grid size? (max 100)');

    if (size < 1 || size > 100) {
        alert('Incorrect grid size');
        promptUser();
        return;
    }

    resetGrid();
}

function resetGrid() {
    let cells = document.querySelectorAll('.cell');

    for (let cell of cells) {
        cell.remove();
    }

    generateGrid(size);
}