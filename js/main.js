// JavaScript 版本的抽卡概率模拟
function SR_Logic_avatar(num, mat = 0, guarantee_flag = false) {
    let special = 0;
    let ordinary = 0;
    let probability_number = 6;
    let flag = mat;
    
    if (flag >= 74) {
        probability_number += (flag - 73) * 60;
    }

    let count = mat;
    while (special < num) {
        count++;
        flag++;

        let j = Math.floor(Math.random() * 1000) + 1;
        if (flag >= 74) {
            probability_number += 60;
        }
        if (j <= probability_number) {
            if (guarantee_flag) {
                special++;
                flag = 0;
                guarantee_flag = false;
                probability_number = 6;
                
                if (special === num) return count;
                continue;
            }

            if (Math.random() * 1000 <= 557) {
                special++;
                flag = 0;
                guarantee_flag = false;
                probability_number = 6;
                
                if (special === num) return count;
                continue;
            } else {
                ordinary++;
                flag = 0;
                guarantee_flag = true;
                probability_number = 6;
                continue;
            }
        }
    }
    
    return count;
}

// 在网页上显示结果
function simulate() {
    const num = parseInt(document.getElementById('avatar').value) || 3;
    const mat = parseInt(document.getElementById('mat').value) || 0;
    const guarantee = document.getElementById('guarantee').checked;
    
    const result = SR_Logic_avatar(num, mat, guarantee);
    document.getElementById('result').textContent = `模拟结果: ${result} 抽`;
}
