# C++使用Python的输入输出

[TOC]

注意看,这是`Python`的输入输出:

```Python
a = input()
print(a)
```

而这是`C++`的输入输出:

```C++
int a;
cin >> a;
cout << a;
```

我们可以想到: **为什么不能在定义的时候就输入,简单的输出呢**?

(其实`C++ 23`也改变了输出,变成了`print()`函数,像**这么用**:`print("{}{}", "114514", 1919810);`)

于是,我们可以想到这么一个代码框架:

```C++
#pragma once
#ifndef _FORMAT_H_
#define _FORMAT_H_
static_assert(__cplusplus, "This header must be included in C++ file");
#include <iostream>
#include <string>
#include <sstream>
#if __cplusplus >= 201703L
#include <string_view>
#endif
#if __cplusplus >= 202002L
#include <compare>
#endif
namespace std {
    // TODO
}
#endif
```

那么,根据`print()`的第一个参数`fmt_string`,我们可以把类名定义成这样:

```C++
#pragma once
#ifndef _FORMAT_H_
#define _FORMAT_H_
static_assert(__cplusplus, "This header must be included in C++ file");
#include <iostream>
#include <string>
#include <sstream>
#if __cplusplus >= 201703L
#include <string_view>
#endif
#if __cplusplus >= 202002L
#include <compare>
#endif
namespace std {
    class FormatString {
    public:
        
    private:
        
    };
}
#endif
```

我们可以往成员组里添加一个成员:`string s`,用来存储字符串,并加上**亿**个构造函数

```C++
#pragma once
#ifndef _FORMAT_H_
#define _FORMAT_H_
static_assert(__cplusplus, "This header must be included in C++ file");
#include <iostream>
#include <string>
#include <sstream>
#if __cplusplus >= 201703L
#include <string_view>
#endif
#if __cplusplus >= 202002L
#include <compare>
#endif
namespace std {
    class FormatString {
    public:
                FormatString() {}
        FormatString(int right) : s(to_string(right)) {}
#if __cplusplus >= 201703L
        FormatString(string_view right) : s(right) {}
#else
        FormatString(const string& right) : s(right) {}
#endif
        FormatString(double right) : s(to_string(right)) {}
        FormatString(long long right) : s(to_string(right)) {}
        FormatString(char right) : s(1, right) {}
        FormatString(const char* right) : s(right) {}
        FormatString(size_t right) : s(to_string(right)) {}
    private:
        string s;
    };
}
#endif
```

既然都有了这么多构造函数了,为什么不加上**亿**个转换函数呢?

```C++
#pragma once
#ifndef _FORMAT_H_
#define _FORMAT_H_
static_assert(__cplusplus, "This header must be included in C++ file");
#include <iostream>
#include <string>
#include <sstream>
#if __cplusplus >= 201703L
#include <string_view>
#endif
#if __cplusplus >= 202002L
#include <compare>
#endif
namespace std {
    class FormatString {
    public:
                FormatString() {}
        FormatString(int right) : s(to_string(right)) {}
#if __cplusplus >= 201703L
        FormatString(string_view right) : s(right) {}
#else
        FormatString(const string& right) : s(right) {}
#endif
        FormatString(double right) : s(to_string(right)) {}
        FormatString(long long right) : s(to_string(right)) {}
        FormatString(char right) : s(1, right) {}
        FormatString(const char* right) : s(right) {}
        FormatString(size_t right) : s(to_string(right)) {}
        
        operator int() { return stoi(s); }
        operator string() { return s; }
        operator double() { return stod(s); }
        operator long long() { return stoll(s); }
        operator size_t() { return stoull(s); };
    private:
        string s;
    };
}
#endif
```

是个字符串，必须加个比较把：

```C++
#pragma once
#ifndef _FORMAT_H_
#define _FORMAT_H_
static_assert(__cplusplus, "This header must be included in C++ file");
#include <iostream>
#include <string>
#include <sstream>
#if __cplusplus >= 201703L
#include <string_view>
#endif
#if __cplusplus >= 202002L
#include <compare>
#endif
namespace std {
    class FormatString {
    public:
                FormatString() {}
        FormatString(int right) : s(to_string(right)) {}
#if __cplusplus >= 201703L
        FormatString(string_view right) : s(right) {}
#else
        FormatString(const string& right) : s(right) {}
#endif
        FormatString(double right) : s(to_string(right)) {}
        FormatString(long long right) : s(to_string(right)) {}
        FormatString(char right) : s(1, right) {}
        FormatString(const char* right) : s(right) {}
        FormatString(size_t right) : s(to_string(right)) {}
        
        operator int() { return stoi(s); }
        operator string() { return s; }
        operator double() { return stod(s); }
        operator long long() { return stoll(s); }
        operator size_t() { return stoull(s); };
#if __cplusplus >= 202002L
        strong_ordering operator<=>(const FormatString& right) {
            return s <=> right.s;
        }
#else
        bool operator==(const FormatString& right) {
            return s == right.s;
        }
        bool operator<(const FormatString& right) {
            return s < right.s;
        }
        bool operator>(const FormatString& right) {
            return s > right.s;
        }
        bool operator<=(const FormatString& right) {
            return s <= right.s;
        }
        bool operator>=(const FormatString& right) {
            return s >= right.s;
        }
        bool operator!=(const FormatString& right) {
            return s != right.s;
        }
#endif
    private:
        string s;
    };
}
#endif
```

