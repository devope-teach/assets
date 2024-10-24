window.addEventListener('load', () => {
    let $h1 = document.getElementsByTagName('h1')[0];
    h1Text = $h1.innerText

    /* Set emoji as a favicon */
    let regexpEmoji = /\p{Emoji}+/u;
    let emoji = h1Text.match(regexpEmoji)[0];
    let $link = document.createElement('link');
    $link.setAttribute('rel', 'icon');
    $link.setAttribute('href', 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>' + emoji + '</text></svg>');

    document.head.appendChild($link);

    /* Set title */
    let $title = document.createElement('title');
    h1Text = h1Text.replace(regexpEmoji, "").trimStart();
    $title.innerText = h1Text;
    document.head.appendChild($title);
});


class LogMirror {
    constructor(targetSelector) {
        this.$target = document.querySelector(targetSelector);

        this.original = console.log;
        this.init();
    }

    init() {
        const that = this;
        console.log = function (message) {
            that.original(message);
            that.print(message);
        };
    }

    print(message) {
        this.$target.innerText += message + '\n';
    }
}

const $log = document.createElement('div');
$log.id = 'log';
document.body.append($log);
new LogMirror('#log');