document.addEventListener('DOMContentLoaded', function() {
    const simulateBtn = document.getElementById('simulateBtn');
    const resultOutput = document.getElementById('resultOutput');
    
    // 角色池抽卡逻辑
    function SR_Logic_avatar(num, mat = 0, guarantee_flag = false) {
        // 如果num为0或负数，直接返回0（不需要抽卡）
        if (num <= 0) return 0;
        
        let special = 0;            // 限定金
        let ordinary = 0;           // 常驻金
        let probability_number = 6; // 概率数
        let flag = mat;             // 抽卡标记
        let count = mat;            // 总抽数
        
        while (special < num) {
            count++;
            flag++;
            
            // 更新概率（74抽后每抽增加60）
            if (flag >= 74) {
                probability_number += 60;
            }
            
            // 生成1-1000的随机数
            const j = Math.floor(Math.random() * 1000) + 1;
            
            if (j <= probability_number) {
                // 大保底逻辑
                if (guarantee_flag) {
                    special++;
                    flag = 0;
                    guarantee_flag = false;
                    probability_number = 6;
                    
                    if (special >= num) {
                        return count;
                    }
                    continue;
                }
                
                // 普通情况：55.7%几率出限定
                if (Math.random() * 1000 <= 557) {
                    special++;
                    flag = 0;
                    guarantee_flag = false;
                    probability_number = 6;
                    
                    if (special >= num) {
                        return count;
                    }
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
    
    // 光锥池抽卡逻辑
    function SR_Logic_light(num, mat = 0, guarantee_flag = false) {
        // 如果num为0或负数，直接返回0（不需要抽卡）
        if (num <= 0) return 0;
        
        let special = 0;            // 限定光锥
        let ordinary = 0;           // 常驻光锥
        let probability_number = 9; // 概率数
        let flag = mat;             // 抽卡标记
        let count = mat;            // 总抽数
        
        while (special < num) {
            count++;
            flag++;
            
            // 更新概率（66抽后每抽增加70）
            if (flag >= 66) {
                probability_number += 70;
            }
            
            // 生成1-1000的随机数
            const j = Math.floor(Math.random() * 1000) + 1;
            
            if (j < probability_number) {
                // 大保底逻辑
                if (guarantee_flag) {
                    special++;
                    flag = 0;
                    guarantee_flag = false;
                    probability_number = 9;
                    
                    if (special >= num) {
                        return count;
                    }
                    continue;
                }
                
                // 普通情况：78.6%几率出限定
                if (Math.random() * 1000 < 786) {
                    special++;
                    flag = 0;
                    guarantee_flag = false;
                    probability_number = 9;
                    
                    if (special >= num) {
                        return count;
                    }
                    continue;
                } else {
                    ordinary++;
                    flag = 0;
                    guarantee_flag = true;
                    probability_number = 7;
                    continue;
                }
            }
        }
        return count;
    }
    
    // 执行模拟
    function simulate() {
        // 获取用户输入
        const avatar = parseInt(document.getElementById('avatar').value);
        const light = parseInt(document.getElementById('light').value);
        const mat_a = parseInt(document.getElementById('mat_a').value);
        const guarantee_flag_a = document.getElementById('guarantee_a').value === 'true';
        const mat_l = parseInt(document.getElementById('mat_l').value);
        const guarantee_flag_l = document.getElementById('guarantee_l').value === 'true';
        const circle = parseInt(document.getElementById('circle').value);
        
        // 验证输入：至少有一个数量>0，且所有数值有效
        if ((avatar <= 0 && light <= 0) || mat_a < 0 || mat_l < 0 || circle <= 0) {
            resultOutput.textContent = "错误: 请输入有效的数字 (至少需要1个角色或光锥，垫抽数≥0)";
            return;
        }
        
        // 显示加载状态
        resultOutput.textContent = "正在模拟... ";
        
        // 执行10万次模拟
        const startTime = performance.now();
        const p = new Array(10000).fill(0);  // 修改：数组长度从1000改为10000
        const max = Math.floor((avatar * 180 + light * 160) / 10);
        
        for (let i = 0; i < circle; i++) {
            const total = SR_Logic_avatar(avatar, mat_a, guarantee_flag_a) + 
                         SR_Logic_light(light, mat_l, guarantee_flag_l);
            
            // 计算分布桶 (每10抽为一组)
            const bucket = Math.floor(total / 10);
            if (bucket < p.length) {
                p[bucket]++;
            }
        }
        
        // 计算并显示结果
        let cumulative = 0;
        let output = "";
        
        for (let i = 0; i < p.length; i++) {  // 修改：遍历整个10000长度的数组
            if (p[i] === 0) continue;
            
            cumulative += (p[i] / circle) * 100;
            output += `<${(i * 10 + 10)}: ${cumulative.toFixed(6)}%\n`;
        }
        
        const endTime = performance.now();
        const duration = (endTime - startTime).toFixed(1);
        
        resultOutput.textContent = output + `\n\n模拟完成 (${circle}次样本) - 耗时: ${duration}ms`;
    }
    
    // 设置按钮事件
    simulateBtn.addEventListener('click', simulate);
    
    // 初始模拟
    simulate();
});
