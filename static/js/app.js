updatePlotsAndDemographics = (data, id) => {
    let sample = data.samples.filter(sample => sample.id === id);
    let x_bubble = sample.otu_ids;
    let y_bubble = sample.sample_values;
    let ids = parseInt(id);
        
    function metalist(data){  
        let meta = data.metadata.filter(meta => meta.id === ids);
        d3.select("#sample-metadata")
            .append('ul')
            .selectAll('li')
            .data(meta)
            .enter()
            .append('li')
            .html(d => `<li>ID: ${d.id}</li> <li>ETHNICITY: ${d.ethnicity}</li><li>GENDER: ${d.gender}</li><li>AGE: ${d.age}</li><li>LOCATION: ${d.location}</li><li>BBTYPE: ${d.bbtype}</li><li>WFREQ: ${d.wfreq}</li>`);
        };
        metalist(data);

    var bChart = [
        {
          x: sample[0]['sample_values'].slice(0,10).sort(d3.ascending),
          y: sample[0]['otu_ids'].slice(0,10).sort(d3.ascending),
          labels: sample[0]['otu_labels'].slice(0,10).sort(d3.ascending),
          type: 'bar',
          orientation: 'h',
        }
      ];
      var layout = {
        title: 'Top 10 OTUs',
      };

      Plotly.newPlot('bar', bChart, layout, {responsive: true});

      //Bubble / Scatter Chart
      var trace1 = {
        x: sample[0]['otu_ids'],
        y: sample[0]['sample_values'],
        mode: 'markers',
        type: 'scatter',
        name: 'Team A',
        text: sample[0]['otu_labels'],
        
        marker: { size: sample[0]['sample_values'],
                color: sample[0]['otu_ids'], 
            }
      };
      
      var data = [trace1];
      
      var layout = {
        title:'OTU ID'
      };
      
      Plotly.newPlot('bubble', data, layout, {responsive: true});
}

handleChange = (data) => {
    let id = d3.event.target.value;
    updatePlotsAndDemographics(data, id)
}

d3.json("./data/samples.json").then(data => {
    // console.log(data.metadata);
    let mySelect = d3.select("#selDataset");
    data.names.forEach(element => {
        mySelect.append("option").attr("value", element).text(element);
    });
    mySelect.on("change", () => handleChange(data));
});
