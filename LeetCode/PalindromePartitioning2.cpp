class Solution {
public:
    int minCut(string s) {
        // <--------------------------------------------------->
        //      WATXHC THIS VIDEO IF GET STUCK
        // https://www.youtube.com/watch?v=WPr1jDh3bUQ&ab_channel=ArunGoelArunGoel
        // <---------------------------------------------------->

        int n = s.size() ;
        vector < vector<bool>> dp(n, vector<bool>(n, false)) ;
        vector < int > cut(n + 1) ;

        for(int i = 0; i < n; ++i) dp[i][i] = 1, cut[i] = i ;

        for(int i = 1; i < n; ++i){
            for(int j = i; j >= 0; --j){
                if (s[i] == s[j] &&(i - j < 2 || dp[i - 1][j + 1])){
                    if (!j) cut[i] = 0 ;
                    else {
                        dp[i][j] = true ;
                        cut[i] = min(cut[i], cut[j - 1] + 1) ;
                    }
                }
            }
        }
        for(auto  x : dp){
            for(auto c : x) cout << c << " " ;
            cout << "\n" ;
            
        }
        return cut[n - 1] ;
    }
};
