function getPlots(id){
d3.json("data/samples.json").then (sampledata =>{
    console.log("Data",sampledata)
var sampleValue=sampledata.samples[0].sample_values.slice(0,10).reverse()
console.log("sample value",sampleValue)
var otuIds=sampledata.samples[0].otu_ids.slice(0,10).reverse()
var topOtu=otuIds.map(function (r){return "OTU"+r})
console.log("top otu_ids",topOtu)
var labels=sampledata.samples[0].otu_labels.slice(0,10)
console.log(labels)
var trace1={
    x:sampleValue,
    y:topOtu,
    text:labels,
    type:"bar",
    orientation:"h"
};
var layout={
    title:"Top OTU",
    
};
var data=[trace1]
Plotly.newPlot("bar",data,layout);
// create the bubble chart
var traceA = {
    x: sampledata.samples[0].otu_ids,
    y: sampledata.samples[0].sample_values,
    mode: "markers",
    marker: {
      color:sampledata.samples[0].otu_ids,
      size: sampledata.samples[0].sample_values
    },
    text:sampledata.samples[0].otu_labels
  };
  
  var data1 = [traceA];
  
  var layout1 = {
    title: "OTU_ID VS Sample Value",
    xaxis:{title: "OTU ID"},
    height: 600,
    width: 1000
  };
  
  
  Plotly.newPlot("bubble", data1, layout1);
    
    

})
};
function getDomo(id){
    d3.json("data/samples.json").then (data=>{
var metaData=data.metadata
console.log("Meta Data",metaData)
var result = metaData.filter(meta => meta.id.toString()===id)[0];
console.log(result)
// select demographic panel to put data
var demographicInfo = d3.select("#sample-metadata");

/
    for (var [key,value] of Object.entries(result)){
        demographicInfo.append("h5").text(key.toUpperCase() + ": " + value + "\n"); 
    }


    })};
function optionChanged(id){
    getPlots(id);
    getDomo(id);
}
// function init(){
//     var dropdown=d3.select("#selDatase")
//     d3.json("data/samples.json").then (data=>{
//         console.log(data)
//         var name=data.names
//         for (var i=0;i<name.length;i++){
//             dropdown.append("option").text(i).property("value")
            
//         }
//         getPlots(name[0]);
//         getDomo(name[0])
//     });

// }
function init() {
    
    var dropdown = d3.select("#selDataset");

    d3.json("data/samples.json").then((data)=> {
        console.log(data)
        console.log(data.names[0])

        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // call the functions to display the data:
        getPlots(data.names[0]);
        getDomo(data.names[0]);
        
    });
}
init()