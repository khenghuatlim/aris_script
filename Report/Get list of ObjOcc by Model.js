var g_nloc      = Context.getSelectedLanguage();

main();


function main() {
    var arModel = ArisData.getSelectedModels();
    var str = "";
    for(var a=0;a<arModel.length; a++) {
        var arOcc = arModel[a].ObjOccList();
        str+="Model: "+arModel[a].Name(g_nloc)+"\n";
        for(var b=0;b<arOcc.length;b++){
            str+=arOcc[b].ObjDef().Name(g_nloc)+"\n";
        }
        str+="\n";
    }
    Dialogs.MsgBox(str);
}