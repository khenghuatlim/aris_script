var g_nloc      = Context.getSelectedLanguage();


main();

function main() {
    var arObjOcc = ArisData.getSelectedObjOccs();
    
    var str = "";
    for(var a=0;a<arObjOcc.length;a++) {
        str+=arObjOcc[a].ObjDef().Name(g_nloc)+"\n";
     


        str+=">>>>>>"+arObjOcc[a].ObjDef().Attribute(Constants.AT_LUSER, g_nloc).getValue()+"\n";
     
        var arAttr = arObjOcc[a].ObjDef().AttrList(g_nloc);
        for(var b=0;b<arAttr.length;b++) {
            str+=arAttr[b].Type() +"["+arAttr[b].TypeNum()+"]" +" :"+ arAttr[b].getValue()+"\n";
        }
        str+="\n"
    }
    
    Dialogs.MsgBox(str);
}