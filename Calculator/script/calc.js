var testResult = hornAreaCalculator(12000,56,1,29.0825,true);
$("#Ans").html(testResult); // insert Text With THIS!!!
/**
 * Initialize Program Space
 */


//These Are EVENTLISTNER
$(document).ready(function(){
generatorEventListner();
$("#CalcTableGadget").hide();

});

function generatorEventListner(){
$('#customSegmentLength').change(function(){ //Hide Numbers input Tab When customSegmentLength IS ON! 
    if($(this).is(':checked')) {
        console.log("removing!");
        $("#totSegWrapper").hide();
    } else {
        console.log("reveling!");
        $("#totSegWrapper").show();
    }
});
}


var paramForCalculatingTable;

function updateParameter(){
    console.log("Data Updated!");
    assignParamsToVisualTable();
    refreshCalculatedTable();
}

function assignParamsToVisualTable(){
    
    let throatArea = tdthroatArea.innerHTML =  $("#throatArea").val();
    let flareConst = tdflareConst.innerHTML =  $("#flareConst").val();
    let cutOffFreq = tdcutOffFreq.innerHTML =  $("#cutOffFreq").val();
    let ismm = tdismm.innerHTML = $("#ismm").is(':checked'); // input type is "Checkbox" , so value is always "on" so use checked?(bool)
    
    let splineTotLength = tdsplineTotLength.innerHTML = $("#splineTotLength").val();
    let totalSegmentNum = tdtotalSegmentNum.innerHTML = $("#totalSegmentNum").val();
    let throatWidth     = tdthroatWidth.innerHTML     = $("#throatWidth").val();

    paramForCalculatingTable = new paramstructure(throatArea,flareConst,cutOffFreq,ismm,splineTotLength,totalSegmentNum,throatWidth);
    let updateCalculate = hornAreaCalculator(throatArea,splineTotLength,flareConst,cutOffFreq,ismm,splineTotLength,totalSegmentNum,throatWidth);
    $("#Ans").html(updateCalculate);
}
 function refreshCalculatedTable(){
    removePreviousCell();
    let calculateTableSelector = $('#customSegmentLength').is(":checked");
    switch (calculateTableSelector){
        case true : {
            $("#CalcTableGadget").show();
            refreshCustomSegmentTable(paramForCalculatingTable);
            console.log("Refreshed CUSTOM Segment Calcuator");
            break;
        }
        case false : {
            $("#CalcTableGadget").hide();
            refreshFixedSegmentTable(paramForCalculatingTable);
            console.log("Refreshed FIXED Segment Calcuator");
            break;
        }
    }

 }

function removePreviousCell(){ 
    var calcTableDataBody = document.getElementById("calculatedTable"); //this will help me much. <-- How Convert jQuery?
    
        //remove Previous Tables.... 
        if (calcTableDataBody.rows.length != 1){ // check it is First run with Row Length..!
            let removeTableNum = calcTableDataBody.rows.length - 1; //not So Beautifull.... Please Fix to 1 or 0!
            for(let y = removeTableNum; y > 0 ; y--){
                calcTableDataBody.deleteRow(1);
                //console.log("removing..." + y); //DEBUGGING
            }
    } //Remove PRevious Rows END!

}// removePreviousCell END

function refreshCustomSegmentTable(){ // IN PROGRESS
    /**
     * Progress : 
     * 1. Add Button For Add / Remove Rows, Refreshing Calculated Values.
     * 2. make "Seperate" length Cell
     * 3. make "Stacked" Length Cell
     * 4. make about 10 rows
     * 5. 
     */
    var cellLength = $("#calculatedTable tr:eq(0) th").length;
    //initial Run!
        initializeCustomTable();

    $("#calcTableAddRow").click(function(){
        
        console.log("Adding Rows..");
        let addRowText = "<tr>";
            for(let i=0;i<cellLength;i++){
                addRowText = addRowText + "\n<td></td>";
            }
        addRowText = addRowText + "<\n/tr>";
        
        RefreshCustomCalcData();
        $("#calculatedTable tr:eq(1)").after(addRowText);
        
    });

    $("#calcTableRemoveRow").click(function(){

        if (getCalcRows() > 2){
            $("#calculatedTable tr:eq("+ (getCalcRows() -1 )+")").remove();
            console.log("Removing Rows..");
        }
        else {
            console.log("Stoppp Pressing Delete Rows =U=");
        }
        
    });

        function getCalcRows(){
            return $("#calculatedTable tr").length - 1;
        }

    $("#calcTableRefresh").click(function(){
        RefreshCustomCalcData();
    });

    console.log("NEED TO ADDDO");


    function RefreshCustomCalcData(){

        console.log("refreshing CUTSOM Data");
    };

}





