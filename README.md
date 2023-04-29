# Twitter-Deleter-JS

Twitter is trash and even if you want to deactivate your account, they dont delete your tweets! 
This script provides a way to delete all of your posts WITHOUT the expensive API. Its purely Javascript run in the console.
Or maybe you want to delete your tweets to clean up your timeline or have slightly better opsec... Whatever the reason heres
what to do:
---

- Log into to twitter and go to your profile.
- open the console (F12 on Firefox)
- a panel should open showing HTML, click on "Console" on the top row (3rd from the right next to the arrow icon and "inspector") 
- Then type "allow pasting" into the console and hit "Enter"
- Copy this script below
- Paste this script into the Console and hit "Enter"
- Sit back and have a nice cup of coffee while all your shitposts dissapate into the netherworld :)
```
var delTweets = function () {
var tweetsRemaining = 
document.querySelectorAll('[role="heading"]+div')[1].textContent;
console.log('Remaining: ', tweetsRemaining);
window.scrollBy(0, 10000);
document.querySelectorAll('[aria-label="More"]').forEach(function 
(v, i, a) {
    v.click();
    document.querySelectorAll('span').forEach(function (v2, i2, a2) {
        if (v2.textContent === 'Delete') {
            v2.click();
            document.querySelectorAll('[data-testid="confirmationSheetConfirm"]').forEach(function (v3, i3, a3) {
                v3.click();
            });
        }
        else {
            document.body.click();
        }
    });
});
setTimeout(delTweets, 4000); //less than 4000 might be rate limited or account suspended. increase timeout if any suspend or rate limit happens
}
delTweets();
```
At this point you should just be able to let it run, its supposed to handle everything for you, like scrolling and auto-deleting.
If you need to, just re-paste the script in and start it again (you most likely wont) 
