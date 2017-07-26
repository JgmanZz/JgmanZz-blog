/**
 * Created by user on 2017/7/21.
 */
var log = console.log.bind(console);

function hasClass(elements, cName) {
    return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)")); // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断
}

function removeClass(elements, cName) {
    if (hasClass(elements, cName)) {
        elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " "); // replace方法是替换
    }
}

var Game = function () {

};

// 在没有数字的块上生成一个新的数字，随机为 2 或 4
Game.prototype.newBlock = function () {
    var blocks = document.getElementsByClassName("unNumberd");
    var blockNum = Math.round(Math.random() * (blocks.length - 1));
    var score =(Math.round(Math.random()) + 1)* 2;
    var newDiv = document.createElement('div');
    if (score == 2) {
        newDiv.setAttribute('class', 'numBlock born block2');
        newDiv.innerText = '2';
    } else {
        newDiv.setAttribute('class', 'numBlock born block4');
        newDiv.innerText = '4';
    }
    blocks[blockNum].appendChild(newDiv);
    removeClass(blocks[blockNum], "unNumberd");
};

// 比较前后两个块的内容，如果两者相等则相加合并，不等则不变，后者为空则将前者内容移到后者
Game.prototype.changeBlock = function (block, blockBefore) {
    var blc = block[0];
    var blcb = blockBefore[0];
    if (blc.children[0]) {
        blc.children[0].style.position = 'absolute';
        var newDiv = document.createElement('div');
        if (blcb.children[0]) {
            if (block[0].textContent == blcb.textContent && !hasClass(blcb, "added") &&　!hasClass(blc, "added")) {
                blcb.children[0].style.position = 'absolute';
                blc.children[0].style.top = blcb.children[0].style.top;
                blc.children[0].style.left = blcb.children[0].style.left;
                removeClass(blcb, "unNumberd");
                blcb.children[0].textContent = Number(blcb.children[0].textContent) * 2;
                if (hasClass(blcb.children[0], 'scale')) {
                    removeClass(blcb.children[0], 'scale');
                }
                blcb.children[0].setAttribute('class', 'scale numBlock block' + blcb.children[0].textContent);
                blc.innerHTML = '';
                blc.className += (' ' + 'unNumberd');
                blcb.className += (' ' + 'added');
                Game.blockMove = true;
            }
        } else {
            blc.children[0].style.top = blcb.style.top;
            blc.children[0].style.left = blcb.style.left;
            removeClass(blcb, "unNumberd");
            blcb.appendChild(newDiv);
            blcb.children[0].textContent = Number(blc.textContent);
            blcb.children[0].setAttribute('class', 'numBlock block' + blcb.children[0].textContent);
            blc.innerHTML = '';
            blc.className += (' ' + 'unNumberd');
            Game.blockMove = true;
        }
    }
};
//
// Game.prototype.removeClass = function (element, className) {
//     element.addEventListener("animationend", function() {
//     element.classList.remove(className);
//     }, false);
// };

Game.blockMove = false;
var g = new Game();
g.newBlock();
g.newBlock();

var box = document.getElementById('div-2048');
document.onkeydown = function (e) {
    var i = 0, j = 0, k = 0;
    var block = {};
    var blockBefore = {};
    var blocks = document.getElementsByClassName("base-block");
    switch (e.keyCode) {
        // 方向键下
        case 40:
            for (j = 1; j < 5; j++) {
                for (i = 3; i > 0; i--) {
                    for (k = i; k < 4; k++) {
                        block = document.getElementsByClassName('row' + k + 'col' + j);
                        blockBefore = document.getElementsByClassName('row' + (k + 1) + 'col' + j);
                        Game.prototype.changeBlock(block, blockBefore);
                    }
                }
            }
            break;
        // 方向键右
        case 39:
            for (j = 1; j < 5; j++) {
                for (i = 3; i > 0; i--) {
                    for (k = i; k < 4; k++) {
                        block = document.getElementsByClassName('row' + j + 'col' + k);
                        blockBefore = document.getElementsByClassName('row' + j + 'col' + (k + 1));
                        Game.prototype.changeBlock(block, blockBefore);
                    }
                }
            }
            break;
        // 方向键上
        case 38:
            for (j = 1; j < 5; j++) {
                for (i = 2; i < 5; i++) {
                    for (k = i; k > 1; k--) {
                        block = document.getElementsByClassName('row' + k + 'col' + j);
                        blockBefore = document.getElementsByClassName('row' + (k - 1) + 'col' + j);
                        Game.prototype.changeBlock(block, blockBefore);
                    }
                }
            }
            break;
        // 方向键左
        case 37:
            for (j = 1; j < 5; j++) {
                for (i = 2; i < 5; i++) {
                    for (k = i; k > 1; k--) {
                        block = document.getElementsByClassName('row' + j + 'col' + k);
                        blockBefore = document.getElementsByClassName('row' + j + 'col' + (k - 1));
                        Game.prototype.changeBlock(block, blockBefore);
                    }
                }
            }
            break;
    }
    if (Game.blockMove) {
        g.newBlock();
        Game.blockMove = false;
    }
    for (var b = 0; b < blocks.length; b++) {
        removeClass(blocks[b], "added");
        // if (blocks[b].children[0]) {
        //     removeClass(blocks[b].children[0], "scale");
        // }
    }
    // var numberd = document.getElementsByClassName('numBlock');
    // Game.prototype.removeClass(numberd, "scale");
};
