//Based on ARIS 10 SR1
//KH Lim. Contact: khenghuatlim@gmail.com
//Description : Get list of successors or predecessors on seleced Object. Another print out, together with the connection type
//Context: Object > Object Occ


var g_nloc          = Context.getSelectedLanguage();
var gDB             = ArisData.getActiveDatabase();
var gActiveFilter   = ArisData.ActiveFilter();
var gUser           = ArisData.getActiveUser();


main();

function main() {
    var objocc = ArisData.getSelectedObjOccs()[0];
    var arSuccessors    = subFindAllRelationship(objocc,Constants.EDGES_ALL, 1); //EDGES_ALL > inclusive structured and unstructured
    var arPredecessors  = subFindAllRelationship(objocc,Constants.EDGES_ALL, 2);
    
    var str01 = "Successors\n";
    for(var a=0;a<arSuccessors.length;a++) {
        str01+="["+a+"]"+arSuccessors[a].ObjDef().Name(g_nloc) + "\n";
    }
    str01+="\nPredecessors\n";
    for(var a=0;a<arPredecessors.length;a++) {
        str01+="["+a+"]"+arPredecessors[a].ObjDef().Name(g_nloc) + "\n";
    }
    Dialogs.MsgBox(str01);
    
    
    var arSuccessorsObj    = subFindAllRelationshipObject(objocc,Constants.EDGES_ALL, 1);
    var arPredecessorsObj  = subFindAllRelationshipObject(objocc,Constants.EDGES_ALL, 2);
    
    var str02 = "\n\nSuccessors with Cxn\n";
    for(var a=0;a<arSuccessorsObj.length;a++) {
        str02+="["+a+"]"+arSuccessorsObj[a].objocc.ObjDef().Name(g_nloc) + ", Cxn Type:"+arSuccessorsObj[a].cxnocc.CxnDef().ActiveType()+"\n";
    }
    str02+="\nPredecessors with Cxn\n";
    for(var a=0;a<arPredecessorsObj.length;a++) {
        str02+="["+a+"]"+arPredecessorsObj[a].objocc.ObjDef().Name(g_nloc) + ", Cxn Type:"+arPredecessorsObj[a].cxnocc.CxnDef().ActiveType()+"\n";
    }
    Dialogs.MsgBox(str02);
}




function subFindAllRelationship(occ, direction, index) {
    var arCxnOcc = null; 
    var myarray = new Array();
  
    switch(index) {
        case 1: //successors
            arCxnOcc = occ.OutEdges(direction);
            for (var i = 0 ; i < (arCxnOcc.length - 1)+1 ; i++ ){
                myarray[myarray.length] = arCxnOcc[i].TargetObjOcc();
            }
            //cater for left first,  then right 
            //myarray.sort(subSortLeftThenRight);
        break;
        
        case 2: //predecessors
            arCxnOcc = occ.InEdges(direction);
            for (var i = 0 ; i<arCxnOcc.length ; i++ ){
                myarray[myarray.length] = arCxnOcc[i].SourceObjOcc();
            }
        break;
        
        case 3:
            myarray = myarray.concat(subFindAllRelationship(occ, direction, 1));
            myarray = myarray.concat(subFindAllRelationship(occ, direction, 2));
        break;
    }
    return myarray;
}


//var arSuccessors   = subFindAllRelationship(occ,Constants.EDGES_ALL, 1);
function subFindAllRelationshipObject(occ, direction, index) {
    var arCxnOcc = null; 
    var myarray = new Array();
    var obj = new Object();
    switch(index) {
        case 1: //successors
            arCxnOcc = occ.OutEdges(direction);
            for (var i = 0 ; i < (arCxnOcc.length - 1)+1 ; i++ ){
                obj = new Object();
                obj.cxnocc = arCxnOcc[i];
                obj.objocc = arCxnOcc[i].TargetObjOcc();
                myarray.push(obj);
            }
            //cater for left first,  then right 
            //myarray.sort(subSortLeftThenRight);
        break;
        
        case 2: //predecessors
            arCxnOcc = occ.InEdges(direction);
            for (var i = 0 ; i<arCxnOcc.length ; i++ ){
                obj = new Object();
                obj.cxnocc = arCxnOcc[i];
                obj.objocc = arCxnOcc[i].SourceObjOcc();
                myarray.push(obj);
            }
        break;
        
        case 3:
            myarray = myarray.concat(subFindAllRelationshipObject(occ, direction, 1));
            myarray = myarray.concat(subFindAllRelationshipObject(occ, direction, 2));
        break;
    }
    return myarray;    
}

