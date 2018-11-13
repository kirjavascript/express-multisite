var prefix = 'json/posts/004/mesh/';

var svg = d3.select('#mesh').append("svg")
    .attr({"width":"100%", "height":"100%"});

var logo = svg.append("g"), pGroup;

var r=1,g=1,b=1,seq=1;
var hex="00 14 28 3C 50 64 78 8C A0 B4 C8 DC F0".split(" ");

// reset bbox ?

var sp = 1000;

d3.json(prefix + "stuff.json", (err,data) => {

    var bbox = bboxHack(data);

    var p = logo
        .selectAll("logo")
        .data(data)

    pGroup = p
        .enter()
        .append("path")
        .attr("class", "logo")
        .attr("d", d => d)
        .attr("transform",particle)
        .style("fill",rndC)
        .style("stroke-width", 0)
    pGroup.transition()
        .duration(sp/2)
        .delay((d,i) => ((i)*3)+1000)
        .attr("transform","translate(0,0)")
        .style("fill", '#111')
        .style("stroke", '#111')
        .style("stroke-width", .6)


    logo.attr(logoAttr(bbox));

    setInterval(d => fragment(prefix+['about', 'more', 'stuff'][Math.random()*3|0] + '.json'), 5000);

})

function fragment(mesh) {

    d3.json(prefix + "stuff.json", (err,data) => {
        pGroup
            .transition()
            .delay((d,i) => ((i)*3)+1000)
            .duration(sp)
            .attr("transform",particle)
            .style("fill",rndC)
            .style("stroke-width", 0)
            .each("end", (d,i) => {

                function getDelay() {
                    if(Math.random()*2|0) {
                        return d => 0;
                    }
                    else {
                        return (d,i) => ((i)*3);
                    }
                }

                // on the final iteration...

                i==data.length-1&&
                d3.json(mesh, (err,data) => {

                    // remove old particles
                    logo.selectAll(".logo")
                    .transition()
                    .duration(sp)
                    .attr("transform",particle)
                    .style("opacity", 0)
                    .remove()

                    // draw new particles
                    logo.selectAll(".logo_buf")
                    .data(data)
                    .enter()
                    .append("path")
                    .attr("transform",particle)

                    .style("fill",rndC)
                    .attr("class", "logo")
                    .style("opacity", 0)
                    .transition()
                    .duration(sp)
                    .style("opacity", 1)
                    .attr("transform",particle)
                    .attr("d", d => d)
                    .each("end", (d,i) => {
                        var delay = getDelay();

                        i==data.length-1&&
                        logo.selectAll(".logo")
                        .transition()
                        .duration(sp/2)
                        .delay(delay)
                        .attr("transform","translate(0,0)")
                        .style("fill", '#111')
                        .style("stroke", '#111')
                        .style("stroke-width", .6)
                    })
                })
            })
    });

}

function rndC() {
    6==seq&&(b--,0==b&&(seq=1));5==seq&&(r++,12==r&&(seq=6));4==seq&&(g--,0==g&&(seq=5));3==seq&&(b++,12==b&&(seq=4));2==seq&&(r--,0==r&&(seq=3));1==seq&&(g++,12==g&&(seq=2));return"#"+hex[r]+hex[g]+hex[b]
}

function particle() {
    var tx = (Math.random()*120)|0;
    var ty = (Math.random()*80)|0;
    return 'scale(1.5),translate('+[-tx/2,ty/2]+')';
}

function logoAttr(bbox) {
    return {
        transform: "scale(1.5),translate("+[
            (window.innerWidth/2)-(bbox.width/2),
            bbox.height
        ]+")"
    }
}

function bboxHack(data) {
    var tmp = svg.append("g").attr("transform","scale(2)");
        tmp.selectAll("tmp").data(data).enter().append("path")
                .attr("class", "tmp")
                .attr("d", d => d)
    var bbox = tmp.node().getBBox();
        tmp.remove();

    return bbox;
}