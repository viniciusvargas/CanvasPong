//Pong Javascript engine created by Vinicius Vargas
			

			var canvas = document.getElementById('pongtable')
			var context = canvas.getContext('2d')
			
			//global variables
			var player1_y=250-50
			var player2_y=250-50

			var ball_y = 300
			var ball_x = 500

			var ball_direction_y = 5;
			var ball_direction_x = 5;

			var bar_width = 30;
			var bar_heigth = 200;

			var player1_points = 0;
			var player2_points = 0;

			var critical_area = 35;
			var ball_radius = 10;

			var ballMoving = false;
			var ballSpeed = 10;

			
			

			window.requestAnimFrame = (function(callback) {
	       		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	       				function(callback) {
	         				window.setTimeout(callback, 1000 / 60)
	         		}
	         	})()

			function animate() {
				if (ballMoving == false) {
					ball_y = 300
					ball_x = 500

					ball_direction_y = 5;
					ball_direction_x = 5;
				}

				context.clearRect(0,0,canvas.width, canvas.height)
				//left bar
				context.beginPath()
				//rect(x, y, width, height)
				context.rect(10,player1_y,bar_width,bar_heigth)
				context.fillStyle='white'
				context.fill()

				context.rect(10+bar_width,0,1,600);
				context.rect(985,0,1,600);

				//right bar			
				//rect(x, y, width, height)
				context.rect(985,player2_y,bar_width,bar_heigth)
				context.fillStyle='white'
				context.fill()

				context.arc(ball_x,ball_y,ball_radius, 0, Math.PI * 2, true)
				context.fillStyle='white'
				context.fill()

				

				requestAnimationFrame(function() {
					animate()
				})


			}

			function ballMovement() {
				if (ballMoving == true) {
						//move the ball
					ball_y += ball_direction_y;
					ball_x += ball_direction_x;

					//verify if the ball hit the wall
					if(ball_y < 5 || ball_y > 570) {
						ball_direction_y = ball_direction_y * -1
					}

					//verify if the ball reached the player 1's critical area
					if(ball_x - ball_radius - 5 < critical_area) {
						if (ball_y + ball_radius < player1_y || ball_y - ball_radius > player1_y + bar_heigth) {
							addP2Point();
							ballMoving = false;
						}
						else {
							ball_direction_x = ball_direction_x * -1;
						}
					}
					//verify if the ball reached the player 2's critical area
					else if(ball_x + ball_radius + 5 > 1024 - critical_area) {
						if (ball_y + ball_radius < player2_y || ball_y - ball_radius > player2_y + bar_heigth) {
							addP1Point();
							ballMoving = false;
						}
						else {
							ball_direction_x = ball_direction_x * -1;
						}
					}
				}

				
				

			}

			document.onkeydown = function(e) {
					//player 1 keys
					if(e.keyCode == 87) {
						if (player1_y < 10)
							player1_y = player1_y
						else 
							player1_y -= 5
						

					} else if (e.keyCode == 83) {
						if (player1_y >= 390)
							player1_y = player1_y
						else
							player1_y += 5
					}

					//player 2 keys
					if(e.keyCode == 38){
						if (player2_y < 10)
							player2_y = player2_y
						else 
							player2_y -= 5
					}
					else if(e.keyCode == 40) {
						if (player2_y >= 390)
							player2_y = player2_y
						else
							player2_y += 5
				}

				if (ballMoving == false && e.keyCode == 13) {
					ballMoving = true;
				}
			}

			function addP1Point() {
				player1_points++;
				document.getElementById('p1points').innerHTML = player1_points;
			}

			function addP2Point() {
				player2_points++;
				document.getElementById('p2points').innerHTML = player2_points;
			}
			
			window.setInterval(ballMovement, ballSpeed);	
			animate();
