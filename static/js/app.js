// Use the D3 library to read in samples.json from the URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Promise pending
const dataPromise = d3.jason(url)
    console.log("Data Promise" , dataPromise);

// Create function for dropdown menu
function getData() {
    
    let dropdownMenu = d3.select("#selDataset");
    
    // Retrieve JSON data and use console log
    d3.json(url).then((data) => {
        
        console.log(`Data: ${data}`);
    
    //Itterate through "names" in samples
        let Names = data.names;
    
        Names.forEach((name) =>{
            // Add value of the dropdown meanu option to a variable 
            dropdownMenu.append("option").text(name).property("value",name);
        }); 
        // first name in the list
        let first_sample = Names [0];
        // Initialize plots
        sampleMetadatametadata(first_sample);
        BarChart(first_sample);
        Bubblechart(first_sample);
    }); 

  };
//Itterate through metadata in samples

function Metadata(samples) {
    // Retrieve JSON data and use console log
    d3.json(url).then((data) => {

        //Declare metadata variable
        let metadatavar = data.metadatavar;
        // Filter metadata then log results
        let filteredinfo = metadatavar.filter(result => result.id == samples);
            console.log(info)

        //Retrive first value
        let first_data = filteredinfo[0];
        //Clear metadata. Use "sample-metadata" name from index.html
        d3.select("#sample-metadata").html("");

        //Add key value pair. https://www.geeksforgeeks.org/javascript-object-entries-method/
        let entries = Object.entries(obj);
        // Append to metadata and log
        entries.forEach(([key,value])=> {d3.select("#sample-metadata").append("h5").text(`${key}:${value}`); });
        console.log(entries);
    }); 

}
//Create a horizontal bar chart
function BarChart(samples) {
   
    // Retrieve JSON data and use console log
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);
        
        //Sample array
        let Samples = data.Samples;
        
        //Filter sample array
        let filteredSample = Samples.filter((Samples) => Samples.id == Samples);
       
        //First index 
        let firstFilteredSample = filteredSample[0];
        
        //set ids, lables, values 
        let otu_ids = firstFilteredSample.otu_ids;
        let otu_labels = firstFilteredSample.otu_labels;
        let sample_values = firstFilteredSample.sample_values;
        
        //Console log above 
        console.log(otu_ids, otu_labels, sample_values);

        //Display top 10 OTUs
        let trace1 = [{
            x: firstFilteredSample.sample_values.slice(0,10).reverse(),
            y: firstFilteredSample.otu_ids.slice(0,10).map((out_ids) => `OTU ${otu_ids}`).reverse(),
            text: firstFilteredSample.otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"        
        }];

        // Render the plot to the div tag with id "plot"
        Plotly.BarPlot("plot",trace1);
        });
}
//Create a bubble chart 
function Bubblechart(samples) {
    // Retrieve JSON data and use console log
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);
       
        //Sample array
        let Samples = data.Samples;
        
        //Filter sample array
        let filteredSample = Samples.filter((Samples) => Samples.id == samples);
       
        //First index 
        let firstFilteredSample = filteredSample[0];
        
        //Create trace for bubble chart
        let trace2 = [{
            x: firstFilteredSample.otu_ids,
            y: firstFilteredSample.sample_values,
            text: firstFilteredSample.otu_labels,
            mode: "markers",
                color:firstFilteredSample.otu_ids,
                size: firstFilteredSample.sample_values}];
        let layout = {
            xaxis: {
                title: "OTU ID"}};
        Plotly.BubblePlot("bubble",trace2, layout);
        });
    }