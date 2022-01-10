var g_nloc          = Context.getSelectedLanguage();
var gDB             = ArisData.getActiveDatabase();
var gActiveFilter   = ArisData.ActiveFilter();
var gUser           = ArisData.getActiveUser();

var gWorkBook       = null;


main();

function main() {
    var excelFile = subUploadExcelFile();
    if(excelFile == null) {
        Dialogs.MsgBox("No File has been uploaded!", Constants.MSGBOX_ICON_ERROR, "Message Box");
        return;
    }
    
    var filename = excelFile.getName()+"";
    filename = filename.substring(0, filename.lastIndexOf("."))  + ".RESULTS.xlsx";
    gWorkBook = Context.createExcelWorkbook(filename, excelFile.getData());
    sheet01 = gWorkBook.getSheetAt(0);
    startUpdateSheet(sheet01, ArisData.getSelectedGroups()[0]);
    gWorkBook.write();
}



function startUpdateSheet(sheet, group) {
    
    var arChild = group.Childs(true);
    arChild.unshift(group); //append - put as last, unshift park at first element
    var row = 3;
    for(var a=0; a<arChild.length;a++) {
        WriteToRowWithStyle(sheet, row, 0, arChild[a].Name(g_nloc));
        WriteToRowWithStyle(sheet, row, 1, arChild[a].GUID());
        row++;
    }
    
}




function subReadFromXls(sheet, row, column){
    try {        
        var data = "";
        var myRow = sheet.createRow(row);        
        var myCell = myRow.createCell(column);     
        
        if(myCell){
            data = myCell.getCellValue() + "";
        }
        return data;
    }catch(ex){
        errorCatch(ex);
    }
}


//sample style creation
//var cellFont3 = gWorkBook.getFont("Calibri", 8, RGB(255,0,0), false, false, false, false, Constants.XL_FONT_SS_NONE);
//cellStyleRed = gWorkBook.createCellStyle(cellFont3,0,0,0,0,RGB(255,0,0),RGB(255,0,0),RGB(255,0,0),RGB(255,0,0), Constants.ALIGN_LEFT, Constants.VERTICAL_CENTER, Constants.C_TRANSPARENT,Constants.C_TRANSPARENT,Constants.SOLID_FOREGROUND);
function WriteToRowWithStyle(sheet, row, column, value, cStyle, valueType){
    var objExcelRow= sheet.getRowAt(row);
    if(objExcelRow == null ){
        objExcelRow = sheet.createRow(row);
    }
    var objCell = objExcelRow.getCellAt(column);
    if(objCell == null){
        objCell = objExcelRow.createCell(column);      
    }
    if(cStyle != null) {
        objCell.setCellStyle(cStyle);
    }
    safeUpdateCellValue(objCell, value, valueType);    
}


function safeUpdateCellValue(objCell, value, valueType){
    value = String(value);
    if(value.length > 32700) {
        //objCell.setCellValue();
        value = value.substring(0, 32700);
    }   //objCell.setCellValue(value);
    
    if(valueType == null){
        objCell.setCellValue(value);                  
    }              
    else if(valueType == "Link") {
        objCell.setHyperlink(value,value);
    }
    else if(valueType == "Double") {
        objCell.setDoubleCellValue(parseFloat(value));
    }
}

function errorCatch(ex){
    var line = ex.lineNumber
    var message = ex.message
    var filename = ex.fileName
    var exJava = ex.javaException
    if(exJava!=null) {
        var aStackTrace = exJava.getStackTrace()
        for(var iST=0; iST<aStackTrace.length; iST++) {
            message = message + "\n" + aStackTrace[iST].toString()
        }
    }
    //TODO : Disable Dialogs while Enable to User
    Dialogs.MsgBox("Exception in file "+filename+", line "+line+":\n"+message )
}


function subUploadExcelFile(){
    var fileFormat = "*.xls!!Worksheet Files |*.xls;*.xlsx|Chart Files |*.xlc|Data Files |*.xlc; *.xls|";
    var selFiles = Dialogs.getFilePath("",fileFormat, "", "Select Excel file to load" ,0);
    if (selFiles != null && selFiles.length > 0) {
        return selFiles[0];
    }
    return null;
}



//RGB(255,0,0)
function RGB(r, g, b) {
	return (new java.awt.Color(r/255.0,g/255.0,b/255.0,1)).getRGB() & 0xFFFFFF
}