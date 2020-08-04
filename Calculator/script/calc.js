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
    var calcTableDataBody = document.getElementById("calculatedTable"); //this will help me much.
    var parFCal = paramForCalculatingTable; //shorten Parameter prototype.

    //remove Previous Tables.... 
        if (calcTableDataBody.rows.length != 1){ // check it is First run with Row Length..!
            let removeTableNum = calcTableDataBody.rows.length - 1; //not So Beautifull.... Please Fix to 1 or 0!
            for(let y = removeTableNum; y > 0 ; y--){
                calcTableDataBody.deleteRow(1);
                console.log("removing..." + y);
            }
    } //Remove PRevious Rows END!

    // console.log(paramForCalculatingTable.segmentLength);//Debugging

    var maxCalculateSegment = inputParamStruct.totalSegmentNum; // calculate Till reach Max Calculating Length.
    var calculatedSegmentLength = inputParamStruct.segmentLength;

    //set OutPut Datas.
    /*
    var segmentNow;
    var lengthNow;
    var AreaNow;
    var heightNow;
    */ // OUTDATED ID : 202008241022;


        //START - Add Table Data Block 

        // ADD Table Space For input Datas. 
            
            for (let k = 0; k <= maxCalculateSegment; k++){ // target Row Numbers: Segment Number + 1;
                var insertCells = ""; // initialize insertCells For Preventing Errors.

                for (let x = 0; x < calcTableDataBody.rows[0].cells.length;x++){
                    // DEBUG console.log(insertCells + "ic " + x);
                   
                    let insertText;

                    // if (x!=0){insertText = "\n"}; // generates unwanted "undefined" STRING... 
                    (x!=0)?insertText = "\n": insertText = ""; 

                    // DEBUG console.log(insertText + "it" + x);
                    insertText = insertText + "<td></td>";
                    insertCells = insertCells + insertText;
                    //calcTableDataBody.insertCell(x); // insert cell as lengths
                    
                    // DEBUG console.log(x + "번째 for X 반복문");
                }
                calcTableDataBody.insertRow(k+1).innerHTML = insertCells; // create row as segment..

            }
        
        
        //Add Cell Variables For Add Data // OUTDATED
        /*
        var calcTablerow = calcTableDataBody.insertRow(calcTableDataBody.rows.length); // <-- this Will Shorten Codes.
        var segmentNow_0 = calcTablerow.insertCell(0);
        var lengthNow_1 = calcTablerow.insertCell(1);
        var AreaNow_2 = calcTablerow.insertCell(2);
        var heightNow_3 = calcTablerow.insertCell(3);
        */ // OUTDATED ID : 202008241022 ... I CAN'T USE These Functions..OTL
        
            for (let i = 0; i <= maxCalculateSegment; i++){
                // Accessing Cell With tablename.rows[x].cells[x].innerHTML // REF: https://bbuljj.tistory.com/89
                // calculated Table Id is : "calculatedTable". I skipped { document.getElementById("calculatedTable") } Parse...
                let cellSegment = calculatedTable.rows[i+1].cells[0]; //access to Segment Cell --- 0
                let cellLength =  calculatedTable.rows[i+1].cells[1]; //access to Length Cell --- 1
                let cellArea = calculatedTable.rows[i+1].cells[2]; //access to Area Cell --- 2
                let cellHeight = calculatedTable.rows[i+1].cells[3]; //access to Height Cell --- 3
                
                let AreaNow;
//DEBUG                console.log("debug + " + calculatedTable.rows[i+1].cells[0]);
                cellSegment.innerHTML = i;
                cellLength.innerHTML = lengthNow = i * parFCal.segmentLength; // seems segementlength need +1..?
                cellArea.innerHTML = AreaNow = hornAreaCalculator(parFCal.throatArea,lengthNow,parFCal.flareConst,parFCal.cutOffFreq,parFCal.ismm);
                cellHeight.innerHTML = AreaNow / parFCal.throatWidth;

            }


            //END - Add Table Data Block

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
