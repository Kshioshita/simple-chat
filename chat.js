
// create socket connection
			var socket = io.connect();
			
			
			// gives feedback when connection is established
			socket.on('connect', function() {
				// prints to browser console log, console log on server side prints to command line
				console.log("Connected");
			});

			// Receive from any event - this is received from the server's broadcast.emit
			socket.on('chatmessage', function (data) {
				console.log(data);
				// document.getElementById('messages').innerHTML = "" + data + "" + document.getElementById('messages').innerHTML;
				var div=document.createElement("div");
				var divtext=document.createTextNode(data);
				div.appendChild(divtext);
				var length=data.length;
				var ranlen=Math.round((length*1000)/255);
				var today=new Date();
				var second=Math.round(today.getSeconds()*4.25);
				var hposSec=Math.round(Math.random()*810);
				var vposSec=Math.round(Math.random()*600);
				var numdata=data.charCodeAt(0);
				console.log(ranlen);
				console.log(second);
				console.log(numdata);
				console.log(hposSec);
				console.log(vposSec);
				div.style.textAlign="center";
				div.style.fontSize="2em";
				div.style.padding="20px";
				div.style.backgroundColor='rgb('+ ranlen +',' +second+','+numdata+')';
				div.style.position="absolute";
				div.style.left=hposSec+"px";
				div.style.top=vposSec+"px";
				div.style.borderRadius="100%";
				div.style.zIndex="-1";
				div.style.color="white";
				document.getElementById("main").appendChild(div);

			});
			
			

			var sendmessage = function(message) {
				// print to browser console the envent that's happening
				console.log("chatmessage: " + message);
				// emit this event to the server
				socket.emit('chatmessage', message);
				// var form=document.getElementById("myForm");
				// form.reset();
			};