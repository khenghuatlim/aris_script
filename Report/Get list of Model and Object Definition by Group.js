var g_nloc      = Context.getSelectedLanguage();

//How about sub-group ??
main();


function main() {
    var arGroup = ArisData.getSelectedGroups();
    
    var str = "";
    for(var a=0;a<arGroup.length;a++) {
        var arObjDef = arGroup[a].ObjDefList();
        var arModel = arGroup[a].ModelList();
        
        str+="Group Name:"+arGroup[a].Name(g_nloc) + "\n";
        str+="List of Objdef:\n";
        for(var b=0; b<arObjDef.length; b++) {
            str+=arObjDef[b].Name(g_nloc) + "\n";
        }
        
        str+="\nList of Model:\n";
        for(var b=0; b<arModel.length; b++) {
            str+=arModel[b].Name(g_nloc)+"\n";
        }
        str+"\n";
    }
    Dialogs.MsgBox(str);
    
    
}