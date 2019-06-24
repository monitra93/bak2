d3.select('#saveAsImg').on('click', () => {

    console.log('clicked');
    const svg =document.getElementsByTagName('svg')[0];
    const name="plot.png";

    saveSvgAsPng(svg, name);
});