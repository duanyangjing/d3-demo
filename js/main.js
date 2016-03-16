/* 575 boilerplate main.js */
window.onload = function(){
	var w = 900, h = 500;
	var container = d3.select("body")
		.append("svg")
		.attr("width", w)
		.attr("height", h)
		.attr("class", "container")

	var innerRect = container.append("rect")
		.datum(400)
		.attr("width", function(d){
			return d * 2;
		})
		.attr("height", function(d){
			return d;
		})
		.attr("class", "innerRect")
		.attr("x", 60)
		.attr("y", 50)

    var cityPop = [
        { 
            city: 'New York',
            population: 8491079
        },
        {
            city: 'Los Angeles',
            population: 3928864
        },
        {
            city: 'Chicago',
            population: 2722389
        },
        {
            city: 'Huston',
            population: 2239558
        }
    ];

	var x = d3.scale.linear()//this actually returns a scale function
		.range([120, 700])//pixel position on screen
		.domain([0, 3]);
	var minPop = d3.min(cityPop, function(d){
		return d.population;
	});
	var maxPop = d3.max(cityPop, function(d){
		return d.population;
	})
	var y = d3.scale.linear()
		.range([450, 50])//pixel position on screen
		.domain([0, 10000000]);


	var color = d3.scale.linear()
		.range(["#FDBE85", "#D94701"])//???how do is linear relationship established between
		.domain([minPop, maxPop]);


	var circles = container.selectAll(".circles") //empty selection is desired here
	.data(cityPop)
	.enter()
	.append("circle")
	.attr("class", "circles")
	.attr("id", function(d){
		return d.city;
	})
	.attr("r", function(d){
		return calcRadius(d);
	})
	.attr("cx", function(d, i){
		return x(i);
	})
	.attr("cy", function(d){
		return y(d.population);
	})
	.style("fill", function(d, i){
		return color(d.population);
	})
	.style("stroke", "#000");


	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left")

	var axis = container.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(60, 0)")
		.call(yAxis)


	var title = container.append("text")
		.attr("class", "title")
		.attr("text-anchor", "middle")
		.attr("x", 450)
		.attr("y", 30)
		.text("City Populations");

	var labels = container.selectAll(".labels")
		.data(cityPop)
		.enter()
		.append("text")
		.attr("class", "labels")
		.attr("text-anchor", "left")
		.attr("y", function(d){
			return y(d.population) - 4;
		})

	var nameLine = labels.append("tspan")
		.attr("class", "nameLine")
		.attr("x", function(d, i){
			return x(i) + calcRadius(d) + 5;
		})
		.text(function(d){
			return d.city;
		})

	var format = d3.format(",");
	var popLine = labels.append("tspan")
		.attr("class", "nameLine")
		.attr("x", function(d, i){
			return x(i) + calcRadius(d) + 5;
		})
		.attr("dy", "15")//vertical offset of two lines
		.text(function(d){
			return "Pop. " + format(d.population);
		});
};

function calcRadius(d){
	var area = d.population * 0.0005;
	return Math.sqrt(area/Math.PI);
};