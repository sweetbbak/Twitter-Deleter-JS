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
