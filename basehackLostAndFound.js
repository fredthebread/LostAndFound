/** This is a sample code for your bot**/
	    function MessageHandler(context, event) {
	        
	        if(!context.simpledb.roomleveldata.found)
	            context.simpledb.roomleveldata.found = "";
	        if(! context.simpledb.roomleveldata.lodata)
	            context.simpledb.roomleveldata.lodata = "";
	        if(! context.simpledb.roomleveldata.strstate)
	            context.simpledb.roomleveldata.strstate = "";
	        if(! context.simpledb.roomleveldata.database)
	            context.simpledb.roomleveldata.database = [];
	        if(! context.simpledb.roomleveldata.locat)
	            context.simpledb.roomleveldata.locat = "false";
	        numinstances = parseInt(context.simpledb.botleveldata.numinstance) + 1;
	        context.simpledb.botleveldata.numinstance = numinstances;
	        //context.console.log(context.simpledb.roomleveldata.strstate);
	        
	        if(event.message.toLowerCase()=="thank you"||event.message.toLowerCase()=="bye"||event.message.toLowerCase()=="end"){
	            if(context.simpledb.roomleveldata.strstate=="found"){
	                context.sendResponse("Thank you for finding something!");
	            }
	            else if(context.simpledb.roomleveldata.strstate == "lost"){
	                context.sendResponse("Hope you have found or will find something!");
	            }
	            else{
	                context.sendResponse("Good Bye.");
	            }
	            context.simpledb.roomleveldata.strstate="";
	            context.simpledb.roomleveldata.locat = "false";
	            context.simpledb.roomleveldata.database=[];
	            return;
	        }
	        
	        
	        if(context.simpledb.roomleveldata.strstate=="lostwhat"){
	            var tempLWA = event.message;
	            var tempaLWA = tempLWA.split(/\s+/);
	            if(tempLWA!="nothing"&&tempaLWA.length==1){
	                context.simpledb.roomleveldata.strstate="lost";
	                context.simpledb.roomleveldata.database[0] = (event.message.toLowerCase());
	                context.simpledb.roomleveldata.locat  = "ltrue";
	                context.sendResponse("Please send your location\n(Only works with Facebook, Telegram, and Line\nReply \"incompatible\" if on different messenger app)");
	                return;
	            }
	            else{
	                context.simpledb.roomleveldata.strstate="";
	                context.sendResponse("Invalid object\nRestarting your request");
	            }
	        }
	        else if(context.simpledb.roomleveldata.strstate=="foundwhat"){
	            var tempFWA = event.message.toLowerCase();
	            var tempaFWA = tempFWA.split(/\s+/);
	            if(tempFWA!="nothing"&&tempaFWA.length==1){
	                //context.sendResponse(tempFWA);
	                context.simpledb.roomleveldata.strstate="found";
	                context.simpledb.roomleveldata.database[0] = tempFWA;
	                context.simpledb.roomleveldata.found = tempFWA;
	                context.sendResponse("Please send your location\n(Only works with Facebook, Telegram, and Line\nReply \"incompatible\" if on different messenger app)");
	                context.simpledb.roomleveldata.locat = "ftrue";
	                return;
	            }
	            else{
	                context.simpledb.roomleveldata.strstate="";
	                context.sendResponse("Invalid object\nRestarting your request");
	            }
	        }
	        else if(context.simpledb.roomleveldata.strstate=="lostwhose"){
	            var tempLWO = event.message;
	            var tempaLWO = tempLWO.split(/\s+/);
	            if(tempaLWO.length==1){
	                context.sendResponse(tempLWO);
	                context.simpledb.roomleveldata.strstate="lost";
	                return;
	            }
	            else{
	                context.simpledb.roomleveldata.strstate="";
	                context.sendResponse("Restarting your request");
	            }
	        }
	        else if(context.simpledb.roomleveldata.strstate=="foundwhose"){
	            context.simpledb.roomleveldata.strstate="found";
	            return;
	        }
	        
	        if(event.message.toLowerCase().indexOf("lost")>-1||event.message.toLowerCase().indexOf("found")>-1){
	            var input = event.message.toLowerCase();
	            input = removePunc(input);
	            var sArr = input.split(/\s+/);
	            context.simpledb.roomleveldata.locat="false";
	            context.simpledb.roomleveldata.database=[];
	            context.simpledb.roomleveldata.found = "";
	            for(var i=0; i<sArr.length; i++){
	                if(sArr[i]=="lost"){
	                    context.simpledb.roomleveldata.strstate="lost";
	                    if(sArr.length<=i+1||sArr[i+1]=="something"){
	                        context.sendResponse("What did you lose?");
	                        context.simpledb.roomleveldata.strstate="lostwhat";
	                    }
	                    else if(sArr[i+1]=="my"||sArr[i+1]=="our"||sArr[i+1]=="a"||sArr[i+1]=="his"||sArr[i+1]=="her"||sArr[i+1]=="their"||sArr[i+1].indexOf("'s")>-1){
	                        //context.sendResponse(searchOne(context, sArr[i+2]));
	                        context.simpledb.roomleveldata.locat="ltrue";
	                        context.sendResponse("Please send your location\n(Only works with Facebook, Telegram, and Line\nReply \"incompatible\" if on different messenger app)");
	                        context.simpledb.roomleveldata.database[0]=sArr[i+2];
	                    }
	                    /*else if(sArr[i+1]=="his"||sArr[i+1]=="her"||sArr[i+1]=="their"){
	                        context.sendResponse("Whose "+sArr[i+2]+" is it?");
	                        context.simpledb.roomleveldata.strstate="lostwhose";
	                    }
	                    else if(sArr[i+1].indexOf("'s")>-1){
	                        
	                    }*/
	                    else if(!(sArr[i+1]=="my"||sArr[i+1]=="his"||sArr[i+1]=="her"||sArr[i+1]=="their"||sArr[i+1]=="our"||sArr[i+1]=="a"||sArr[i+1].indexOf("'s")>-1)){
	                        context.simpledb.roomleveldata.locat="ltrue";
	                        context.sendResponse("Please send your location\n(Only works with Facebook, Telegram, and Line\nReply \"incompatible\" if on different messenger app)");
	                        context.simpledb.roomleveldata.database[0]=sArr[i+1];
	                    }
	                    else{
	                        context.sendResponse("Do you have proper grammer?");
	                    }
	                    return;
	                }
	                else if(sArr[i]=="found"){
	                    context.simpledb.roomleveldata.found = "";
	                    context.simpledb.roomleveldata.strstate="found";
	                    if(sArr.length<=i+1||sArr[i+1]=="something"){
	                        context.sendResponse("What did you find?\n(one word)");
	                        context.simpledb.roomleveldata.strstate="foundwhat";
	                    }
	                    else if(sArr[i+1]=="a"){
	                        //context.simpledb.doPut("");
	                        context.simpledb.roomleveldata.database[0] = sArr[i+2];
	                        context.simpledb.roomleveldata.found = sArr[i+2];
	                        context.sendResponse("Please send your location\n(Only works with Facebook, Telegram, and Line\nReply \"incompatible\" if on different messenger app)");
	                        context.simpledb.roomleveldata.locat = "ftrue";
	                        //context.sendResponse("That's sad that you lost your "+sArr[i+2]);
	                    }
	                    /*else if(sArr[i+1]=="his"||sArr[i+1]=="her"||sArr[i+1]=="their"){
	                        context.sendResponse("Whose "+sArr[i+2]+" is it?");
	                        context.simpledb.roomleveldata.strstate="foundwhose";
	                    }
	                    else if(sArr[i+1].indexOf("'s")==-1){
	                        
	                    }*/
	                    else if(!(sArr[i+1]=="my"||sArr[i+1]=="his"||sArr[i+1]=="her"||sArr[i+1]=="their"||sArr[i+1]=="our"||sArr[i+1]=="a"||sArr[i+1].indexOf("'s")==-1)){
	                        context.simpledb.roomleveldata.database[0] = sArr[i+1];
	                        context.simpledb.roomleveldata.found = sArr[i+1];
	                        context.sendResponse("Please send your location\n(Only works with Facebook, Telegram, and Line\nReply \"incompatible\" if on different messenger app)");
	                        context.simpledb.roomleveldata.locat = "ftrue";
	                    }
	                    else{
	                        context.sendResponse("Do you have proper grammer?");
	                    }
	                    return;
	                }
	            }
	            return;
	        }
	        
	        if(context.simpledb.roomleveldata.locat=="ltrue"||context.simpledb.roomleveldata.locat=="ftrue"){
	            var lat;
	            var long;
	            if(event.message.toLowerCase()=="incompatible"){
	                lat = "";
	                long = "";
	            }
	            else if(event.messageobj.type=='location'){
                    lat = event.messageobj.latitude;
                    long = event.messageobj.longitude;
                    //var url = event.message;
                    context.sendResponse("Your lat:"+lat+", Your long:"+long+"\nI will use these coordinates.");
                }
                else if(event.message.toLowerCase()!="incompatible"){
                    context.sendResponse("Sorry, I did not understand you.");
                    return;
                }
                context.simpledb.roomleveldata.database[1] = (lat);
                context.simpledb.roomleveldata.database[2] = (long);
                
                
                var param = context.simpledb.roomleveldata.database;
                if(context.simpledb.roomleveldata.locat=="ltrue"){
                    context.sendResponse(searchOne(context, param[0], param[1], param[2]));
                }
                else{
                    switch(context.simpledb.roomleveldata.found){
                        case "dog":
                            context.sendResponse("What breed is the dog?\n(put unknown if you don't know)");
                            break;
                        case "cat":
                            break;
                    }
                }
                context.simpledb.roomleveldata.locat = "false";
                return;
	        }
	        
	        if(context.simpledb.roomleveldata.found == "dog"){
	            if(context.simpledb.roomleveldata.database.length==3){
	                context.simpledb.roomleveldata.database[3] = event.message.toLowerCase();
	                context.sendResponse("What size is the dog?\n(small, medium, or large)");
	            }
	            else if(context.simpledb.roomleveldata.database.length==4){
	                context.simpledb.roomleveldata.database[4] = event.message.toLowerCase();
	                context.sendResponse("What color is the dog?\n(put unknown if you don't know)");
	            }
	            else if(context.simpledb.roomleveldata.database.length == 5){
	                context.simpledb.roomleveldata.database[5] = event.message.toLowerCase();
	                context.sendResponse("If you know the name type it, otherwise type unknown");
	            }
	            else if(context.simpledb.roomleveldata.database.length==6){
	                context.simpledb.roomleveldata.database[6] = event.message.toLowerCase();
	                var db = context.simpledb.roomleveldata.database;
	                context.simplehttp.makePost("https://lostandfound-4519c.firebaseio.com/", "0", {"lat":db[1], "long":db[2], "breed":db[3], "size":db[4], "color":db[5], "name":db[6]});
	            }
	        }
	        else if(context.simpledb.roomleveldata.found == "cat"){
	            
	        }
	        
	        if(event.message.toLowerCase()=="help"){
	            context.sendResponse("Try typing \"I found/lost something\"");
	            return;
	        }
	        
	        
	        
	        /*else {
	            context.sendResponse("Sorry, \""+event.message+"\" is not a proper command."); 
	        }*/
	        /*
	        context.console.log("test")
	        if(event.message.toLowerCase() == "httptest") {
	            context.simplehttp.makeGet("http://ip-api.com/json");
	        }
	        else if(event.message.toLowerCase() == "testdbget") {
	            context.simpledb.doGet("putby")
	        }
	        else if(event.message.toLowerCase() == "testdbput") {
	            context.simpledb.doPut("putby", event.sender);
	        }
	        else {
	            context.sendResponse('No keyword found : '+event.message); 
	        }*/
	    }
	    
	    /*function LocationHandler(context,event){
            var lat = event.messageobj.latitude;
            var lang = event.messageobj.longitude;
            var url = event.message;
            context.sendResponse("Your lat:"+lat+"\n Your lang:"+lang+"\n MapURL:"+url);        
        }*/
	    
	    function searchOne(context, obt, lat, long){
	        if(obt.charAt(obt.length-1)=='s'){
	            obt = obt.substring(0, obt.length-1);
	        }
	        /*if(lat==""&&long==""){
	            context.simpledb.roomleveldata.lodata = "";
	        }*/
	        if(obt=="dog"){
	            context.simplehttp.makeGet("https://lostandfound-4519c.firebaseio.com/dog.json");
	        }
	        else if(obt=="cat"){
	            
	        }
	    }
	    
	    function searchTwo(){
	        
	    }
	    
	    function removePunc(input){
	        var punc = [".", ",", "!", "?", "-", ":", ";", "—", "(", ")", "[", "]", "{", "}", "\""];
	        var cArr = input.split('');
	        for(var i=0; i<cArr.length; i++){
	            for(var j=0; j<punc.length; j++){
	                if(cArr[i] == punc[j]) cArr[i]=" ";
	            }
	        }
	        input = cArr.join('');
	        return input;
	    }
	    
	    function dist(lat1, long1, lat2, long2){
	        context.sendResponse("hiiii");
	        //Radius of the earth in:  1.609344 miles,  6371 km  | var R = (6371 / 1.609344);
            var R = 3958.7558657440545; // Radius of earth in Miles 
            var dLat = toRad(lat2-lat1);
            var dLong = toRad(long2-long1); 
            context.sendResponse("hiiii");
            var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
            Math.sin(dLong/2) * Math.sin(dLong/2); 
            context.sendResponse("hiiii");
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            context.sendResponse("hiiii");
            var d = R * c;
            context.sendResponse("hiiii");
            return d;
	    }
	    
	    /** Functions declared below are required **/
	    function EventHandler(context, event) {
	        if(! context.simpledb.botleveldata.numinstance)
	            context.simpledb.botleveldata.numinstance = 0;
	        numinstances = parseInt(context.simpledb.botleveldata.numinstance) + 1;
	        context.simpledb.botleveldata.numinstance = numinstances;
	        context.sendResponse("Thank you for adding LostAndFoundBot! Did you lose or find something?");
	    }
	
	    function HttpResponseHandler(context, event) {
	        var data = JSON.parse(event.getresp);
	        var ds = [];
	        if(event.geturl === "https://lostandfound-4519c.firebaseio.com/dog.json"){
	            //context.sendResponse(event.getresp);
	            var clat = context.simpledb.roomleveldata.database[1];
	            var clong = context.simpledb.roomleveldata.database[2];
	            
	            if(clat==""&&clong==""){
	                clat = parseFloat("3291.42");
	                clong = parseFloat("2424.23");
	                context.sendResponse("helloo");
	                for(var i=0; i<data.length; i++){
	                    var dLat = parseFloat(data[i].lat);
	                    var dLong = parseFloat(data[i].long);
	                    context.sendResponse(dLat+" "+dLong+" "+i);
	                    context.sendResponse(clat.toString());
	                    var d = dist(dLat, dLong, clat, clong);
	                    ds[i] = d;
	                    context.sendResponse("hiiii");
	                }
	            }
	            else{
	                context.sendResponse("hello");
	                for(var i=0; i<data.length; i++){
	                    var dLat = parseFloat(data[i].lat);
	                    var dLong = parseFloat(data[i].long);
	                    var dis = distance(dLat, dLong, parseFloat(database[1]), parseFloat(database[2]));
	                    ds[ds.length] = dis;
	                }
	            }
	            context.sendResponse("hi");
	            context.sendResponse(ds[0]);
	        }
	        else if(data == "success")
	            context.sendResponse("I successfully stored your data");
	    }
	
	    function DbGetHandler(context, event) {
	        context.sendResponse("testdbput keyword was last get by:" + event.dbval);
	    }
	
	    function DbPutHandler(context, event) {
	        context.sendResponse("testdbput keyword was last put by:" + event.dbval);
	    }