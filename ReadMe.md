After aproximately two failed attemps, for my third I started off coding along this article/tutorial: https://medium.com/@atingenkay/creating-a-todo-app-with-node-js-express-8fa51f39b16f
It tackles how to crate a Todo App using Node.js and Express. It also uses the template engine EJS, I had not used a template engine before so it was very interesting to figure it out, thankfully the one used is very similar to HTML and the main takeaway for this project was being able to implement a JS logic in between template tags (<% %>), specifically a for loop in my HTML in order to be able to display/render every new task that was being imported/written on the task tracker. Something I didn't know and discovered with this tutorial was the action method available for forms, this helped me not get stuck like it happened in my other attemps because this was the was to connect the actions being made in the client side with my routes and being able to use FS to write onto my JSON.

The next part was connecting my JSON to my API/routes in ordet to be displayed on the client side. I was so glad I had a code talk about FS because it made me understand it a bit more before doing this project. Thanks to the tutorial, I knew how to properly display it, so it was a matter of doing an fsReadFileSync and parsing it in order to display the tasks in the JSON file at the moment of rendering my local host/server. Then, in order to send it back as an object to my json file, I needed to use stringify() before using fsWriteFileSync to add this new task at the end of my array in JSON.

I find it important to mention that I also used body-parser middleware for this project. This was inmense helpful because as I saw it, it worked as document.querySelector does, but targeting the name of my tags. This was very helpful to take the new task inputs and display it and for selecting which task was being edited/rewriten.

For editing, I made my form inputs not have the "readonly" attribute, which allows you to re-write the input at all times. How my apps works is you edit your task however you would like to, and then you click the edit button. Was happens in the backend after is that the task that was edited get pushed as a new task, and the old one gets removes (splice) from the list. It was the only was it made sense to me to go about it, and since it happens so fast you can only tell it's being moved to the bottom and that's it.

Lastly deploying in AWS was tricky too, since this project was the first with backend, I didn't know it was not gonna be as easy as the Ecommerce where you uploaded from github and that was it. Since I created a server/was using local host, in order for it to be "running all the time". I had to use an EC2 instance to be able to host my server there and it be running efficiently. For this part I used this tutorial: https://betterprogramming.pub/deploying-a-basic-express-api-on-amazon-ec2-eea0b54a825 and Isaac's help because he was able to deploy it before me.

Problems I encountered:

- When it came to removing/editing the tasks in the JSON file was very tricky, I knew how to use the :id in the API router but wasn't sure how to pin point exactly the specific task being removed/edited. I ended up using indexOf(find()) in order to select the correct id
- I usually leave styling at the end since if there's not much time left it can get by without much. When it came time to style my edits where not appearing, then I found out about "serving static files", which is a middleware function in EXpress which allowed my css file to work after putting it inside a folder called "public".
- Later on my media queries didn't want to work, this was because since I used EJS and not HTML I dindn't use our usual shift + ! shortcut, which ultimately made me figure out the importance of using "<meta name="viewport" content="width=device-width, initial-scale=1.0" />" in the head section of our code.

Things I would like to implement to this project:
-Being able to remove more than one task at a time, maybe by adding some checkbox option to the task but still maintaining the input type in order to be able to edit.
-Being able to sort them by priority.