最后加个输出输出，以便后面**套壳**：

```C++
#pragma once
#ifndef _FORMAT_H_
#define _FORMAT_H_
static_assert(__cplusplus, "This header must be included in C++ file");
#include <iostream>
#include <string>
#include <sstream>
#if __cplusplus >= 201703L
#include <string_view>
#endif
#if __cplusplus >= 202002L
#include <compare>
#endif

namespace std {
    class FormatString {
    public:
        FormatString() {}
        FormatString(int right) : s(to_string(right)) {}
#if __cplusplus >= 201703L
        FormatString(string_view right) : s(right) {}
#else
        FormatString(const string& right) : s(right) {}
#endif
        FormatString(double right) : s(to_string(right)) {}
        FormatString(long long right) : s(to_string(right)) {}
        FormatString(char right) : s(1, right) {}
        FormatString(const char* right) : s(right) {}
        FormatString(size_t right) : s(to_string(right)) {}

        operator int() { return stoi(s); }
        operator string() { return s; }
        operator double() { return stod(s); }
        operator long long() { return stoll(s); }
        operator size_t() { return stoull(s); };

#if __cplusplus >= 202002L
        strong_ordering operator<=>(const FormatString& right) {
            return s <=> right.s;
        }
#else
        bool operator==(const FormatString& right) {
            return s == right.s;
        }
        bool operator<(const FormatString& right) {
            return s < right.s;
        }
        bool operator>(const FormatString& right) {
            return s > right.s;
        }
        bool operator<=(const FormatString& right) {
            return s <= right.s;
        }
        bool operator>=(const FormatString& right) {
            return s >= right.s;
        }
        bool operator!=(const FormatString& right) {
            return s != right.s;
        }
#endif

        FormatString operator+(const FormatString& right) {
            return FormatString(s + right.s);
        }
        FormatString operator+(int right) {
            return FormatString(s + to_string(right));
        }
        FormatString operator+(const string& right) {
            return FormatString(s + right);
        }
        FormatString operator+(double right) {
            return FormatString(s + to_string(right));
        }
        FormatString operator+(long long right) {
            return FormatString(s + to_string(right));
        }
        FormatString operator+(char right) {
            return FormatString(s + string(1, right));
        }
        FormatString operator+(const char* right) {
            return FormatString(s + string(right));
        }
        FormatString operator+(size_t right) {
            return FormatString(s + to_string(right));
        }

        friend ostream& operator<<(ostream& os, const FormatString& fs) {
            os << fs.s;
            return os;
        }
        friend istream& operator>>(istream& is, FormatString& fs) {
            is >> fs.s;
            return is;
        }
    private:
        string s;
    };
}
#endif
```


顺便加上字符串转换`""fs`和输入输出（顺便`typedef FormatString fs`一下，方便）

```C++
#pragma once
#ifndef _FORMAT_H_
#define _FORMAT_H_
static_assert(__cplusplus, "This header must be included in C++ file");
#include <iostream>
#include <string>
#include <sstream>
#if __cplusplus >= 201703L
#include <string_view>
#endif
#if __cplusplus >= 202002L
#include <compare>
#endif

namespace std {
    class FormatString {
    public:
        FormatString() {}
        FormatString(int right) : s(to_string(right)) {}
#if __cplusplus >= 201703L
        FormatString(string_view right) : s(right) {}
#else
        FormatString(const string& right) : s(right) {}
#endif
        FormatString(double right) : s(to_string(right)) {}
        FormatString(long long right) : s(to_string(right)) {}
        FormatString(char right) : s(1, right) {}
        FormatString(const char* right) : s(right) {}
        FormatString(size_t right) : s(to_string(right)) {}

        operator int() { return stoi(s); }
        operator string() { return s; }
        operator double() { return stod(s); }
        operator long long() { return stoll(s); }
        operator size_t() { return stoull(s); };

#if __cplusplus >= 202002L
        strong_ordering operator<=>(const FormatString& right) {
            return s <=> right.s;
        }
#else
        bool operator==(const FormatString& right) {
            return s == right.s;
        }
        bool operator<(const FormatString& right) {
            return s < right.s;
        }
        bool operator>(const FormatString& right) {
            return s > right.s;
        }
        bool operator<=(const FormatString& right) {
            return s <= right.s;
        }
        bool operator>=(const FormatString& right) {
            return s >= right.s;
        }
        bool operator!=(const FormatString& right) {
            return s != right.s;
        }
#endif

        FormatString operator+(const FormatString& right) {
            return FormatString(s + right.s);
        }
        FormatString operator+(int right) {
            return FormatString(s + to_string(right));
        }
        FormatString operator+(const string& right) {
            return FormatString(s + right);
        }
        FormatString operator+(double right) {
            return FormatString(s + to_string(right));
        }
        FormatString operator+(long long right) {
            return FormatString(s + to_string(right));
        }
        FormatString operator+(char right) {
            return FormatString(s + string(1, right));
        }
        FormatString operator+(const char* right) {
            return FormatString(s + string(right));
        }
        FormatString operator+(size_t right) {
            return FormatString(s + to_string(right));
        }

        friend ostream& operator<<(ostream& os, const FormatString& fs) {
            os << fs.s;
            return os;
        }
        friend istream& operator>>(istream& is, FormatString& fs) {
            is >> fs.s;
            return is;
        }
    private:
        string s;
    };

    FormatString operator""fs(const char* s, size_t len) {
        return FormatString(string(s, len));
    }

    void print(const FormatString& _format) {
        cout << _format;
    }
    void println(const FormatString& _format) {
        cout << _format << endl;
    }

    FormatString input() {
        FormatString fs;
        cin >> fs;
        return fs;
    }
#if __cplusplus >= 201703L
    FormatString input(string_view s) {
        cout << s;
        return input();
    }
#else
    FormatString input(const string& s) {
        cout << s;
        return input();
    }
#endif
    typedef FormatString fs;
}
#endif
```

