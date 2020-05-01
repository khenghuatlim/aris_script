//Based on ARIS 10 SR1
//Description : Print all attributes of selected items (eg. Groups/Models/Object Occurrences, Object Definitions
//Context: Groups/Models/Object (occurrences/definitions)



var g_nloc  = Context.getSelectedLanguage();
var gDB     = ArisData.getActiveDatabase();
var gActiveFilter   = ArisData.ActiveFilter();

             
main();

function main() {
    var arItem = ArisData.getSelectedGroups();
    if(arItem == null || arItem.length == 0) {
        arItem = ArisData.getSelectedModels();
    }
    if(arItem == null || arItem.length == 0) {
        arItem = ArisData.getSelectedObjOccs();
    }
    if(arItem == null || arItem.length == 0) {
        arItem = ArisData.getSelectedObjDefs();
    }

    var str = "";
    var map = null;
    var ite = null;
    var guid = "";
    for(var a=0;a<arItem.length;a++) {
        if(arItem[a].KindNum() == Constants.CID_OBJOCC) {
            arItem[a] = arItem[a].ObjDef();
        }
        
        str+="\n\nItem Name:"+arItem[a].Name(g_nloc);
        map = arItem[a].AttrMap(g_nloc);
        ite = map.entrySet().iterator();

        while(ite.hasNext()) {
            var entry = ite.next();
            //guid = gActiveFilter.isUserDefinedAttrType(entry.getKey())? gActiveFilter.UserDefinedAttributeTypeGUID(entry.getKey()):"";
            var apiname = gActiveFilter.getAPIName(Constants.CID_ATTRDEF, entry.getKey());
            str+="\nattr(num):"+entry.getKey()+", api name:"+apiname+", AttrName:"+gActiveFilter.AttrTypeName(entry.getKey()) + ", AttrValue:"+entry.getValue().getValue();
        }
    }
    Dialogs.MsgBox(str);
}