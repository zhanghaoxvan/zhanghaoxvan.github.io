# endl那些不为人知的故事

我一直是用 `Visual Studio 2022` 编辑C/C++代码。众所周知，VS的函数会标上黄色。

有一天，我输入那熟悉的 `cout << endl;` 时，发现那不被注意的 `endl` 标上了黄色。

于是，我点进去了 `ostream` ……

`endl` 源码如下（占据 `ostream` 的1009 ~ 1015行）：

```C++
_EXPORT_STD template <class _Elem, class _Traits>
basic_ostream<_Elem, _Traits>& __CLRCALL_OR_CDECL endl(
    basic_ostream<_Elem, _Traits>& _Ostr) { // insert newline and flush stream
    _Ostr.put(_Ostr.widen('\n'));
    _Ostr.flush();
    return _Ostr;
}
```

我们可以发现， `endl` 是一个函数，传进了一个 `ostream&` 类型的参数，为了连续，返回了一个 `ostream&` 的值。

所以，以下代码是合法的：

```C++
endl(cout);
```

相当于：

```C++
cout << endl;       
```

我们是不是也可以制作一个？答案是肯定的。以下是我自己写的 `space` 函数，用来输出一个空格：

```C++
ostream& space(ostream& os) {
    os.put(' ');
    return os;
}      
```

那么，以下代码是合法的：

```C++
#include <iostream>
using namespace std;
ostream& space(ostream& os) {
    os.put(' ');
    return os;
}
int main() {
    cout << "This is a Space:" << space << ":ecapS a si sihT";
    return 0;
}     
```

它输出了以下结果：

```
This is a Space: :ecapS a si sihT
D:\Visual Studio 2022\Homework\x64\Debug\Homework.exe (进程 16848)已退出，代码为 0。
按任意键关闭此窗口. . . 
```