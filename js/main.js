// 代码高亮初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化highlight.js
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }
    
    // 为每个pre元素添加复制按钮和语言标识
    document.querySelectorAll('pre').forEach(pre => {
        // 添加复制按钮
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-code-btn';
        copyBtn.textContent = '复制';
        pre.insertBefore(copyBtn, pre.firstChild);
        
        // 自动检测语言（如果没有设置data-language属性）
        if (!pre.hasAttribute('data-language')) {
            // 从class中提取语言信息（如果有）
            const className = pre.className;
            const langMatch = className.match(/language-(\w+)/);
            if (langMatch) {
                pre.setAttribute('data-language', langMatch[1]);
            } else {
                // 默认设置为text
                pre.setAttribute('data-language', 'text');
            }
        }
        
        // 绑定复制按钮事件
        copyBtn.addEventListener('click', function() {
            const code = this.nextElementSibling.textContent;
            navigator.clipboard.writeText(code).then(() => {
                this.textContent = '已复制';
                this.classList.add('copied');
                setTimeout(() => {
                    this.textContent = '复制';
                    this.classList.remove('copied');
                }, 2000);
            });
        });
    });
    
    // 下载下拉菜单功能
    const downloadButton = document.getElementById('downloadButton');
    const platformDropdown = document.getElementById('platformDropdown');
    
    downloadButton.addEventListener('click', function() {
        platformDropdown.classList.toggle('show');
    });
    
    // 点击其他区域关闭下拉菜单
    window.addEventListener('click', function(event) {
        if (!event.target.matches('.download-btn') && !event.target.closest('.platform-dropdown')) {
            if (platformDropdown.classList.contains('show')) {
                platformDropdown.classList.remove('show');
            }
        }
    });
});
