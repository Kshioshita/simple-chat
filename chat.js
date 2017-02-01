
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

				// create a new div
				var div=document.createElement("div");

				// add message to div
				var divtext=document.createTextNode(data);
				div.appendChild(divtext);

				// set color of div depending on length of message, time, and ASCII code of the message
				var length=data.length;
				var ranlen=Math.round((length*2550)/255);
				var today=new Date();
				var second=Math.round(today.getSeconds()*4.25);
				var numdata=data.charCodeAt(0);
				div.style.backgroundColor='rgb('+ ranlen +',' +second+','+numdata+')';

				//place the div in a random spot on the page
				var hposSec=Math.round(Math.random()*810);
				var vposSec=Math.round(Math.random()*600);
				div.style.position="absolute";
				div.style.left=hposSec+"px";
				div.style.top=vposSec+"px";
				
				// basic css of the newly created div
				div.style.textAlign="center";
				div.style.fontSize="2em";
				div.style.padding="20px";
				div.style.borderRadius="100%";
				div.style.zIndex="-1";
				div.style.color="white";
				div.style.opacity="0.8";

				// add the newly created div to the html
				document.getElementById("main").appendChild(div);

			});
			
			

			var sendmessage = function(message) {
				// print to browser console the envent that's happening
				console.log("chatmessage: " + message);
				// emit this event to the server
				socket.emit('chatmessage', message);
				var form=document.getElementById("myForm");
				form.reset();
			};