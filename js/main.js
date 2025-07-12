document.addEventListener('DOMContentLoaded', function() {
    // 初始化代码高亮
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }

    // 代码块复制功能
    document.querySelectorAll('pre').forEach(pre => {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-code-btn';
        copyBtn.textContent = '复制';
        pre.insertBefore(copyBtn, pre.firstChild);

        if (!pre.hasAttribute('data-language')) {
            const langMatch = pre.className.match(/language-(\w+)/);
            pre.setAttribute('data-language', langMatch ? langMatch[1] : 'text');
        }

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

    // 下载按钮下拉菜单（核心修复：确保事件正确绑定）
    const downloadButton = document.getElementById('downloadButton');
    const platformDropdown = document.getElementById('platformDropdown');

    if (downloadButton && platformDropdown) { // 检查元素是否存在
        downloadButton.addEventListener('click', function(e) {
            e.stopPropagation(); // 防止事件冒泡导致菜单关闭
            platformDropdown.classList.toggle('show');
        });

        // 点击其他区域关闭下拉菜单
        document.addEventListener('click', function(e) {
            if (!downloadButton.contains(e.target) && !platformDropdown.contains(e.target)) {
                platformDropdown.classList.remove('show');
            }
        });

        // 防止下拉菜单内部点击关闭菜单
        platformDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
});
