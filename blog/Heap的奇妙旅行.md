# Heap的奇妙旅行

注：本篇干货含量超标，请小心观看

当我一如既往地乱翻C++ `<queue>` 的时候，发现了一个类： `priority_queue` ，也就是堆。

下面是他的使用方式：

定义（默认是大根堆，小根堆可以在 `type` 后写 `vector<type>, greater<type>()` ）： `priority_queue<type> [变量列表]`

我们定义了一个叫q的整形链表： `priority_queue<int> q;`

插入val到堆中： `q.push(value)`

弹出堆顶： `q.pop()`

返回堆顶： `q.top()`

返回堆里有几个元素： `q.size()`

返回堆是否为空，等价于 `q.size() == 0` ： `q.empty()`

老规矩，上代码（由于默认是大根堆，所以输出时时从大到小排序）：

```C++
#include <iostream>
#include <queue>
using namespace std;
int main() {
    priority_queue<int> q;
    int n;
    cout << "输入数据个数：";
    cin >> n;
    cout << "输入数据：";
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        q.push(x);
    }
    for (int i = 0; i < n; i++) {
        cout << q.top() << " ";
        q.pop();
    }
    return 0;
}
```

输出结果：

```
输入数据个数：10
输入数据：1 5 6 8 7 9 2 4 10 3
10 9 8 7 6 5 4 3 2 1
D:\Visual Studio 2022\C++\x64\Debug\C++.exe (进程 17048)已退出，代码为 0。
按任意键关闭此窗口. . .      
```