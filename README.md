# WebGame-GpuOverheatingSimulator-
Run with "py manage.py runserver"

Gpu Overheating Simulator is my submission for the final project of my CS50 Web course
My primary goal in this project was to create a seamless game which saved all user progress on a database.
When opening up the page, we are presented with a simple login page. If the user wishes to register, the register button can be pressed leading to the next page.
![Screenshot 2023-03-08 180643](https://user-images.githubusercontent.com/56690175/223767505-62cff6fa-a25d-40d7-8ad8-51c0e77a5341.png)
Next up is the registration page.
![Screenshot 2023-03-08 180759](https://user-images.githubusercontent.com/56690175/223767898-470b3a9f-6e57-4335-a775-8c63c01a7d38.png)

Moving further, after registering or logging in, we are faced with the main menu 
![Screenshot 2023-03-08 180836](https://user-images.githubusercontent.com/56690175/223768030-ce859a20-0e24-46ed-a83b-b2daa826ff3a.png)

The completed parts of this project are the play area, and the statistics area. Moving on to the play area we see the main part of the game.
![Screenshot 2023-03-08 180909](https://user-images.githubusercontent.com/56690175/223768244-be93cc28-7538-4405-855d-d3bc9160b280.png)
This is the place where the user will spend most of the time. Present we have purchase options for GPUs on the left at varying price points, the manual clicker in the middle, and some quick stats up top. There is also a save progress button at the top left, which when pressed saves every bit of progress of the user into the database so next time the user visits, their progress will bre automatically refreshed and loaded. 
![Screenshot 2023-03-08 181144](https://user-images.githubusercontent.com/56690175/223768708-58eb086e-b208-4c52-8d10-5461a7da7090.png)

Lastly we move to the statistics screen where we can see more detailed statistics that are also saved. Movement between all these panels in the game interface does not refresh the page at all, and the money counter keeps ticking even when not on the play page. Everything is continuosly run as long as the website is running. 
![Screenshot 2023-03-08 181228](https://user-images.githubusercontent.com/56690175/223770252-6eabd500-1265-47a6-bbcc-b0f07dfc4ccf.png)
