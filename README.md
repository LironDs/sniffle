
![twitter_header_photo_2](sniffle-client/public/images/twitter_header_photo_2.png)

# Hi there!

My name is Liron David-Shiloah and this is my React+Node.js project.<br>
It was written as part of a full stack course,
In this file I have added guidance and notes that will make it easier for you to explore the application.
## Lets start-

**The site is responsive and suitable for viewing on a computer screen, tablet or phone.**<br>
In order to run this project on VSC , you will need to run those terminal commands-

```
npm install
```
## On sniffle-client
```
npm start
```
## On sniffle-server

```
nodemon
```

**In order for the server to connect to MongoDB Atlas, please insert the .env file you received separately.**


#### The table below gives you 3 types of users with different permissions,<br> you are welcome to try them all. <br> Each user will give you different permission and different menus.

|      Role      |User                             |Password   |
|----------------|---------------------------------|-----------|
|`admin`         |david.liron@gmail.com            |!2345Qwe |
|`business`      |JohnMcClane@DieHard.com          |!2345Qwe |           
|`user`          |Ozzy.Osbourne@BlackSabbath.com   |!2345Qwe |

Follow the numbers in the image 

![Initial screen-Before sign in](<sniffle-client/public/images/Home-not signInYet.png>)

On the initial screen of the site you can see all the tickets on the site.
In the menus above you can do-
1. Registration
2. Login
3. Company logo. Clicking on it will lead to the home screen. (the current screen).
4. About the company.
5. Search bar, currently inactive.
6. An "i" button that will appear on every card and will refer to complete information about the business.

## Register screen-
![Register screen](sniffle-client/public/images/register.png)


The registration screen contains a lot of information about the customer and except for "state", all the information is required.
Pay attention to error messages if they appear because they will guide you on how to enter the information.
At the end of the form, you have the option of being a business customer or a regular customer,
The difference between the two will be shown in the following screens.
Please sign in as a business user so you can see all the available options.

If the registration was successful, you will see a message in the corner of the screen confirming this. 
**There is no need to "login" if you have just finished registering for the site**


First screen after sign-in (business User)
![Business user first screen](sniffle-client/public/images/businessUser.png)

1. after sign-in you will see your name in the navigation bar. If you click it, the screen will change to "update user" screen.
2. As the button says- "logout"
3. "My cards"- will show the cards that the current user created on the site (for business users only).
4. A heart icon - clicking on it will copy the card to the user's favorites list.
5. My favorites - a screen that will contain the cards that the customer transferred to his list of favorites.

![User update](sniffle-client/public/images/updateUser.png)
 In this screen you can modify your data.

## My cards (Bussiness user only)
 ![user cards](sniffle-client/public/images/myCards.png)
 A screen where the business user can see the cards he entered into the system
 
1. Icon of trash can- will delete this card
2. edit this card
3. upload a new card



## My favorites

![My favorites](sniffle-client/public/images/myFav.png)
each user can choose favorite cards and they will show up here.
clicking on the heart button will remove the card from this list.



## CRM (Admin only)
![CRM](sniffle-client/public/images/crm.png)

Only the Admin user can see this link in the navigation bar.
1. Edit user- will take the admin to update user screen
2. delete- will delete the user.



# Thank you for reading! <br>
I hope you enjoyed the tutorial and will leave **constructive comments**! 🙂

 [!IMPORTANT]
> In order to see the site in action without downloading the files, you can enter this link ➡️ [Netlify Sniffle](https://sniffle.netlify.app/).<br/>
> The server takes about 60 seconds to connect, so you can click on the link and reload after about a minute.
