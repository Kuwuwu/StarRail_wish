// 严格遵循命名规范和代码规范
document.addEventListener('DOMContentLoaded', function() {
    const numberDisplay = document.getElementById('number');
    const generateBtn = document.getElementById('generateBtn');
    
    // 生成0-100的随机整数
    function generateRandomNumber() {
        return Math.floor(Math.random() * 101); // 0-100 (包含100)
    }
    
    // 更新显示
    function updateDisplay() {
        numberDisplay.textContent = generateRandomNumber();
    }
    
    // 设置按钮点击事件
    generateBtn.addEventListener('click', updateDisplay);
    
    // 初始显示
    updateDisplay();
});
