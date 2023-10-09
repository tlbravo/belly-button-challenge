// Use the D3 library to read in samples.json from the URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// // Promise pending
// const dataPromise = d3.jason(url)
//     console.log("Data Promise" , dataPromise);

// Initialize function for dropdown menu
function init() {
    
    let dropdownMenu = d3.select("#selDataset");
    
    // Retrieve JSON data and use console log
    d3.json(url).then((data) => {
        
        console.log(`Data: ${data}`);
    
    //Itterate through "names" in samples
        let Names = data.names;
    
        Names.forEach((id) =>{
            
            console.log(id);
            
            // Add value of the dropdown meanu option to a variable 
            dropdownMenu.append("option").text(id).property("value",id);
        }); 
        
        // first name in the list
        let initialName = Names [0];
        updatePlots(initialName);
    });
}

// Initialize plots
function updatePlots(selectedName) {

    Metadata(selectedName);
    BarChart(selectedName);
    Bubblechart(selectedName);
}

//Itterate through metadata in samples
function Metadata(selected_value) {
    // Retrieve JSON data and use console log
    d3.json(url).then((data) => {

        //Declare metadata variable
        let metadatavar = data.metadata;
        // Filter metadata then log results
        let filteredinfo = metadatavar.filter(metadata => metadata.id == selected_value);
        console.log(filteredinfo)

        //Retrive first value
        let value_info = filteredinfo[0];
        //Clear metadata. Use "sample-metadata" name from index.html
        d3.select("#sample-metadata").html("");

        //Add key value pair. https://www.geeksforgeeks.org/javascript-object-entries-method/
        // Append to metadata and log
        Object.entries(value_info).forEach(([key,value])=> {
            
            console.log(key,value);
            
            d3.select("#sample-metadata").append("h5").text(`${key}:${value}`); 
        });
    }); 

};
//Create a horizontal bar chart
function BarChart(selected_value) {
   
    // Retrieve JSON data and use console log
    d3.json(url).then((data) => {
        
        //Sample array
        let barsample = data.samples;
        
        //Filter sample array
        let filteredSample = barsample.filter(result => result.id == selected_value);
       
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
            y: firstFilteredSample.otu_ids.slice(0,10).map((otu_ids) => `OTU ${otu_ids}`).reverse(),
            text: firstFilteredSample.otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"        
        }];

        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bar",trace1);
    });
};
//Create a bubble chart 
function Bubblechart(selected_value) {
    // Retrieve JSON data and use console log
    d3.json(url).then((data) => {
       
        //Sample array
        let Samples = data.samples;
        
        //Filter sample array
        let filteredSample = Samples.filter(result => result.id == selected_value);
       
        //First index 
        let firstFilteredSample = filteredSample[0];

        //set ids, lables, values 
        let otu_ids = firstFilteredSample.otu_ids;
        let otu_labels = firstFilteredSample.otu_labels;
        let sample_values = firstFilteredSample.sample_values;
        
        //Console log above 
        console.log(otu_ids, otu_labels, sample_values);
        
        //Create trace for bubble chart
        let trace2 = [{
            x: firstFilteredSample.otu_ids,
            y: firstFilteredSample.sample_values,
            text: firstFilteredSample.otu_labels,
            mode: "markers",
            marker:{
                color:firstFilteredSample.otu_ids,
                size: firstFilteredSample.sample_values}}];
        let layout = {
            xaxis: {
                title: "OTU ID"}};
        Plotly.newPlot("bubble",trace2, layout);
        });
}
// Create function that displays options
function optionChanged (selected_value) {

    console.log(selected_value);

    //Display functions
    init(selected_value);
    Metadata(selected_value);
    BarChart(selected_value);
    Bubblechart(selected_value);
}
init();