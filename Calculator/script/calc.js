
var testResult = hornAreaCalculator(12000,56,1,29.0825,true);
document.getElementById("Ans").innerHTML = testResult;

var paramForCalculatingTable;

function updateParameter(){
    console.log("Data Updated!");
    let throatArea = tdthroatArea.innerHTML =  document.getElementById("throatArea").value;
    let flareConst = tdflareConst.innerHTML = document.getElementById("flareConst").value;
    let cutOffFreq = tdcutOffFreq.innerHTML = document.getElementById("cutOffFreq").value;
    let ismm = tdismm.innerHTML = document.getElementById("ismm").checked; // input type is "Checkbox" , so value is always "on" so use checked?(bool)
    
    let splineTotLength = tdsplineTotLength.innerHTML = document.getElementById("splineTotLength").value;
    let totalSegmentNum = tdtotalSegmentNum.innerHTML = document.getElementById("totalSegmentNum").value;
    let throatWidth = tdthroatWidth.innerHTML = document.getElementById("throatWidth").value;

    paramForCalculatingTable = new paramstructure(throatArea,flareConst,cutOffFreq,ismm,splineTotLength,totalSegmentNum,throatWidth);
    let updateCalculate = hornAreaCalculator(throatArea,splineTotLength,flareConst,cutOffFreq,ismm,splineTotLength,totalSegmentNum,throatWidth);
    document.getElementById("Ans").innerHTML = updateCalculate;
    refreshTable(paramForCalculatingTable);
}


function paramstructure(structThroatArea,structFlareConst,structCutOffFreq,structIsmm,structSplineTotLength,structTotalSegmentNum,strucThroatWidth){
    this.throatArea = structThroatArea;
    this.flareConst = structFlareConst;
    this.cutOffFreq = structCutOffFreq;
    this.ismm = structIsmm;
    this.splineTotLength = structSplineTotLength;
    this.totalSegmentNum = structTotalSegmentNum;
    this.throatWidth = strucThroatWidth;

    this.segmentLength = structSplineTotLength / structTotalSegmentNum;
}


function refreshTable(inputParamStruct){

    //ADD - removes Previous Tables.

    console.log(paramForCalculatingTable.segmentLength);//Debugging

    let maxCalculateSegment = inputParamStruct.totalSegmentNum; // calculate Till reach Max Calculating Length.
    let calculatedSegmentLength = inputParamStruct.segmentLength;

    //set OutPut Datas.
    let segmentNow;
    let lengthNow;
    let AreaNow;
    let heightNow;
    let parFCal = paramForCalculatingTable;


        //START - Add Table Data Block 
        let calcTableDataBody = document.getElementById("calcTable");
        let calcTablerow = calcTableDataBody.insertRow(calcTableDataBody.rows.length);

            //Add Cell info For Add Data
            let segmentNow_0 = calcTablerow.insertCell(0);
            let lengthNow_1 = calcTablerow.insertCell(1);
            let AreaNow_2 = calcTablerow.insertCell(2);
            let heightNow_3 = calcTablerow.insertCell(3);


        for (let i = 0; i <= maxCalculateSegment; i++){
            segmentNow = i;
            lengthNow = i * calculatedSegmentLength;
            segmentNow_0.innerHTML = segmentNow; 
            AreaNow = hornAreaCalculator(parFCal.throatArea,lengthNow,parFCal.flareConst,parFCal.cutOffFreq,parFCal.ismm);
        }


        //END - Add Table Data Block


    //Reset OutPut Datas For Prevent Error.
    segmentNow = undefined;
    lengthNow = undefined;
    AreaNow = undefined;
    heightNow = undefined;

} // refreshTable End.



function hornAreaCalculator (throatArea,distFromStart,flareConst,cutoffFrequency,ismm2){
    let calculatedArea;
    let S_t;
    let x;
    /*
    S_t = throatArea/(10^6);
    x = distFromStart /(10^3);
    */
    switch (ismm2) { 
        case true : {
            S_t = throatArea/(10**6); //mm^2 -> m^2
            x = distFromStart /(10**3); // mm -> m
            break
        } 
        case false : {
            S_t = throatArea; // m^2 -> m^2
            x = distFromStart; // m -> m 
            break
        }
    }

    let SOUNDSPEEDATAIR = 344; // m/s
    let x_0 = (SOUNDSPEEDATAIR / (2 * Math.PI * cutoffFrequency)); // calculaxting x_0 -> 
    calculatedArea = S_t*(Math.cosh(x/x_0) + flareConst * Math.sinh(x/x_0))**2; //from calculation
    /* // debugging
    console.log(throatArea);
    console.log(distFromStart);
    console.log(S_t);
   console.log(x);
    console.log(x_0);
    console.log(x);
    console.log(calculatedArea);
    */
    switch (ismm2){
        case true:{
            return calculatedArea*(10**6);
        }
        case false:{
            return calculatedArea;
        }
    }
 
}
/*
function tablegenerator(width,height){

}
*/