**OK!**

## 整体代码（带版权声明）

```C++
// +--------------------------------+
// |          Format.h              |
// | Copyright (c) zhanghaoxvan.    |
// | All rights reserved.           |
// +--------------------------------+
// | Note:                          |
// | If you use the print function  |
// | or the println function and    |
// | the first item is not a        |
// | variable of type FormatString, |
// | add the caster fs() to both    |
// | sides of the first term.       |
// +--------------------------------+
// | Write down your life motto:    |
// |                                |
// |                                |
// |                                |
// |                                |
// |                                |
// |                                |
// |                                |
// |                                |
// +--------------------------------+
#pragma once
#ifndef _FORMAT_H_
#define _FORMAT_H_
static_assert(__cplusplus, "This header must be included in C++ file");
#include <iostream>
#include <string>
#include <sstream>
#if __cplusplus >= 201703L
#include <string_view>
#endif
#if __cplusplus >= 202002L
#include <compare>
#endif

namespace std {
    class FormatString {
    public:
        FormatString() {}
        FormatString(int right) : s(to_string(right)) {}
#if __cplusplus >= 201703L
        FormatString(string_view right) : s(right) {}
#else
        FormatString(const string& right) : s(right) {}
#endif
        FormatString(double right) : s(to_string(right)) {}
        FormatString(long long right) : s(to_string(right)) {}
        FormatString(char right) : s(1, right) {}
        FormatString(const char* right) : s(right) {}
        FormatString(size_t right) : s(to_string(right)) {}

        operator int() { return stoi(s); }
        operator string() { return s; }
        operator double() { return stod(s); }
        operator long long() { return stoll(s); }
        operator size_t() { return stoull(s); };

#if __cplusplus >= 202002L
        strong_ordering operator<=>(const FormatString& right) {
            return s <=> right.s;
        }
#else
        bool operator==(const FormatString& right) {
            return s == right.s;
        }
        bool operator<(const FormatString& right) {
            return s < right.s;
        }
        bool operator>(const FormatString& right) {
            return s > right.s;
        }
        bool operator<=(const FormatString& right) {
            return s <= right.s;
        }
        bool operator>=(const FormatString& right) {
            return s >= right.s;
        }
        bool operator!=(const FormatString& right) {
            return s != right.s;
        }
#endif

        FormatString operator+(const FormatString& right) {
            return FormatString(s + right.s);
        }
        FormatString operator+(int right) {
            return FormatString(s + to_string(right));
        }
        FormatString operator+(const string& right) {
            return FormatString(s + right);
        }
        FormatString operator+(double right) {
            return FormatString(s + to_string(right));
        }
        FormatString operator+(long long right) {
            return FormatString(s + to_string(right));
        }
        FormatString operator+(char right) {
            return FormatString(s + string(1, right));
        }
        FormatString operator+(const char* right) {
            return FormatString(s + string(right));
        }
        FormatString operator+(size_t right) {
            return FormatString(s + to_string(right));
        }

        friend ostream& operator<<(ostream& os, const FormatString& fs) {
            os << fs.s;
            return os;
        }
        friend istream& operator>>(istream& is, FormatString& fs) {
            is >> fs.s;
            return is;
        }
    private:
        string s;
    };

    FormatString operator""fs(const char* s, size_t len) {
        return FormatString(string(s, len));
    }

    void print(const FormatString& _format) {
        cout << _format;
    }
    void println(const FormatString& _format) {
        cout << _format << endl;
    }

    FormatString input() {
        FormatString fs;
        cin >> fs;
        return fs;
    }
#if __cplusplus >= 201703L
    FormatString input(string_view s) {
        cout << s;
        return input();
    }
#else
    FormatString input(const string& s) {
        cout << s;
        return input();
    }
#endif
    typedef FormatString fs;
}
#endif
```

