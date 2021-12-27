var g_nloc = Context.getSelectedLanguage();
//var outfile = Context.createOutputObject(Constants.OutputPDF, "abc.pdf");
var outfile = Context.createOutputObject(Constants.OutputDOCX, "abc.docx");
//var outfile = Context.createOutputObject(Constants.OutputXLSX, "abc02.xlsx");
//Context.setSelectedFormat();

outfile.DefineF("STD", "Calibri", 8, Constants.C_BLACK, Constants.C_TRANSPARENT, Constants.FMT_LEFT | Constants.FMT_VTOP, 0, 21, 0, 0, 0, 1);
outfile.DefineF("BOLD", "Calibri", 8, Constants.C_BLACK, Constants.C_TRANSPARENT, Constants.FMT_BOLD | Constants.FMT_CENTER | Constants.FMT_VTOP, 0, 21, 0, 0, 0, 1);
outfile.DefineF("GREY", "Calibri", 8, Constants.C_GREY_80_PERCENT, Constants.C_TRANSPARENT, Constants.FMT_CENTER | Constants.FMT_VTOP, 0, 21, 0, 0, 0, 1);


main();
outfile.WriteReport();


function main() {
    var arGroup = ArisData.getSelectedGroups();
    if(arGroup.length !=1) {
        Dialogs.MsgBox("Only single group selection is allowed", Constants.MSGBOX_ICON_ERROR, "Message Box");
        return;
    }
    var group = arGroup[0];
    var arChildGroup = group.Childs(true);
    
    
    outfile.BeginTable(100, Constants.C_BLACK, Constants.C_TRANSPARENT, Constants.FMT_CENTER, 0);
    outfile.TableRow();
    for(var a=0;a<arChildGroup.length;a++) {
        outfile.TableCellF(arChildGroup[a].Name(g_nloc), 50, "STD");
        outfile.TableRow();
    }
     outfile.EndTable("tab_01", 100, "Calibri", 20, Constants.C_BLACK, Constants.C_TRANSPARENT, 0, Constants.FMT_CENTER, 0);    
}


//BUILD THESE 2 SCRIPTS
//BASED ON SELECTED MODEL, PRINT OUT INTO EXCEL , MODEL NAME THEN LIST OF GUID, OBJECT NAMES > XLSX
//BASED ON SELECTED MODEL PRINT THE MODEL PICTURE INTO PDF > PDF