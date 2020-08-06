'use strict'
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
var ArrowEnabled = false;

function updateParameter(){
    if (!ArrowEnabled){
        ArrowEnabled = true;
    }//check?
    
    console.log("Data Updated!");
    assignParamsToVisualTable();
    refreshCalculatedTable();
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

function refreshFixedSegmentTable(inputParamStruct){ // PLEASE ADD Comparing Function
    //    var calcTableDataBody = document.getElementById("calculatedTable"); //this will help me much. <-- How Convert jQuery?
    //    = $("#calculatedTable")[0] 
    
        let maxCalculateSegment = parseInt(inputParamStruct.totalSegmentNum) + 1; // Add Till reach Max Calculating Length.
            // ADD Table Space For input Datas. 
                for (let k = 1; k <= maxCalculateSegment; k++){ // target Row Numbers: Segment Number + 1;
                    $("#calculatedTable")[0].insertRow(k);
                    for (let l = 0; l < $("#calculatedTable tr th").length; l++){
                        $("#calculatedTable")[0].rows[k].insertCell(l);
                        //console.log("addingcell to row: " + k +" cell : " + l); //DEBUGGING
                    }
                }
                refreshCalcData(false);
    } // refreshTable End.
    
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
        let currentTableLength =  $("#calculatedTable tr").length;
        $("#calculatedTable")[0].insertRow(currentTableLength-1);
        console.log("Adding Rows..");
            for(let i=0;i<cellLength;i++){
                switch (i) {
                    case 1 : {
                        $("#calculatedTable")[0].rows[currentTableLength-1].insertCell(i);
                        $("#calculatedTable")[0].rows[currentTableLength-1].cells[i].contentEditable = "true";
                        break;
                    }
                    default : {
                        $("#calculatedTable")[0].rows[currentTableLength-1].insertCell(i);
                    }
                }
            }
        refreshCalcData(true);        
    });

    $("#calcTableRemoveRow").click(function(){

        if (getCalcRows() > 2){
            $("#calculatedTable tr:eq("+ (getCalcRows() -1 )+")").remove();
            console.log("Removing Rows..");
        }
        else {
            console.log("Stoppp Pressing Delete Rows =U=");
        }
        refreshCalcData(true);
    });

        function getCalcRows(){
            return $("#calculatedTable tr").length - 1;
        }

    $("#calcTableRefresh").click(function(){
        refreshCalcData(true,true);
        highlight_row();
    });

    console.log("NEED TO ADDDO");
}

