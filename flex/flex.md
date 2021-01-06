
#flex 布局 弹性盒子模型  弹性布局

特点:可以方便，快捷，灵活调整布局
     父级声明为弹性布局后，直接子级的 float 属性失效
常用属性
```css
    排列方式:
     flex-direction: (row 水平)  (column 水平)  (row-reverse 水平反向)  (column-reverse 垂直反向)  

    是否换行
    flex-wrap:(nowrap 不换行 / 默认) (wrap 换行 )

    水平对齐方式
    justify-content:(flex-start 靠左) (flex-end 靠右) (center 中间) (space-around 平均分,两端留白) (space-between 平均分,两端不留白)

    垂直对齐方式
    align-items:(flex-start 靠左) (flex-end 靠右) (center 中间) 

    单个元素对齐方式,加在子级元素上
    align-self:(flex-start 靠左) (flex-end 靠右) (center 中间) 
    
    多行文本的垂直对齐方式，必须和wrap 一块使用
    align-content:(flex-start 靠左) (flex-end 靠右) (center 中间) (space-around 平均分,两端留白) (space-between 平均分,两端不留白)
```