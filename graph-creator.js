document.onload = (function (d3, saveAs, Blob, undefined) {
    "use strict";








    // ------------------define graphcreator object----------------------
    let GraphCreator = function (svg, nodes, edges) {
        let thisGraph = this;
        thisGraph.idct = 0;



        thisGraph.nodes = nodes || [];
        thisGraph.edges = edges || [];

        thisGraph.state = {
            selectedNode: null,
            selectedEdge: null,
            mouseDownNode: null,
            mouseEnterNode: null,
            mouseDownLink: null,
            justDragged: false,
            justScaleTransGraph: false,
            lastKeyDown: -1,
            shiftNodeDrag: false,
            selectedText: null,
        };

        /*// define arrow markers for graph links
        let defs = svg.append('svg:defs');
        defs.append('svg:marker')
            .attr('id', 'end-arrow')
            .attr('viewBox', '0 -5 10 10')
            .attr('refX', "32")
            .attr('markerWidth', 3.5)
            .attr('markerHeight', 3.5)
            .attr('orient', 'auto')
            .append('svg:path')
            .attr('d', 'M0,-5L10,0L0,5');

        // define arrow markers for leading arrow
        defs.append('svg:marker')
            .attr('id', 'mark-end-arrow')
            .attr('viewBox', '0 -5 10 10')
            .attr('refX', 7)
            .attr('markerWidth', 3.5)
            .attr('markerHeight', 3.5)
            .attr('orient', 'auto')
            .append('svg:path')
            .attr('d', 'M0,-5L10,0L0,5');*/






        thisGraph.svg = svg;
        thisGraph.svgG = svg.append("g") //fügen gruppe zu svg hinzu
            .classed(thisGraph.consts.graphClass, true);
        let svgG = thisGraph.svgG;


        //sections in groups:
        var friendsSection = svgG.append("g");
        var familySection = svgG.append("g");
        var profSection = svgG.append("g");
        var colleagueSection = svgG.append("g");

        //labels freunde:
        var text = friendsSection.append("text")
            .attr("x", width/2-"350")
            .attr("y", height/2-"450")
            .attr("dy", "0rem")
            .text("FreundInnen")
            .attr("font-family", "sans-serif")
            .attr("font-size", "2rem")
            .attr("fill", "black");
        var text = friendsSection.append("text")
            .attr("x", width/2-"350")
            .attr("y", height/2-"450")
            .attr("dy", "2rem")
            .text("& Bekannte")
            .attr("font-family", "sans-serif")
            .attr("font-size", "2rem")
            .attr("fill", "black");

        var topLeftArcOutside = friendsSection.append("path")
            .attr('class', 'friendsO')
            .attr("d", "M " + width / 2 + "," + height / 2 + " v-450 a450,450 0 0,0 -450,450 z")
            .attr("fill", "#3399ff")
            .attr("stroke-width", "2")
            .attr("stroke", "white")
        var topLeftArcMiddle = friendsSection.append("path")
            .attr('class', 'friendsM')
            .attr("d", "M " + width / 2 + "," + height / 2 + " v-300 a300,300 0 0,0 -300,300 z")
            .attr("fill", "blue")
            .attr("stroke-width", "2")
            .attr("stroke", "white")
        var topLeftArcInside = friendsSection.append("path")
            .attr('class', 'friendsI')
            .attr("d", "M " + width / 2 + "," + height / 2 + " v-150 a150,150 0 0,0 -150,150 z")
            .attr("fill", "darkblue")
            .attr("stroke-width", "2")
            .attr("stroke", "white")

        //labels familie:
        var text = familySection.append("text")
            .attr("x", width/2-"-250") //minus und minus ergibt plus 
            .attr("y", height/2-"450")
            .attr("dy", "0rem")
            .text("Familie")
            .attr("font-family", "sans-serif")
            .attr("font-size", "2rem")
            .attr("fill", "black");

        var topRightArcOutside = familySection.append("path")
            .attr('class', 'familyO')
            .attr("d", "M " + width / 2 + "," + height / 2 + " v-450 a450,450 0 0,1 450,450 z")
            .attr("fill", "#3399ff")
            .attr("stroke-width", "2")
            .attr("stroke", "white")
        var topRightArcMiddle = familySection.append("path")
            .attr('class', 'familyM')
            .attr("d", "M " + width / 2 + "," + height / 2 + " v-300 a300,300 0 0,1 300,300 z")
            .attr("fill", "blue")
            .attr("stroke-width", "2")
            .attr("stroke", "white")
        var topRightArcInside = familySection.append("path")
            .attr('class', 'familyI')
            .attr("d", "M " + width / 2 + "," + height / 2 + " v-150 a150,150 0 0,1 150,150 z")
            .attr("fill", "darkblue")
            .attr("stroke-width", "2")
            .attr("stroke", "white")

        //labels prof helferinnen:
        var text = profSection.append("text")
            .attr("x", width/2-"-250")
            .attr("y", height/2-"-450")
            .attr("dy", "0rem")
            .text("Professionelle")
            .attr("font-family", "sans-serif")
            .attr("font-size", "2rem")
            .attr("fill", "black");
        var text = friendsSection.append("text")
            .attr("x", width/2-"-250")
            .attr("y", height/2-"-450")
            .attr("dy", "2rem")
            .text("HelferInnen")
            .attr("font-family", "sans-serif")
            .attr("font-size", "2rem")
            .attr("fill", "black");

        var bottomRightArcOutside = profSection.append("path")
            .attr('class', 'professionalsO')
            .attr("d", "M " + width / 2 + "," + height / 2 + " v450 a-450,-450 0 0,0 450,-450 z")
            .attr("fill", "#3399ff")
            .attr("stroke-width", "2")
            .attr("stroke", "white")
        var bottomRightArcMiddle = profSection.append("path")
            .attr('class', 'professionalsM')
            .attr("d", "M " + width / 2 + "," + height / 2 + " v300 a-300,-300 0 0,0 300,-300 z")
            .attr("fill", "blue")
            .attr("stroke-width", "2")
            .attr("stroke", "white")
        var bottomRightArcInside = profSection.append("path")
            .attr('class', 'professionalsI')
            .attr("d", "M " + width / 2 + "," + height / 2 + " v150 a-150,-150 0 0,0 150,-150 z")
            .attr("fill", "darkblue")
            .attr("stroke-width", "2")
            .attr("stroke", "white")

        //labels kolleginnen:
        var text = profSection.append("text")
            .attr("x", width/2-"350")
            .attr("y", height/2-"-450")
            .attr("dy", "0rem")
            .text("KollegInnen")
            .attr("font-family", "sans-serif")
            .attr("font-size", "2rem")
            .attr("fill", "black");

        var bottomLeftArcOutside = colleagueSection.append("path")
            .attr('class', 'colleaguesO')
            .attr("d", "M " + width / 2 + "," + height / 2 + " v450 a450,-450 0 0,1 -450,-450 z")
            .attr("fill", "#3399ff")
            .attr("stroke-width", "2")
            .attr("stroke", "white")
        var bottomLeftArcMiddle = colleagueSection.append("path")
            .attr('class', 'colleaguesM')
            .attr("d", "M " + width / 2 + "," + height / 2 + " v300 a300,-300 0 0,1 -300,-300 z")
            .attr("fill", "blue")
            .attr("stroke-width", "2")
            .attr("stroke", "white")
        var bottomLeftArcInside = colleagueSection.append("path")
            .attr('class', 'colleaguesI')
            .attr("d", "M " + width / 2 + "," + height / 2 + " v150 a150,-150 0 0,1 -150,-150 z")
            .attr("fill", "darkblue")
            .attr("stroke-width", "2")
            .attr("stroke", "white")








        // displayed when dragging between nodes 
        thisGraph.dragLine = svgG.append('svg:path')
            .attr('class', 'link dragline hidden')
            .attr('d', 'M0,0L0,0')








        // svg nodes and edges --> Gruppen <g> erstellen
        thisGraph.paths = svgG.append("g").selectAll("g");
        thisGraph.circles = svgG.append("g").selectAll("g");











        thisGraph.drag = d3.drag()
            .subject(function (d) {
                console.log("nodes werden gedragged");
                return { x: d.x, y: d.y, r: d.r };
            })
            .on("drag", function (args) {
                thisGraph.state.justDragged = true;
                thisGraph.dragmove.call(thisGraph, args);
            })
            .on("end", function (d) {
                // todo check if edge-mode is selected
                var mouse = d3.mouse(this);
                var elem = document.elementFromPoint(mouse[0], mouse[1]);
                if (thisGraph.state.shiftNodeDrag) {
                    thisGraph.dragEnd.call(thisGraph, d3.select(this), thisGraph.state.mouseEnterNode)
                }

            });



        // listen for key events
        d3.select(window).on("keydown", function () {
            thisGraph.svgKeyDown.call(thisGraph);
            console.log("taste ist unten")
        })
            .on("keyup", function () {
                thisGraph.svgKeyUp.call(thisGraph);
                console.log("taste ist oben")
            });
        svg.on("mousedown", function (d) {
            thisGraph.svgMouseDown.call(thisGraph, d);
            console.log("maus ist unten");
            //if (d3.event.shiftKey) {
            if (isChecked == true) {
                d3.event.stopImmediatePropagation();
                console.log("ischecked ist true + maus unten");
            }
        });
        svg.on("mouseup", function (d) {
            thisGraph.svgMouseUp.call(thisGraph, d);
            console.log("maus ist oben");
        });



        // listen for dragging -- karte draggen
        let dragSvg = d3.zoom()
            .on("zoom", function () {
                //if (d3.event.sourceEvent.shiftKey) { 
                if (isChecked == true) {
                    // TODO  the internal d3 state is still changing
                    return false;
                } else {
                    thisGraph.zoomed.call(thisGraph);
                }
                return true;
            })
            .on("start", function () {
                var ael = d3.select("#" + thisGraph.consts.activeEditId).node();
                if (ael) {
                    ael.blur();
                }
                //if (!d3.event.sourceEvent.shiftKey) d3.select('#chart').style("cursor", "move");
                if (!isChecked == false) d3.select('#chart').style("cursor", "move");
            })
            .on("end", function () {
                d3.select('#chart').style("cursor", "auto");
            });

        svg.call(dragSvg).on("dblclick.zoom", null);



        // listen for resize
        window.onresize = function () {
            thisGraph.updateWindow(svg);
        };



        // handle download data
        d3.select("#download-input").on("click", function () {
            let saveEdges = [];
            thisGraph.edges.forEach(function (val, i) {
                saveEdges.push({ source: val.source.id, target: val.target.id });
            });
            let blob = new Blob([window.JSON.stringify({
                "nodes": thisGraph.nodes,
                "edges": saveEdges
            })], { type: "text/plain;charset=utf-8" });
            saveAs(blob, "mydag.json");
        });




        // handle uploaded data
        d3.select("#upload-input").on("click", function () {
            document.getElementById("hidden-file-upload").click();
        });
        d3.select("#hidden-file-upload").on("change", function () {
            if (window.File && window.FileReader && window.FileList && window.Blob) {
                let uploadFile = this.files[0];
                let filereader = new window.FileReader();

                filereader.onload = function () {
                    let txtRes = filereader.result;
                    // TODO better error handling
                    try {
                        let jsonObj = JSON.parse(txtRes);
                        thisGraph.deleteGraph(true);
                        thisGraph.nodes = jsonObj.nodes;
                        thisGraph.setIdCt(jsonObj.nodes.length + 1);
                        let newEdges = jsonObj.edges;
                        newEdges.forEach(function (e, i) {
                            newEdges[i] = {
                                source: thisGraph.nodes.filter(function (n) {
                                    return n.id === e.source;
                                })[0],
                                target: thisGraph.nodes.filter(function (n) {
                                    return n.id === e.target;
                                })[0]
                            };
                        });
                        thisGraph.edges = newEdges;
                        thisGraph.updateGraph();
                    } catch (err) {
                        window.alert("Error parsing uploaded file\nerror message: " + err.message);
                        return;
                    }
                };
                filereader.readAsText(uploadFile);

            } else {
                alert("Your browser won't let you save this graph -- try upgrading your browser to IE 10+ or Chrome or Firefox.");
            }

        });




        // handle delete graph
        d3.select("#delete-graph").on("click", function () {
            thisGraph.deleteGraph(false);
        });



    };

    //----------------------------------------------------graphCreator function ENDE -----------------------------------------------------------







    var isChecked = new Boolean(false);
    d3.select("#myCheckbox").on("change", function () {
        if (d3.select("#myCheckbox").property("checked")) {
            isChecked = true;
            console.log(isChecked);
        } else {
            isChecked = false;
            console.log(isChecked);
        }
    });





    GraphCreator.prototype.setIdCt = function (idct) {
        this.idct = idct;
    };








    GraphCreator.prototype.consts = {
        selectedClass: "selected",
        connectClass: "connect-node",
        circleGClass: "conceptG",
        arcGClass: "arcG",
        graphClass: "graph",
        activeEditId: "active-editing",
        BACKSPACE_KEY: 8,
        DELETE_KEY: 46,
        ENTER_KEY: 13,
        nodeRadius: 16,
        rectHeight: 44,
        rectWidth: 44,
        rectRadX: 44,
    };








    //---------------------------------------------  /* PROTOTYPE FUNCTIONS */ --------------------------------------------------

    GraphCreator.prototype.dragmove = function (d) {
        let thisGraph = this;
        //beim aufziehen der links: (desktop)
        //if (thisGraph.state.shiftNodeDrag && isChecked==true) {
        if (isChecked == true) { //wenn häkchen gesetzt
            thisGraph.dragLine.attr('d', 'M' + (d.x + 22) + ',' + (d.y + 22) + 'L' + d3.mouse(thisGraph.svgG.node())[0] + ',' + d3.mouse(this.svgG.node())[1]);
        } else {
            d.x += d3.event.dx;
            d.y += d3.event.dy;
            thisGraph.updateGraph();
        }
    };

    GraphCreator.prototype.deleteGraph = function (skipPrompt) {
        let thisGraph = this,
            doDelete = true;
        if (!skipPrompt) {
            doDelete = window.confirm("Press OK to delete this graph");
        }
        if (doDelete) {
            thisGraph.nodes = [];
            thisGraph.edges = [];
            thisGraph.updateGraph();
        }
    };


    /* select all text in element: taken from http://stackoverflow.com/questions/6139107/programatically-select-text-in-a-contenteditable-html-element */
    GraphCreator.prototype.selectElementContents = function (el) {
        let range = document.createRange();
        range.selectNodeContents(el);
        let sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    };


    /* insert svg line breaks: taken from http://stackoverflow.com/questions/13241475/how-do-i-include-newlines-in-labels-in-d3-charts */
    GraphCreator.prototype.insertTitleLinebreaks = function (gEl, title) {
        let words = title.split(/\s+/g),
            nwords = words.length;
        let el = gEl.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "-" + (nwords - 1) * 7.5)
            .attr("dx", 20)
            .attr("fill", "white");

        for (let i = 0; i < words.length; i++) {
            let tspan = el.append('tspan').text(words[i]);
            if (i > 0)
                tspan.attr('x', 20).attr('dy', '15');
        }
    };


    // remove edges associated with a node
    GraphCreator.prototype.spliceLinksForNode = function (node) {
        let thisGraph = this,
            toSplice = thisGraph.edges.filter(function (l) {
                return (l.source === node || l.target === node);
            });
        toSplice.map(function (l) {
            thisGraph.edges.splice(thisGraph.edges.indexOf(l), 1);
        });
    };

    GraphCreator.prototype.replaceSelectEdge = function (d3Path, edgeData) {
        let thisGraph = this;
        d3Path.classed(thisGraph.consts.selectedClass, true);
        if (thisGraph.state.selectedEdge) {
            thisGraph.removeSelectFromEdge();
        }
        thisGraph.state.selectedEdge = edgeData;
    };

    GraphCreator.prototype.replaceSelectNode = function (d3Node, nodeData) {
        let thisGraph = this;
        d3Node.classed(this.consts.selectedClass, true);
        if (thisGraph.state.selectedNode) {
            thisGraph.removeSelectFromNode();
        }
        thisGraph.state.selectedNode = nodeData;
    };

    GraphCreator.prototype.removeSelectFromNode = function () {
        let thisGraph = this;
        thisGraph.circles.filter(function (cd) {
            return cd.id === thisGraph.state.selectedNode.id;
        }).classed(thisGraph.consts.selectedClass, false);
        thisGraph.state.selectedNode = null;
    };

    GraphCreator.prototype.removeSelectFromEdge = function () {
        let thisGraph = this;
        thisGraph.paths.filter(function (cd) {
            return cd === thisGraph.state.selectedEdge;
        }).classed(thisGraph.consts.selectedClass, false);
        thisGraph.state.selectedEdge = null;
    };

    GraphCreator.prototype.pathMouseDown = function (d3path, d) {
        let thisGraph = this,
            state = thisGraph.state;
        d3.event.stopPropagation();
        state.mouseDownLink = d;

        if (state.selectedNode) {
            thisGraph.removeSelectFromNode();
        }

        let prevEdge = state.selectedEdge;
        if (!prevEdge || prevEdge !== d) {
            thisGraph.replaceSelectEdge(d3path, d);
        } else {
            thisGraph.removeSelectFromEdge();
        }
    };

    // mousedown on node
    GraphCreator.prototype.circleMouseDown = function (d3node, d) {
        let thisGraph = this;
        let state = thisGraph.state;
        d3.event.stopPropagation();
        state.mouseDownNode = d;
        console.log(`mousedownnode = ${JSON.stringify(d)}`); //maus auf node gedrückt

        //if (d3.event.shiftKey) { 
        if (isChecked == true) { //wenn häkchen true
            //state.shiftNodeDrag = d3.event.shiftKey; //brauch ich, sonst nur einen path zeichnen möglich 
            state.shiftNodeDrag = d3.select("#myCheckbox").property("checked");
            // reposition dragged directed edge
            thisGraph.dragLine.classed('hidden', false)
                .attr('d', 'M' + d.x + ',' + d.y + 'L' + d.x + ',' + d.y);
            return;
        }
    };








    //place editable text on node in place of svg text *//*
    GraphCreator.prototype.changeTextOfNode = function (d3node, d) {
        let thisGraph = this;
        let consts = thisGraph.consts;
        let htmlEl = d3node.node();
        //console.log("htmlel",htmlEl);
        d3node.selectAll("text").remove();
        let nodeBCR = htmlEl.getBoundingClientRect();
        let curScale = nodeBCR.width / 2; //    44 / 2 = 22
        let placePad = 5 * curScale; // 110
        let useHW = curScale > 1 ? nodeBCR.width * 0.71 : consts.nodeRadius * 1.42; // 44 * 0,71 = 31,24
        // replace with editableconent text
        let d3txt = thisGraph.svg.selectAll("foreignObject")
            .data([d])
            .enter()
            .append("foreignObject")
            .attr("x", nodeBCR.left - 120)
            .attr("y", nodeBCR.top - 230)
            .attr("height", 2 * useHW)
            .attr("width", useHW)
            .attr("height", 200)
            .attr("width", 200)
            .append("xhtml:p")
            .attr("id", consts.activeEditId)
            .attr("contentEditable", "true")
            .style("background-color", "orange")
            .text(d.title)
            .on("mousedown", function (d) {
                d3.event.stopPropagation();
            })
            .on("keydown", function (d) {
                d3.event.stopPropagation();
                // if (d3.event.keyCode == consts.ENTER_KEY && !d3.event.shiftKey) { 
                // if (d3.event.keyCode == consts.ENTER_KEY && isChecked == false) { //eig so,aber dann funkt enter nicht
                if (d3.event.keyCode == consts.ENTER_KEY) {
                    this.blur();
                }
            })
            .on("blur", function (d) {
                d.title = this.textContent;
                thisGraph.insertTitleLinebreaks(d3node, d.title);
                d3.select(this.parentElement).remove();
            });
        return d3txt;
    };


    GraphCreator.prototype.dragEnd = function (d3node, d) {
        console.log('dragend');
        let thisGraph = this,
            state = thisGraph.state,
            consts = thisGraph.consts;
        // reset the states
        state.shiftNodeDrag = false;
        d3node.classed(consts.connectClass, false);

        let mouseDownNode = state.mouseDownNode;
        let mouseEnterNode = state.mouseEnterNode;

        if (state.justDragged) {
            // dragged, not clicked
            state.justDragged = false;
        }

        thisGraph.dragLine.classed("hidden", true);

        if (!mouseDownNode || !mouseEnterNode) return;


        if (mouseDownNode !== d) {
            // we're in a different node: create new edge for mousedown edge and add to graph
            let newEdge = { source: mouseDownNode, target: d };
            let filtRes = thisGraph.paths.filter(function (d) {
                if (d.source === newEdge.target && d.target === newEdge.source) {
                    thisGraph.edges.splice(thisGraph.edges.indexOf(d), 1);
                }
                return d.source === newEdge.source && d.target === newEdge.target;
            });
            if (!filtRes || !filtRes[0] || !filtRes[0].length) {
                thisGraph.edges.push(newEdge);
                thisGraph.updateGraph();
            }
        }


        state.mouseDownNode = null;
        state.mouseEnterNode = null;
        return;
    };



    // mouseup on nodes
    GraphCreator.prototype.circleMouseUp = function (d3node, d) {
        console.log('circle mouse up');
        let thisGraph = this,
            state = thisGraph.state,
            consts = thisGraph.consts;
        // reset the states
        state.shiftNodeDrag = false;
        d3node.classed(consts.connectClass, false);

        //if (d3.event.shiftKey) { ///
        if (isChecked == true) {
            let d3txt = thisGraph.changeTextOfNode(d3node, d);
            let txtNode = d3txt.node();
            thisGraph.selectElementContents(txtNode);
            txtNode.focus();
        } else {
            if (state.selectedEdge) {
                thisGraph.removeSelectFromEdge();
            }
        }

        let prevNode = state.selectedNode;
        if (!prevNode || prevNode.id !== d.id) {
            thisGraph.replaceSelectNode(d3node, d);
        } else {
            thisGraph.removeSelectFromNode();
        }

    }; // end of circles mouseup





    // mousedown on main svg
    GraphCreator.prototype.svgMouseDown = function () {
        this.state.graphMouseDown = true;
    };

    // mouseup on main svg
    GraphCreator.prototype.svgMouseUp = function () {
        let thisGraph = this,
            state = thisGraph.state;
        if (state.justScaleTransGraph) {
            // dragged not clicked
            state.justScaleTransGraph = false;
        } // else if (state.graphMouseDown && d3.event.shiftKey) { 
        else if (state.graphMouseDown && isChecked == true) {
            // clicked not dragged from svg
            let xycoords = d3.mouse(thisGraph.svgG.node()),
                d = { id: thisGraph.idct++, title: "new concept", x: xycoords[0], y: xycoords[1], rx: this.consts.rectRadX };//+++++++++++++++++++++++++++
            thisGraph.nodes.push(d);
            thisGraph.updateGraph();
            // make title of text immediently editable
            let d3txt = thisGraph.changeTextOfNode(thisGraph.circles.filter(function (dval) {
                return dval.id === d.id;
            }), d),
                txtNode = d3txt.node();
            thisGraph.selectElementContents(txtNode);
            txtNode.focus();
        } else if (state.shiftNodeDrag) {
            // dragged from node
            state.shiftNodeDrag = false;
            thisGraph.dragLine.classed("hidden", true);
        }
        state.graphMouseDown = false;
    };

    // keydown on main svg
    GraphCreator.prototype.svgKeyDown = function () {
        let thisGraph = this,
            state = thisGraph.state,
            consts = thisGraph.consts;
        // make sure repeated key presses don't register for each keydown
        if (state.lastKeyDown !== -1) return;

        state.lastKeyDown = d3.event.keyCode;
        let selectedNode = state.selectedNode,
            selectedEdge = state.selectedEdge;

        switch (d3.event.keyCode) {
            case consts.BACKSPACE_KEY:
            case consts.DELETE_KEY:
                d3.event.preventDefault();
                if (selectedNode) {
                    thisGraph.nodes.splice(thisGraph.nodes.indexOf(selectedNode), 1);
                    thisGraph.spliceLinksForNode(selectedNode);
                    state.selectedNode = null;
                    thisGraph.updateGraph();
                } else if (selectedEdge) {
                    thisGraph.edges.splice(thisGraph.edges.indexOf(selectedEdge), 1);
                    state.selectedEdge = null;
                    thisGraph.updateGraph();
                }
                break;
        }
    };




    GraphCreator.prototype.svgKeyUp = function () {
        this.state.lastKeyDown = -1;
    };






    // -------------------------------------call to propagate changes to graph----------------------------------------------------
    GraphCreator.prototype.updateGraph = function () {



        let thisGraph = this,
            consts = thisGraph.consts,
            state = thisGraph.state;

        thisGraph.paths = thisGraph.paths.data(thisGraph.edges, function (d) {
            return String(d.source.id) + "+" + String(d.target.id);
        });
        let paths = thisGraph.paths;





        // update existing paths
        paths.style('marker-end', 'url(#end-arrow)')
            .classed(consts.selectedClass, function (d) {
                return d === state.selectedEdge;
            })
            // .attr("d", line([d.source.x, d.source.y, d.target.x, d.target.y]));
            .attr("d", function (d) {
                return "M" + ((d.source.x) + 22) + "," + ((d.source.y) + 22) + "L" + ((d.target.x) + 22) + "," + ((d.target.y) + 22);
            });



        // remove old links
        paths.exit().remove();






        // add new paths
        paths = paths.enter()
            .append("path")
            .style('marker-end', 'url(#end-arrow)')
            .classed("link", true)
            .attr("d", function (d) {
                return "M" + ((d.source.x) + 22) + "," + ((d.source.y) + 22) + "L" + ((d.target.x) + 22) + "," + ((d.target.y) + 22);
            })
            .merge(paths)
            .on("mouseup", function (d) {
                console.log('mouseup link');
                // state.mouseDownLink = null;
            })
            .on("mousedown", function (d) {
                console.log('mousedown link');
                thisGraph.pathMouseDown.call(thisGraph, d3.select(this), d);
            })

        thisGraph.paths = paths;




        // update existing nodes
        thisGraph.circles = thisGraph.circles.data(thisGraph.nodes, function (d) {
            return d.id;
        });



        // remove old nodes
        thisGraph.circles.exit().remove();



        thisGraph.circles.attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });



        // add new nodes
        let newGs = thisGraph.circles.enter()
            .append("g").merge(thisGraph.circles);

        newGs.classed(consts.circleGClass, true)
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            })
            .on("touchstart", function (d) {
                //d3.event.preventDefault();
                console.log("mouse down -- touch start");
                thisGraph.circleMouseDown.call(thisGraph, d3.select(this), d);
            })

            .on("mouseover", function (d) {
                state.mouseEnterNode = d;
                console.log("mouse over");
                if (state.shiftNodeDrag) {
                    //d3.select(this).selectAll("rect").style("fill", "red");
                    d3.select(this).classed(consts.connectClass, true);
                    console.log("mouse over shiftnodedrag");
                }
            })

            .on("mousedown", function (d) {
                console.log("mouse down");
                thisGraph.circleMouseDown.call(thisGraph, d3.select(this), d);
            })

            .on("click", function (d) {
                console.log("click");
                thisGraph.circleMouseUp.call(thisGraph, d3.select(this), d);
                //console.log('Element', document.getElementById('chart'));
                //console.log('Data d:', d);
                //console.log('this :', this);
            })

            .on("mouseout", function (d) {
                state.mouseEnterNode = null;
                d3.select(this).classed(consts.connectClass, false);
                console.log("mouse out");
            })

            .on("dblclick", function (d) { //DOPPELKLICK AUF NODES -- desktop
                console.log("Doppelklick:");
                if (d3.select(this).selectAll("rect").attr("rx") == consts.rectRadX) {//+++++++++++++++++++++++++++++++++++++++++++++++
                    d3.select(this).select("rect").attr("rx", 0);

                    let änderungen = d3.select(this).selectAll("rect").attr("rx");
                    console.log("änderungen im if", änderungen);
                } else {
                    d3.select(this).selectAll("rect").attr("rx", consts.rectRadX);

                    let änderungen = d3.select(this).selectAll("rect").attr("rx");
                    console.log("änderungen im else", änderungen);
                }

                //thisGraph.circleMouseDown.call(thisGraph, d3.select(this), d);
            })
            .call(thisGraph.drag);

        thisGraph.circles = newGs;

        newGs.each(function (d) {
            if (this.childNodes.length === 0) {
                d3.select(this)
                    //.append("circle")
                    //.attr("r", String(consts.nodeRadius));
                    .append("rect")   //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                    .attr("width", String(consts.rectWidth))  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                    .attr("height", String(consts.rectHeight))   //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                    .attr("rx", String(consts.rectRadX))   //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                thisGraph.insertTitleLinebreaks(d3.select(this), d.title);
            }
        });






    };
    //------------------------------------------------ENDE---------------------------------------------------------------











    GraphCreator.prototype.zoomed = function () {
        this.state.justScaleTransGraph = true;
        d3.select("." + this.consts.graphClass)
            .attr("transform", d3.event.transform);
    };



    GraphCreator.prototype.updateWindow = function (svg) {
        let docEl = document.documentElement,
            bodyEl = document.getElementById('chart');
        let x = window.innerWidth || docEl.clientWidth || bodyEl.clientWidth;
        let y = window.innerHeight || docEl.clientHeight || bodyEl.clientHeight;
        svg.attr("width", x).attr("height", y);
    };





    /**** MAIN ****/

    // warn the user when leaving
    window.onbeforeunload = function () {
        return "Make sure to save your graph locally before leaving :-)";
    };

    let docEl = document.documentElement,
        bodyEl = document.getElementById('chart');

    let width = window.innerWidth || docEl.clientWidth || bodyEl.clientWidth,
        height = window.innerHeight || docEl.clientHeight || bodyEl.clientHeight;

    let xLoc = width / 2,
        yLoc = height / 2;





    // initial node data
    let nodes = [{ title: "new concept", id: 0, x: xLoc, y: yLoc, height: 100 }, //wird in json geschrieben
    { title: "new concept", id: 1, x: xLoc, y: yLoc + 200 }];
    let edges = [{ source: nodes[1], target: nodes[0] }];






    /** MAIN SVG **/
    let svg = d3.select("#chart").append("svg")
        .attr("width", width)
        .attr("height", height);
    let graph = new GraphCreator(svg, nodes, edges);
    graph.setIdCt(2);
    graph.updateGraph();


})


    (window.d3, window.saveAs, window.Blob);