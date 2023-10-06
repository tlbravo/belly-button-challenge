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
        sampleMetadata(first_sample);
        sampleBarChart(first_sample);
        sampleBubblechart(first_sample);
    }); 

  };

// let values = sample_values

// let trace1 = {
//     x: books,
//     y: timesRead,
//     type: 'bar'
//   };