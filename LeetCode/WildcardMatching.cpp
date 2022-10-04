class Solution {
public:
    bool isMatch(string s, string p) {
        int n = s.size(), m = p.size() ;
        bool dp[n + 1][m + 1] ; 
        memset(dp, false, sizeof(dp)) ;
        dp[0][0] = true;
        int i = 0; 
        while(i < m and p[i] == '*') dp[0][i + 1] = true, ++i ;
        for(int i = 1; i <= n; ++i){
            for(int j = 1; j <= m; ++j){
                if (p[j - 1] == '*'){
                    dp[i][j] = dp[i - 1][j] || dp[i][j - 1];
                }
                else {
                    dp[i][j] = (s[i - 1] == p[j - 1] or p[j - 1] == '?') && dp[i - 1][j - 1] ;
                }
            }
        }
        return dp[n][m];
    }
};
