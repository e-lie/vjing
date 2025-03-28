///////////////////// P5 helper functions

// Define the four colors for your gradient (add these before setup function)
const gradientColors = [
    { r: 0, g: 0, b: 0 },       // Color 1: Black
    { r: 255, g: 0, b: 100 },   // Color 2: Pink/Red
    { r: 0, g: 150, b: 255 },   // Color 3: Blue
    { r: 255, g: 255, b: 0 },    // Color 4: Yellow
    { r: 255, g: 255, b: 255 }  // Color 5: White
];
  
// Function to interpolate between colors in the gradient
function getBGColor(position) {
    // Ensure position is between 0 and 1
    position = constrain(position, 0, 1);
    
    // Calculate which segment of the gradient we're in
    // With 4 colors, we have 3 segments (0-1, 1-2, 2-3)
    const numSegments = gradientColors.length - 1;
    const segmentSize = 1 / numSegments;
    
    // Find the segment indices
    const segmentIndex = Math.min(Math.floor(position / segmentSize), numSegments - 1);
    const colorStart = gradientColors[segmentIndex];
    const colorEnd = gradientColors[segmentIndex + 1];
    
    // Calculate the position within the current segment (0 to 1)
    const segmentPosition = (position - segmentIndex * segmentSize) / segmentSize;
    
    // Interpolate between the two colors
    return {
      r: lerp(colorStart.r, colorEnd.r, segmentPosition),
      g: lerp(colorStart.g, colorEnd.g, segmentPosition),
      b: lerp(colorStart.b, colorEnd.b, segmentPosition)
    };
}