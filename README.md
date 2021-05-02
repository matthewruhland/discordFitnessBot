
# Fitness Coach Bot for Discord
Why did I make this?  

To get myself motivated by a robot telling me to eat better.  

## Note
This app will currently only work with fitbit food logs.  

More updates may come in the future for other food logging apps.  

## How to Run
```npm  start```
### Find Discord Channel ID and Token
You can find the channelId and token of your discord channel in the web interface.  

node <fileNameOfChoice>
eg. ```node bot.js```  

bot.js is the file for running that listens for incoming messages and decides what to do with them.  
dailyMessage.js is the file for sending out the prompt for the food log. I separated these so the bot.js isn't constantly  checking the time to see if we should send the message.  
testingNode.js allows for testing of local *.jpg files.  

## Running on Raspberry Pi, or anywhere that can run node.js
Install node.js and npm  
Install Tesseract on Raspberry Pi  

## Running on Windows 10
Install node.js and npm  

### Daily Messages script
Add this file to run the same time every day ( dailyMessage.js ).  
To do this:  
```crontab -e`  
Add Line at the end of file:  
```0 19 * * * node /home/pi/workspace/discordWork/nodeJSWork/dailyMessage.js```  
This line is in the format {minute}{hour}{day of the month}{months of the year}{day of the week}{command}  
This task is run every day at the 19th hour of the day (7pm)  

### Bot script
We want the bot script to always be running, so we should startup on reboot  
```crontab -e`  
Add Line at the end of file:  
```@reboot node /home/pi/workspace/discordWork/nodeJSWork/bot.js &```  

Sources shamelessly used ( with creative modification ):  
https://ourcodeworld.com/articles/read/580/  how-to-convert-images-to-text-with-pure-javascript-using-tesseract-js  
https://medium.com/quantrium-tech/  installing-and-using-tesseract-4-on-windows-10-4f7930313f82  
https://www.raspberrypi.org/documentation/linux/usage/cron.md  