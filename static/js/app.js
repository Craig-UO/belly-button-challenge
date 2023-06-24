function buildMetadata(sample) {
    // Access the website and use d3 to operate on the data
    let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
    d3.json(url).then((data) => {

    
  
      // Filter the data for the object with the desired sample number (the id)
        let metaData = data.metadata;
        let filteredArray = metaData.filter(sampleObj => sampleObj.id ==  sample);
        let result = filteredArray[0];
        //console.log(sampleObj.id);
  
      // Select the panel with id of `#sample-metadata`
      let panel = d3.select("#sample-metadata");
  
      // Clear existing metadata - use `.html("")`
      panel.html("")
  
      // Append new tags for each key-value in the metadata
        for (key in result){
            panel.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);

        };
  
      // If you want to do the bonus, you can make the gauge chart here
        // buildGauge(result.wfreq);
    })
    };
  
  function buildCharts(sample) {
    // Access the website and use .then to operate on the data
    let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
    d3.json(url).then((data) => {
      // Filter the data for the object with the desired sample number (the id)
      let sampleData = data.samples;
      let filteredArray = sampleData.filter(sampleObj => sampleObj.id == sample);
      let result = filteredArray[0];
            
      // Pull the desired information (ids, labels, values) from your filtered data
      let otu_ids = result.otu_ids;
      let otu_labels = result.otu_labels;
      let sample_values = result.sample_values;
      console.log(otu_labels);
  
      // Build a Bubble Chart
      let trace1 = {
        type: "scatter"
        ,mode: "markers"
        ,x: otu_ids
        ,y: sample_values
        ,text: otu_labels
        ,marker: {
          size: sample_values
          ,color: otu_ids
        }
      };
      let data1 = [trace1];

      let layout = {
        title: 'Sample Value by ID'
      };

      Plotly.newPlot("bubble", data1, layout);
  
      // Slice the data for your bar chart and order it (you can just use reverse)
  
  
      // Build a Horizontal Bar Chart
      let trace2 = {

      };

    });
  };
  
  function init() {
    // Get the reference to the dropdown menu
    let selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
    d3.json(url).then((data) => {
    // Do this by pulling the array associated with `names` 
    let idNames = data.names;

      
  
      // Loop through the names and append to the dropdown menu
        for (let i = 0; i < idNames.length; i++){
            selector.append("option").text(idNames[i]).property("value", idNames[i]);
        };
  
      // Use the first sample from the list to build the initial plots
        let firstSample = idNames[0]

      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
      
  }
  
  function optionChanged(newSample) {
    // Change your data and update your plots/metadata when newSample is selected from the dropdown
    buildCharts(newSample);
    buildMetadata(newSample);
  
  }
  
  // Initialize the dashboard
  init();
Collapse















