# 关于Hash的那些事

`Hash` 是一个很特殊的东西。

他有以下几点：

- 不同数据生成的 `Hash` 是一样长的
- 即使是数据之间的差距十分微小，生成的 `Hash` 也会完全不同
- 即使是数据完全不同，生成的 `Hash` 值也可能会相同。这叫“ `Hash` 冲突”

C++有没有提供一种工具，用来生成Hash值么？当然有。

`C++ 11` 提供了一种 `std::hash` 类，包含在 `<functional>` 头文件里，用来生成 `Hash` 值。具体可以这么写：

```C++
std::hash<int> h;
std::cout << h(1);        
```

我们可以自己制作一个函数，用来生成Hash值么？当然可以。以下是我写的 `buildhash` 函数，用来生成一个 `Hash` 值：

```C++
#include <iostream>
#include <functional>
using namespace std;
template <class type>
size_t buildhash(type key) {
    hash<type> h;
    return h(key);
}
int main() {
    cout << buildhash(114514);
    return 0;
}
```

在我的电脑上运行结果是：

```
7762462124815608919
D:\Visual Studio 2022\Homework\x64\Debug\Homework.exe (进程 15252)已退出，代码为 0。
按任意键关闭此窗口. . .       
```