document.addEventListener('DOMContentLoaded', function() {
    // 初始化代码高亮
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll().then(() => {
            document.querySelectorAll('.code-block').forEach(block => {
                const codeEl = block.querySelector('code');
                const langClass = Array.from(codeEl.classList).find(c => c.startsWith('language-'));
                if (langClass) {
                    const langName = langClass.replace('language-', '').toUpperCase();
                    const langLabel = document.createElement('span');
                    langLabel.className = 'lang-name';
                    langLabel.textContent = langName;
                    block.appendChild(langLabel);
                }
            });
        });
    }

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
