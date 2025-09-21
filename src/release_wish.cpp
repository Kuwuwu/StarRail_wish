#define _CRT_SECURE_NO_WARNINGS

#if 1
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include<stdbool.h>
#include<iostream>

using namespace std;

//铁道专用，达成对应抽数退出
size_t SR_Logic_avatar(size_t num, size_t mat = 0, bool guarantee_flag = 0) //(需要的限定角色数量，垫的抽数)返回花费抽数
{
    size_t special = 0;            // 限定金
    size_t ordinary = 0;           // 常驻金
    size_t probability_number = 6; // 概率数
    size_t flag = mat;//抽卡标记
    if (flag >= 74)
    {
        probability_number += (flag - 73) * 60;
    }

    size_t count = mat;
    while (special < num)//进入抽卡逻辑
    {
        count++;
        flag++;

        size_t j = rand() % 1000 + 1;
        if (flag >= 74)
        {
            probability_number += 60;
        }
        if (j <= probability_number)
        {
            //判断是否大保底
            if (guarantee_flag == 1)
            {
                special++;
                flag = 0;
                guarantee_flag = 0;
                probability_number = 6;

                if (special == num)
                {
                    return count;
                }

                continue;
            }

            if ((rand() % 1000) <= 557)
            {
                special++;
                flag = 0;
                guarantee_flag = 0;
                probability_number = 6;

                if (special == num)
                {
                    return count;
                }

                continue;
            }
            else
            {
                ordinary++;
                flag = 0;
                guarantee_flag++;
                probability_number = 6;

                continue;
            }
        }
    }

    return count;
}
size_t SR_Logic_light(size_t num, size_t mat = 0, bool guarantee_flag = 0)//(需要的限定光锥数量，垫的抽数),返回实际花费
{
    size_t special = 0;            // 限定金
    size_t ordinary = 0;           // 常驻金
    size_t probability_number = 9; // 概率数
    size_t flag = mat;//抽卡标记   
    if (flag >= 66)
    {
        probability_number += (flag - 66) * 70;
    }

    size_t count = mat;
    while (special < num)//进入抽卡逻辑
    {
        count++;
        flag++;

        size_t j = rand() % 1000 + 1;
        if (flag >= 66)
        {
            probability_number += 70;
        }
        if (j < probability_number)
        {
            //判断是否大保底
            if (guarantee_flag == 1)
            {
                special++;
                flag = 0;
                guarantee_flag = 0;
                probability_number = 9;

                if (special == num)
                {
                    return count;
                }

                continue;
            }

            if ((rand() % 1000) < 786)
            {
                special++;
                flag = 0;
                guarantee_flag = 0;
                probability_number = 9;

                if (special == num)
                {
                    return count;
                }

                continue;
            }
            else
            {
                ordinary++;
                flag = 0;
                guarantee_flag++;
                probability_number = 7;

                continue;
            }
        }
    }

    return count;
}
void test_avatar()
{
    double count = 0;
    for (int i = 0; i < 100'0000; i++)
    {
        count += SR_Logic_avatar(1);
    }
    count /= 100'0000;

    printf("%lf\n", count);
}
void test_light()
{
    double count = 0;
    for (int i = 0; i < 100'0000; i++)
    {
        count += SR_Logic_light(1);
    }
    count /= 100'0000;

    printf("%lf\n", count);
}

double* p = nullptr;
void test_mix(size_t avatar = 3, size_t light = 1, size_t mat_a = 0, size_t mat_l = 0, size_t circle = 10'0000, 
    bool guarantee_flag_a = false,bool guarantee_flag_l = false)
{
    p = new double[10000]();

    size_t count = 0;
    for (int i = 0; i < circle; i++)
    {
        count += SR_Logic_avatar(avatar,mat_a);
        count += SR_Logic_light(light,mat_l);

        p[count / 10]++;

        count = 0;
    }

    double tmp = 0;

    int max = avatar * 180 + light * 160;
    max /= 10;
    for (int i = 0; i < max; i++)
    {
        if (tmp + p[i] / circle == 0)
        {
            continue;
        }
        else if (tmp >= 100)
        {
            break;
        }
        printf("<%d: %lf%%\n", i * 10 + 10, tmp += p[i] / circle * 100);
    }
}

/*
主要看test_mix，另外两个是测试抽卡期望的
void test_mix(size_t avatar = 3, size_t light = 1, size_t mat_a = 0, size_t mat_l = 0, size_t circle = 10'0000)
             
现在这个参数是抽3个限定金，一个专光，角色池垫了0抽，专光池垫了0抽,重复10w次，
然后输出抽数对应的占比

举个例子

<60: 0.009300%
<70: 0.019500%
<80: 0.031000%
<90: 0.052600%
<100: 0.094700%
<110: 0.163000%
<120: 0.266800%
<130: 0.420000%
<140: 0.615200%
<150: 0.877900%
<160: 1.250800%
<170: 1.802900%
<180: 2.563200%
<190: 3.520900%
<200: 4.685000%
<210: 6.065900%
<220: 7.629600%
<230: 9.649000%
<240: 12.328500%
<250: 15.424400%
<260: 18.692500%
<270: 22.179400%
<280: 25.788000%
<290: 29.543000%
<300: 33.925800%
......
这里是指在[0,300)这个区间内，抽到3角色1专光的占比为33.925800%

当然，这个模拟只能大概去接近数据而已
*/

int main()
{
    srand(time(NULL));

    //test_avatar();
    //test_light();

    size_t avatar = 3, light = 1, mat_a = 0, mat_l = 0, circle = 10'0000;
    bool guarantee_flag_a = false, guarantee_flag_l = false;

    printf("需要角色数量：");
    cin >> avatar;
    printf("需要专光数量：");
    cin >> light;
    printf("角色池垫了多少抽：");
    cin >> mat_a;
    printf("角色池大保底?(是1/否0)：");
    cin >> guarantee_flag_a;
    printf("专光池垫了多少抽：");
    cin >> mat_l;
    printf("光锥池大保底?(是1/否0)：");
    cin >> guarantee_flag_l;
    printf("重复次数（填0为默认10w次）：");
    cin >> circle;
    if (circle == 0)
    {
        circle = 10'0000;
    }

    test_mix(avatar, light, mat_a, mat_l, circle, guarantee_flag_a, guarantee_flag_l);

    delete[]p;

    return 0;
}
#endif
