function getRandInt (max) {
    return Math.floor(Math.random() * max); 
}

function mathOp (operation) {
    let nums; 
    let num1 = 2; 
    let num2 = 3; 
    switch (operation) {
        case '+':
            nums = [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
                33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 
                48, 49, 50]
            num1 = nums[getRandInt(49)];
            num2 = nums[getRandInt(49)];
            return `${num1} + ${num2}`; 
        case '-': 
            while (num1 < num2) {
                nums = [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                    18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
                    33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 
                    48, 49, 50] 
                num1 = nums[getRandInt(49)]; 
                num2 = nums[getRandInt(49)]; 
            }
            return `${num1} - ${num2}`; 
        case '/': 
            while (num1 % num2 !== 0) {
                let nums = [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                            18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
                            33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 
                            48, 49, 50]
                num1 = nums[getRandInt(49)];
                num2 = nums[getRandInt(49)];
            } 
            return `${num1} / ${num2}`; 
        case '*': 
            nums = [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12];  
            num1 = nums[getRandInt(12)];
            num2 = nums[getRandInt(12)];
            return `${num1} * ${num2}`; 
    }
};

function mathProblems () {
    const ops = ['+', '-', '/', '*']; 
    let qArr = []; 
    for (let i = 0; i < 10; i++) {
        //establish operation to be used at random
        const op = ops[getRandInt(4)];
        qArr.push(mathOp(op)) 
    }
    return qArr; 
}

export default mathProblems; 