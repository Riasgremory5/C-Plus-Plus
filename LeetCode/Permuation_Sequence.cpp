class Solution {
public:
    string getPermutation(int n, int k) {
        int fact = 1;
        set<int> st ;
        string ans ;
        for(int i = 1 ;i <= n; ++i) fact *= i, st.insert(i) ;
        --k ;
        for(int i = n; i; --i){
            fact /= i ;
            int res = k / fact ;
            k %= fact ;
            int x = *next(st.begin(), res) ;
            st.erase(x) ;
            ans += to_string(x) ;
            
        }
        return ans ;
    }
};
