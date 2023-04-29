// this one ignores retweets and has some basic improvements
// IMPORTANT IMPORTANT IMPORTANT - SET YOUR TWITTER HANDLE IN THE NEXT LINE!
// IMPORTANT IMPORTANT IMPORTANT - SET YOUR TWITTER HANDLE IN THE NEXT LINE!
const yourTwitterHandle = "@yourhandle";
// one every 10 seconds to avoid Twitter noticing
const waitTimeSeconds = 10
const sleep = async (seconds) => new Promise(resolve => setTimeout(resolve, seconds * 1000));
const main = async () => {
    while (true) {
        await walkTweets();
        await sleep(waitTimeSeconds)
    }
}
const walkTweets = async () => {
    let articles = document.getElementsByTagName('article');
    for (article of articles) {
        const spanElements = article.querySelectorAll('span');
        for (spanElement of spanElements) {
            // delete if it is a retweet
            if (spanElement.textContent === "You Retweeted") {
                article.scrollIntoView();
                try {
                    const retweetElement = article.querySelector('[data-testid="unretweet"]');
                    if (retweetElement) {
                        retweetElement.click();
                        document.querySelector('[data-testid="unretweetConfirm"]').click();
                    }
                } catch (e) {}
                return
            }

            if (spanElement.textContent === yourTwitterHandle) {
                // in this case it might be a tweet or a reply
                article.scrollIntoView();
                try {
                    // try to delete a reply
                    const tweetReplyElement = article.querySelectorAll('[aria-label="More"]')[1];
                    if (tweetReplyElement) {
                        tweetReplyElement.click()
                        Array.from(document.getElementsByTagName('*')).find(el => el.textContent.trim() === 'Delete').click()
                        document.querySelector('[data-testid="confirmationSheetConfirm"]').click();
                        return
                    }
                } catch (e) {}

                try {
                    // try to delete a tweet
                    const tweetElement = article.querySelector('[aria-label="More"]');
                    if (tweetElement) {
                        article.scrollIntoView();
                        tweetElement.click()
                        Array.from(document.getElementsByTagName('*')).find(el => el.textContent.trim() === 'Delete').click()
                        document.querySelector('[data-testid="confirmationSheetConfirm"]').click();
                        return
                    }
                } catch (e) {}
            }
        }
    }
}
main()
