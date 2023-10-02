#include <vector>
#include <list>
#include <map>
#include <set>
#include <queue>
#include <deque>
#include <stack>
#include <bitset>
#include <algorithm>
#include <functional>
#include <numeric>
#include <utility>
#include <sstream>
#include <iostream>
#include <iomanip>
#include <cstdio>
#include <cmath>
#include <cstdlib>
#include <ctime>
using namespace std;
int a[100005];
int dp[100005];
int n;
int bs(int x)
{
    int l=1,r=n,ret=r;
    while(l<=r)
    {
        int mid=(l+r)/2;
        if(a[mid]>=x)
        {
            ret=mid;
            r=mid-1;
        }
        else
            l=mid+1;
    }
    return ret;
}
int main()
{
    cin>>n;
    for(int i=1;i<=n;i++)
        cin>>a[i];
    for(int i=1;i<=n;i++)
    {
        dp[i]=20+dp[i-1];
        dp[i]=min(dp[i],dp[bs(a[i]-90+1)-1]+50);
        dp[i]=min(dp[i],dp[bs(a[i]-1440+1)-1]+120);
        cout<<dp[i]-dp[i-1]<<endl;
    }
}