function refreshCalcData(CustomTableFlag,checkSanity){
        let LengthStack=0;
        let calcTableRowLength = parseInt($("#calculatedTable tr").length -2); // table row start From 0 (-1), remove head(-1) -> sum =  -2!
        let parFCal = paramForCalculatingTable;

        for (let i = 0; i <= calcTableRowLength; i++){
            // Accessing Cell With tablename.rows[x].cells[x].innerHTML // REF: https://bbuljj.tistory.com/89
            // calculated Table Id is : "calculatedTable". I skipped { document.getElementById("calculatedTable") } Parse...
            let cellSegment     = calcTableRowCellDOM(i+1,0); //access to Segment Cell --- 0
            let cellLengthGap   = calcTableRowCellDOM(i+1,1); //Segment Gap
            let cellLengthStack = calcTableRowCellDOM(i+1,2); //access to Length Cell --- 1
            let cellArea        = calcTableRowCellDOM(i+1,3); //access to Area Cell --- 2
            let cellHeight      = calcTableRowCellDOM(i+1,4); //access to Height Cell --- 3
            
            let AreaNow;
//DEBUG                console.log("debug + " + calculatedTable.rows[i+1].cells[0]);
            switch (CustomTableFlag){
                    
                case false : { //NO Custom Table!
                    let lengthNow;
                    cellSegment.innerHTML = i;
                    cellLengthGap.innerHTML = parFCal.splineTotLength / calcTableRowLength;
                    cellLengthStack.innerHTML = lengthNow = i * (parFCal.splineTotLength / calcTableRowLength); // seems segementlength need +1..?
                    cellArea.innerHTML = AreaNow = hornAreaCalculator(parFCal.throatArea,lengthNow,parFCal.flareConst,parFCal.cutOffFreq,parFCal.ismm);
                    cellHeight.innerHTML = AreaNow / parFCal.throatWidth;
                break;
                }
                
                case true : { // YES Custom Table
                    cellSegment.innerHTML = i;
                    console.log("cellLengthGap   "+cellLengthGap.innerHTML);
                    console.log("LengthStack    " + LengthStack);
                    switch (i){
                        case calcTableRowLength : {
                            break;
                        }
                        default : {
                            cellLengthStack.innerHTML = LengthStack;
                            LengthStack = LengthStack + parseInt(cellLengthGap.innerHTML);
                            cellArea.innerHTML = AreaNow = hornAreaCalculator(parFCal.throatArea,LengthStack,parFCal.flareConst,parFCal.cutOffFreq,parFCal.ismm);
                            cellHeight.innerHTML = AreaNow / parFCal.throatWidth;
                            
                        }
                        
                    }

                    break;
                }
                

        }
        
        
        } //END - Add Table Data Block

        if ( checkSanity && CustomTableFlag && (parseInt(LengthStack) != parseInt(parFCal.splineTotLength)) ){
            let diffrenceShit = parseInt(parFCal.splineTotLength) - parseInt(LengthStack);
            alert("SomeThing Worng At LengthGap Parameter!!!! \n {Real - Yours} DIFFRENCE IS  : " +  diffrenceShit);
            $("#lengthTotalERROR").html("SomeThing Worng At LengthGap Parameter!!!! <br/> {Real - Yours} DIFFRENCE IS  : " +  diffrenceShit);
        }
        else {
            $("#lengthTotalERROR").html("SomeThing GrEAT At LengthGap Parameter!!!! <br/>  {Real - Yours} DIFFRENCE IS  : 0!");
        }

        calcTableRowCellDOM(calcTableRowLength+1,1).innerHTML = "Fin";
        console.log("refreshing CUTSOM Data");


    };

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
    for (let i = 1;i <=2;i++){
        $("#calculatedTable")[0].insertRow(i);
        for(let j = 0; j < $("#calculatedTable tr:eq(0) th").length; j++){
            $("#calculatedTable")[0].rows[i].insertCell(j);

        }
    }
    $("#calculatedTable")[0].rows[1].cells[1].contentEditable = "true"; // This Will Allow All Table Edaitable
    
    refreshCalcData(false);
}// This Function Will Add initial Table For Custom Segment Length...?

function calcTableRowCellDOM(rows,cells){ //for Simplifying Codes..?
    let rowsnum = rows*1;
    let cellsnum = cells*1;
    return $("#calculatedTable")[0].rows[rowsnum].cells[cellsnum];
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
/**
 * Testing CopyTo ClipBoard 
 *  REF : https://www.golangprograms.com/highlight-and-get-the-details-of-table-row-on-click-using-javascript.html
 * 
 * 
 * 
 * 
 * 
 */
// Trigger // highlight_row();

function highlight_row() {
    console.log("HighLighter Enabled!");

    var table = document.getElementById('calculatedTable');
    var cells = table.getElementsByTagName('td');

    for (var i = 0; i < cells.length; i++) {
        console.log("HighLighter CLICKEDDDDD!!!!");

        // Take each cell
        var cell = cells[i];
        // do something on onclick event for cell
        cell.onclick = function () {
            console.log("HighLighter CLICKEDDDDD!!!!");

            // Get the row id where the cell exists
            var rowId = this.parentNode.rowIndex;

            var rowsNotSelected = table.getElementsByTagName('tr');
            for (var row = 0; row < rowsNotSelected.length; row++) {
                rowsNotSelected[row].style.backgroundColor = "";
                rowsNotSelected[row].classList.remove('selected');
            }
            var rowSelected = table.getElementsByTagName('tr')[rowId];
            rowSelected.style.backgroundColor = "rgb(195,255,143)";
            rowSelected.className += " selected";

            //msg = 'The ID of the company is: ' + rowSelected.cells[0].innerHTML;
            //msg += '\nThe cell value is: ' + this.innerHTML;
            //alert(msg);
            alert("Clicked Row's Cell is : " +  rowSelected.cells[4].innerHTML);
            /**
             * Here Comes ""COPY"" Command... It may work....at this time!
             * 
             * 
             */
            /*
            $("#TextDummy").text(rowSelected.cells[4].innerHTML);
            let copyText = $("#TextDummy")[0];
            copyText.select();
            document.execCommand("copy");
            alert("복사된 문자열: " + copyText.value);
            */
            let copyText = rowSelected.cells[4].innerHTML;
            copy(copyText);
        }
    }

}

function copy(val) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = val;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }
