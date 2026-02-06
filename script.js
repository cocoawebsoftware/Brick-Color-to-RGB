// Function to convert Brick colors to RGB, HEX, and HSV formats

function brickColorConverter(brickColor) {
    const colorMap = {
        "Red": { rgb: [255, 0, 0], hex: "#FF0000", hsv: [0, 100, 100] },
        "Green": { rgb: [0, 255, 0], hex: "#00FF00", hsv: [120, 100, 100] },
        "Blue": { rgb: [0, 0, 255], hex: "#0000FF", hsv: [240, 100, 100] },
        // Add more colors as needed
    };

    return colorMap[brickColor] || { rgb: [0, 0, 0], hex: "#000000", hsv: [0, 0, 0] };
}

// Example usage:
const color = brickColorConverter("Red");
console.log(color); // { rgb: [255, 0, 0], hex: '#FF0000', hsv: [0, 100, 100] }
