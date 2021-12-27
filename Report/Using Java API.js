var g_nloc      = Context.getSelectedLanguage();

main();

function main() {
    var hash = new java.util.HashMap();
    for(var a=0;a<10;a++) {
        hash.put("key_"+(a+1), "value_"+(a+1));
    }
    
    
    var str = "";
    var iter = hash.entrySet().iterator();
    while (iter.hasNext()) {
        var map = iter.next();
        str+=map.getKey() + ":"+map.getValue() + "\n";
    }
    
    Dialogs.MsgBox(str);
}