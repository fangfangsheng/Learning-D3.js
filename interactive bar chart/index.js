    const svgContainer = d3.select('#container');
    const margin = 80;
    const width = 1000 - 2 * margin;
    const height = 600 - 2 * margin;


var svg = d3.select('svg');

const chart = svg.append('g')
        .attr('transform', `translate(${margin}, ${margin})`);


d3.csv("data.csv").then(function(data)  {
// X axis
    const xScale = d3.scaleBand()
      .range([0, width])
      .domain(data.map((s) => s.country))
      .padding(0.5)

// Y axis
    const yScale = d3.scaleBand()
       .range([0, height])
       .domain(data.map((s) => s.population))
       .padding(0.1);

   const makeYLines = () => d3.axisLeft()
      .scale(yScale)

    chart.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    chart.append('g')
      .call(d3.axisLeft(yScale));


    chart.append('g')
      .attr('class', 'grid')
      .call(makeYLines()
        .tickSize(-width, 0, 0)
        .tickFormat('')
      )

  //Bars
     const barGroups = chart.selectAll()
      .data(data)
      .enter()
      .append('g')

      barGroups
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (g) => xScale(g.country))
      .attr('y', (g) => yScale(g.population))
      .attr('height', (g) => height - yScale(g.population))
      .attr('width', xScale.bandwidth())
      .on('mouseenter', function (actual, i) {
          d3.selectAll('.population')
            .attr('opacity', 0)

          d3.select(this)
            .transition()
            .duration(300)
            .attr('opacity', 0.6)
            .attr('x', (a) => xScale(a.country) - 5)
            .attr('width', xScale.bandwidth() + 10)

          const y = yScale(actual.population)

          line = chart.append('line')
            .attr('id', 'limit')
            .attr('x1', 0)
            .attr('y1', y)
            .attr('x2', width)
            .attr('y2', y)


          barGroups.append('text')
            .attr('class', 'divergence')
            .attr('x', (a) => xScale(a.country) + xScale.bandwidth() / 2)
            .attr('y', (a) => yScale(a.population) + 30)
            .attr('fill', 'white')
            .attr('text-anchor', 'middle')
            .text((a, idx) => {
               const divergence = ((a.population - actual.population)/actual.population*100).toFixed(1)

               let text = ''
                if (divergence > 0) text += '+'
                text += `${divergence}%`

                return idx !== i ? text : '';
          })
      })
      .on('mouseleave', function () {
        d3.selectAll('.value')
          .attr('opacity',1)

        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 1)
          .attr('x', (a) => xScale(a.country))
          .attr('width', xScale.bandwidth())

        chart.selectAll('#limit').remove()
        chart.selectAll('.divergence').remove()
      });

      barGroups
      .append('text')
      .attr('class', 'population')
      .attr('x', (a) => xScale(a.country) + xScale.bandwidth() / 2)
      .attr('y', (a) => yScale(a.population) + 30)
      .attr('text-anchor', 'middle')
      .text((a) => `${a.population}`)

      svg
      .append('text')
      .attr('class', 'label')
      .attr('x', -(height / 2) - margin)
      .attr('y', margin / 3.5)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('Population ')

    svg.append('text')
      .attr('class', 'label')
      .attr('x', width / 2 + margin)
      .attr('y', height + margin * 1.7)
      .attr('text-anchor', 'middle')
      .text('Countries')

     svg.append('text')
      .attr('class', 'title')
      .attr('x', width / 2 + margin)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .text('Population of countries in 2018')

//    svg.append('text')
//      .attr('class', 'source')
//      .attr('x', width - margin / 2)
//      .attr('y', height + margin * 1.7)
//      .attr('text-anchor', 'start')
//      .text('Source: Stack Overflow, 2018')

})



