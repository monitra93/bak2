// d3.select('#delBtn').classed('hiddenElement', true);

if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i))
 {
    d3.select('#delBtn').classed('hiddenElement', false);
 }

d3.select('#saveAsImg').on('click', () => {

    console.log('clicked');
    const svg =document.getElementsByTagName('svg')[0];
    const name="plot.png";

    saveSvgAsPng(svg, name);
});