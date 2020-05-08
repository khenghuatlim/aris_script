//Based on ARIS 10 SR1
//KH Lim. Contact: khenghuatlim@gmail.com
//Description : Print object occ information, together with incoming connections (detail information) and outgoing information (detail information)
//Context: Object > Object Occ



/* Sample information
==============================


Name:Sample task Name
Symbol Num:1475, Symbol Name:Task
Type Num:22, Type Name:Function
Z-Order:30
ObjectID:(56xnwFiFPp4:u:L+3afNTv9LPXB:x:L+33+c)
***********************************

Incoming Relationship
Active Typenum:43, Active Type:triggers, Passive Type:is triggered by.
Source Obj:Is it an emergency situation?
Source Obj Type[Number]:50
SymName:Exclusive gateway
SymNum:1550
Z-Order:22
 SourceArrow:0
 TargetArrow:0
 CXN GUID:76502548-9a3b-11e5-64f7-0050568c0c7e
 CXN ObjectID:(56xnwFiFPp4:u:L+-7bSpSKG45n8:y:L+34+c)

Incoming Relationship Point
1743,1916
1989,1916
*****************************************


Outgoing Relationship
Active Typenum:116, Active Type:triggers, Passive Type:is triggered by.
TargetObj:Has something been shutdown?
TargetObj Type[Number]:50
SymName:Exclusive gateway
SymNum:1550
Z-Order:32
 SourceArrow:0
 TargetArrow:0
 CXN GUID:76502549-9a3b-11e5-64f7-0050568c0c7e
 CXN ObjectID:(56xnwFiFPp4:u:L+-7kFlkPEqoxJ:y:L+34+c)
Outgoing Point
2357,1916
2574,1916

Active Typenum:87, Active Type:belongs to, Passive Type:groups.
TargetObj:Run Asset Normal
TargetObj Type[Number]:304
SymName:Lane
SymNum:1531
Z-Order:2
 SourceArrow:0
 TargetArrow:0
 CXN GUID:76502541-9a3b-11e5-64f7-0050568c0c7e
 CXN ObjectID:(56xnwFiFPp4:u:L+-7MoF7o7CTaQ:y:L+34+c)
Outgoing Point
2349,1809
2948,1809
2948,2821
3076,2821

*****************************************

Name:Sample task Name
ObjectID:(56xnwFiFPp4:u:L+3afNTv9LPXB:x:L+33+c)
X:1989, Y:1803, Width:368, Heght:226
*/



var g_nloc  = Context.getSelectedLanguage();
main();

function main() {
    var objocc = ArisData.getSelectedObjOccs()[0];
    var objName = "Name:"+objocc.ObjDef().Name(g_nloc)+"";
    var symbol = "Symbol Num:"+objocc.SymbolNum()+", Symbol Name:"+objocc.SymbolName();
    var objdef = objocc.ObjDef();
    var objtype = "Type Num:"+objdef.TypeNum()+", Type Name:"+objdef.Type();
    var zOrder = "Z-Order:"+objocc.getZOrder();
    var lsObjID = "ObjectID:"+objocc.ObjectID();
    
    
    var lsHeader = (objName+"\n"+symbol+"\n"+objtype+"\n"+zOrder+"\n"+lsObjID);
    lsHeader+="\n***********************************\n\n";
    
    var arCxnOccIn = objocc.InEdges(Constants.EDGES_ALL);
    var str = "Incoming Relationship\n";
    var points = null;
        
    for (var i = 0 ; i<arCxnOccIn.length ; i++ ){
        str +="Active Typenum:"+arCxnOccIn[i].CxnDef().TypeNum()+",";
        str +=" Active Type:"+arCxnOccIn[i].CxnDef().ActiveType()+",";
        str +=" Passive Type:"+arCxnOccIn[i].CxnDef().PassiveType()+".";
        str +="\nSource Obj:"+arCxnOccIn[i].SourceObjOcc().ObjDef().Name(g_nloc);
        str +="\nSource Obj Type[Number]:"+arCxnOccIn[i].SourceObjOcc().ObjDef().TypeNum();
        str +="\nSymName:"+arCxnOccIn[i].SourceObjOcc().SymbolName();
        str +="\nSymNum:"+arCxnOccIn[i].SourceObjOcc().SymbolNum();
        str +="\nZ-Order:"+arCxnOccIn[i].SourceObjOcc().getZOrder();
        str +="\n SourceArrow:"+arCxnOccIn[i].getSourceArrow();
        str +="\n TargetArrow:"+arCxnOccIn[i].getTargetArrow();
        str +="\n CXN GUID:"+arCxnOccIn[i].CxnDef().GUID();
        str +="\n CXN ObjectID:"+arCxnOccIn[i].ObjectID();
        
        points = arCxnOccIn[i].PointList();
        str+="\n\nIncoming Relationship Point\n";
        for(var a=0;a< points.length;a++) {
            str+=points[a].getX()+","+points[a].getY()+"\n";
            //str+=points[a]+"\n";
        } 
    }
    str+="*****************************************\n\n";
    var arCxnOccOut = objocc.OutEdges(Constants.EDGES_ALL);
    str += "\nOutgoing Relationship\n";
    for (var i = 0 ; i<arCxnOccOut.length ; i++ ){
        str +="Active Typenum:"+arCxnOccOut[i].CxnDef().TypeNum()+",";
        str +=" Active Type:"+arCxnOccOut[i].CxnDef().ActiveType()+",";
        str +=" Passive Type:"+arCxnOccOut[i].CxnDef().PassiveType()+".";
        str +="\nTargetObj:"+arCxnOccOut[i].TargetObjOcc().ObjDef().Name(g_nloc);
        str +="\nTargetObj Type[Number]:"+arCxnOccOut[i].TargetObjOcc().ObjDef().TypeNum();
        str +="\nSymName:"+arCxnOccOut[i].TargetObjOcc().SymbolName();
        str +="\nSymNum:"+arCxnOccOut[i].TargetObjOcc().SymbolNum();
        str +="\nZ-Order:"+arCxnOccOut[i].TargetObjOcc().getZOrder();;
        str +="\n SourceArrow:"+arCxnOccOut[i].getSourceArrow();
        str +="\n TargetArrow:"+arCxnOccOut[i].getTargetArrow();
        str +="\n CXN GUID:"+arCxnOccOut[i].CxnDef().GUID();
        str +="\n CXN ObjectID:"+arCxnOccOut[i].ObjectID();
        
        points = arCxnOccOut[i].PointList();
        str+="\nOutgoing Point\n";
        for(var a=0; a<points.length;a++) {
            str+=points[a].getX()+","+points[a].getY()+"\n";
        }
        str+="\n";
    }
    
    str+="*****************************************\n\n";
    str+= "Name:"+ objocc.ObjDef().Name(g_nloc);
    str+= "\nObjectID:"+objocc.ObjectID();
    str+= "\nX:"+objocc.X();
    str+= ", Y:"+objocc.Y();
    str+= ", Width:"+objocc.Width();
    str+= ", Heght:"+objocc.Height();
    str+= "\n";

    
    
    
    Dialogs.MsgBox(lsHeader+str);
}