/* //ADDING function!!!
function refreshDataOfCalcTable(flagCustom){
    for (let i = 0; i <= maxCalculateSegment; i++){
        // Accessing Cell With tablename.rows[x].cells[x].innerHTML // REF: https://bbuljj.tistory.com/89
        // calculated Table Id is : "calculatedTable". I skipped { document.getElementById("calculatedTable") } Parse...
        let cellSegment     = calculatedTable.rows[i+1].cells[0]; //access to Segment Cell --- 0
        let cellLengthGap   = calculatedTable.rows[i+1].cells[1];
        let cellLengthStack = calculatedTable.rows[i+1].cells[2]; //access to Length Cell --- 1
        let cellArea        = calculatedTable.rows[i+1].cells[3]; //access to Area Cell --- 2
        let cellHeight      = calculatedTable.rows[i+1].cells[4]; //access to Height Cell --- 3
        
        let AreaNow;
//DEBUG                console.log("debug + " + calculatedTable.rows[i+1].cells[0]);
        cellSegment.innerHTML = i;
        cellLengthGap.innerHTML = parFCal.segmentLength;
        cellLengthStack.innerHTML = lengthNow = i * parFCal.segmentLength; // seems segementlength need +1..?
        cellArea.innerHTML = AreaNow = hornAreaCalculator(parFCal.throatArea,lengthNow,parFCal.flareConst,parFCal.cutOffFreq,parFCal.ismm);
        cellHeight.innerHTML = AreaNow / parFCal.throatWidth;

    } //END - Add Table Data Block

}
 */





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


function refreshFixedSegmentTable(inputParamStruct){ // PLEASE ADD Comparing Function
    var calcTableDataBody = document.getElementById("calculatedTable"); //this will help me much. <-- How Convert jQuery?
    var parFCal = paramForCalculatingTable; //shorten Parameter prototype.


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
                let cellSegment     = calculatedTable.rows[i+1].cells[0]; //access to Segment Cell --- 0
                let cellLengthGap   = calculatedTable.rows[i+1].cells[1];
                let cellLengthStack = calculatedTable.rows[i+1].cells[2]; //access to Length Cell --- 1
                let cellArea        = calculatedTable.rows[i+1].cells[3]; //access to Area Cell --- 2
                let cellHeight      = calculatedTable.rows[i+1].cells[4]; //access to Height Cell --- 3
                
                let AreaNow;
//DEBUG                console.log("debug + " + calculatedTable.rows[i+1].cells[0]);
                cellSegment.innerHTML = i;
                cellLengthGap.innerHTML = parFCal.segmentLength;
                cellLengthStack.innerHTML = lengthNow = i * parFCal.segmentLength; // seems segementlength need +1..?
                cellArea.innerHTML = AreaNow = hornAreaCalculator(parFCal.throatArea,lengthNow,parFCal.flareConst,parFCal.cutOffFreq,parFCal.ismm);
                cellHeight.innerHTML = AreaNow / parFCal.throatWidth;

            } //END - Add Table Data Block

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

function initializeCustomTable(){
    let cellLength = $("#calculatedTable tr:eq(0) th").length;
    let addrows = 2; // setADrowNumbers.

    for (let i = 0; i <addrows; i++){ //readabillity is low.... Please fix!
        let insertCell;
        (i!=0)? insertCell = "": insertCell = insertCell + "\n";
        insertCell = insertCell + "<tr>"; // add "row"

        for (let j = 0; j < cellLength; j++){
            let insertCellInside;
            let segmentTotalSum = paramForCalculatingTable.splineTotLength;

            switch (j){
                case 0 : {
                    insertCellInside = $("#calculatedTable tr").length - 1;
                    break;
                }
                case 1 : {
                    insertCellInside = segmentTotalSum * ($("#calculatedTable tr").length - 1);
                    break;
                }
                case 2 : {
                    insertCellInside = segmentTotalSum * ($("#calculatedTable tr").length - 1);
                    break;
                }
                default :{
                    insertCellInside = "";
                }
            }// Switch pharse For ADDING INITIAL DATA to CELLs

            insertCell = insertCell + "<td>" + insertCellInside + "</td>";
        }// for pharse for ADDING CELLS (td) 

        insertCell = insertCell + "\n</tr>"; // add Escapement
        $("#calculatedTable tr:eq(" + i + ")").after(insertCell);
    } //for pharse for ADDING ROWS (tr) / number => see addrows variables.
}// This Function Will Add initial Table For Custom Segment Length...?



