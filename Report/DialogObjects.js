/*
    Some of the GUI DialogTemplate objects may not available to you, due to version issue. Please note
    Version : 10.0.12
    Author : Lim Kheng Huat
    Email : khenghuatlim@gmail.com 
    
  
*/
var gActiveFilter = ArisData.getSelectedFilters()[0]; //ArisData.ActiveFilter();
var g_nloc = Context.getSelectedLanguage();


main();


function main() {
    var title = "Your Title Here";
    //Constants.DIALOG_TYPE_ACTION      - action dialog (single page) 
    //Constants.DIALOG_TYPE_PROPERTY    -  multi-page property dialog 
    var result = Dialogs.showDialog(new myDialog(), Constants.DIALOG_TYPE_PROPERTY, title);
    debugPrintResult(result);
}

function myDialog() {
    var myResult = {
        btnCounter: 0,
        lbCombox: false,
        lbDropBox: false
    };
    
    
    var arComboBox = ["Value 1", "Value 2", "Value 3", "Value 4"];
    var arDropList = ["Sorted 4", "Sorted 3", "Sorted 2", "Sorted 1"];
    var arOption1 = ["Option A1", "Option A2", "Option A3"];
    var arOption2 = ["Option B1", "Option B2", "Option B3"];
    
    //This function allows the user to create templates for the different pages.
    //You can set single page as well. This sample create 2 pages
    this.getPages = function(){
        var left = 20;
        var iDialogTemplate1 = Dialogs.createNewDialogTemplate(600, 200, "First Page");
        iDialogTemplate1.GroupBox(left-10, 5, 580, 300, "Simple GUI Object", "GROUPBOX_1");
        iDialogTemplate1.PushButton(left, 20, 80, 15, "Click Me", "BUTTON_1");
        iDialogTemplate1.CheckBox(110, 20, 100, 15, "CheckMe", "CHECKBOX_1");
        iDialogTemplate1.ComboBox(left, 60, 100, 40, arComboBox, "COMBO_1");
    
        iDialogTemplate1.Text(left, 100, 90, 15, "Date Chooser", "TEXT_DATE");
        iDialogTemplate1.DateChooser(left+90, 100, 80, 15, "DATE_1");
        
        iDialogTemplate1.DropListBox(355, 60, 100, 40, arDropList, "DROPBOX_1", 3); //sorted + editable
        iDialogTemplate1.Text(left, 170, 250, 16, "Sample Text here, no font/style allowed");
        iDialogTemplate1.TextBox(left, 200, 100, 16, "TXT_EDIT_1");
        

        
        //second page
        var iDialogTemplate2 = Dialogs.createNewDialogTemplate(400, 200, "Second Page");
        iDialogTemplate2.OptionGroup("OPTIONGROUP_1");
        iDialogTemplate2.OptionButton(10,  10, 100,15,  "Option A1");
        iDialogTemplate2.OptionButton(110, 10, 100,15,  "Option A2");
        iDialogTemplate2.OptionButton(210, 10, 100,15,  "Option A3");
        
        iDialogTemplate2.OptionGroup("OPTIONGROUP_2");
        iDialogTemplate2.OptionButton(10,  30, 100,15,  "Option B1");
        iDialogTemplate2.OptionButton(110, 30, 100,15,  "Option B2");
        iDialogTemplate2.OptionButton(210, 30, 100,15,  "Option B3");        
        
        iDialogTemplate2.PushButton(320, 10, 100, 20, "Add Row", "ADD_ROW");
        var arTitle = ["Col 1", "Col 2", "Col 3"];
        var arEditorInfo = [Constants.TABLECOLUMN_SINGLELINE_EDIT, Constants.TABLECOLUMN_DEFAULT, Constants.TABLECOLUMN_DEFAULT];
        var arColWidth = ["33","33","34"];
        
        iDialogTemplate2.Table(10, 50, 520, 290, arTitle, arEditorInfo, arColWidth, "TABLE_1", Constants.TABLE_STYLE_DEFAULT);
        
        
        //third page
        var iDialogTemplate3 = Dialogs.createNewDialogTemplate(400, 200, "Third Page");
        iDialogTemplate3.Tree(10, 10, 450, 230, "TREE_1", 1);
        
        
        
        //Dummy try info
        
        
        
        /* Sample for picture, because can't run on multipage, because the API not allowed 
        iDialogTemplate2.Picture(10, 50, 300, 150, "PICTURE_1");
        gUserDialog=Dialogs.createUserDialog(iDialogTemplate2);
        var myPicture = Context.getFile("bpm_sample.png",Constants.LOCATION_SCRIPT);
        gUserDialog.setDlgPicture("PICTURE_1",myPicture, 2); //2 is png
        var lResult=Dialogs.show(gUserDialog);   // show dialog instance  
        */
      //  iDialogTemplate2.Tree()
                //Table
                //Tree
        return [iDialogTemplate1, iDialogTemplate2, iDialogTemplate3];
    }
    
    /*
    # Below dialog control allowed you override the listeners as *_selChanged 
    - CheckBox 
    - ComboBox 
    - DropListBox 
    - ListBox 
    - Tree 
    - OptionGroup */
    this.COMBO_1_selChanged = function(newSelection){
        myResult.lbCombox = true;
    }
    
    this.DROPBOX_1_selChanged = function() {
        myResult.lbDropBox = true;
    }
    
    //This function initializes the dialog pages which are already created and pre-initialized with static data from template
    //eg. set the COMBO_1 with index 2 (position 3, zero index)
    this.init = function(aPages) {
        aPages[0].getDialogElement("COMBO_1").setSelection(2);
        
        var arItem = [["data A1", "data A2", "data A3"], ["data B1", "data B2", "data B3"], ["data C1", "data C2", "data C3"]]
        
        //set table sample data
        aPages[1].getDialogElement("TABLE_1").setItems(arItem);
        
        var tree = aPages[2].getDialogElement("TREE_1");
        tree.addChild(null, "root item", 0);
        var root = tree.getItem(0);
        tree.addChild(root, "child_1", 1);
        tree.addChild(root, "child_2", 4);
        
        var leaf_4 = tree.getItem(4);
        tree.addChild(leaf_4, "child_4_1", 41);
        tree.addChild(leaf_4, "child_4_2", 42);
        tree.addChild(leaf_4, "child_4_3", 43);        
    
        myResult.tree = getRenderTree(tree, [0,1,4,41,42,43]);
        
    }
    
    //The result of this function is returned as result of Dialogs.showDialog(). 
    this.getResult = function() {
        myResult.checkbox_1     = this.dialog.getPage(0).getDialogElement("CHECKBOX_1").isChecked();
        
        //Returns the date in format MM/dd/yyyy, where MM : month, 2-digit
        myResult.date_1         = this.dialog.getPage(0).getDialogElement("DATE_1").getDate();
        myResult.combo_index_1  = this.dialog.getPage(0).getDialogElement("COMBO_1").getSelectedIndex();
        myResult.combo_value_1  = arComboBox[myResult.combo_index_1];
        
        arDropList.sort();
        myResult.droplist_index = this.dialog.getPage(0).getDialogElement("DROPBOX_1").getSelectedIndex();
        myResult.droplist_value = arDropList[myResult.droplist_index];
        myResult.text_edit      = this.dialog.getPage(0).getDialogElement("TXT_EDIT_1").getText();
        myResult.option_1_index = this.dialog.getPage(1).getDialogElement("OPTIONGROUP_1").getSelectedIndex();
        myResult.option_1_value = arOption1[myResult.option_1_index];
        
        myResult.option_2_index = this.dialog.getPage(1).getDialogElement("OPTIONGROUP_2").getSelectedIndex();
        myResult.option_2_value = arOption2[myResult.option_2_index];
        
        
        //is double array [[]]
        var arItem = this.dialog.getPage(1).getDialogElement("TABLE_1").getItems();
        myResult.table_1 = parseTable(arItem);
        
        
        
        //get selected node from tree
        var tree = this.dialog.getPage(2).getDialogElement("TREE_1");
        myResult.selectedTreeNodes = getSelectedTree(tree);
        
        return myResult;
    }
    
    //The implementation of this function should return true if the page is in a valid state. 
    //In this case (true) "Ok", "Finish", or "Next" is enabled.
    //Else - only "Cancel" button is enable
    this.isInValidState = function(pageNumber) {
        return true;
    }
    
    //This function is called after "Ok"/"Finish" or "Cancel" has been pressed and the current state data has been applied.
    //It can be used to update your data.
    this.onClose = function(pageNumber, bOk) {
        myResult.btnOK = bOk;
        myResult.pageNumber = pageNumber;
        myResult.btnCancel = !bOk;
    }

    //to count how many times the user clicks
    this.BUTTON_1_pressed = function() {
        myResult.btnCounter++;
    }
    
    this.ADD_ROW_pressed = function() {
        this.dialog.getPage(1).getDialogElement("TABLE_1").addRow();
    }
}

function getSelectedTree(tree) {
    var arInd = tree.getSelection();
    var str = getRenderTree(tree, arInd);
    return str;
}

function getRenderTree(tree, arIndex) {
    var str = "";
    if(arIndex == null) return str;
    
    for(var a=0;a<arIndex.length;a++) {
        treeItem = tree.getItem(arIndex[a]);
        str+=treeItem.getIndex()+"\t:"+treeItem.getName()+"\n"; 
    }
    return str;
}


function parseTable(arItem) {
    return arItem.toString();
}


function debugPrintResult(asResult) {
    var output = "";
    for (var prop in asResult) {
        output += prop + '\t: ' + asResult[prop]+'\n';
    }
    Dialogs.MsgBox(output);
}
