//Based on ARIS 10 SR1
//System.getProperty - this disabled by ARIS
//Below solution is work around to get the properties

//Context : <Any>
main();


function main() {
    //sample to get System Property
    var osname = subGetSystemProperty("os.name");
    Dialogs.MsgBox(osname);
}



function subGetSystemProperty(key) {
    var cSystem = java.lang.Class.forName("java.lang.System");
    var mGetProperties = cSystem.getMethod("getProperties");
    var systemProperties = mGetProperties.invoke(null);
    var sortedSystemProperties = new java.util.TreeMap(systemProperties);
    return sortedSystemProperties.get(key);
}