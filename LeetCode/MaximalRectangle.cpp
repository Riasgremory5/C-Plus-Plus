class Solution {
public:
    int maximalRectangle(vector<vector<char>>& matrix) {
        int n = matrix.size(), m ;
        if(n) m = matrix[0].size() ;
        else return 0 ;
        
        vector<int> heights(m + 1, 0) ;
        stack<int> st ;
        int ans = 0, res = 0 ;
        for(int i = 0; i < n; ++i){
            res = 0 ;
            for(int j = 0; j < m; ++j){
                heights[j] += (matrix[i][j] == '1' ? 1 : -heights[j]) ;
            }
            for(int j = 0; j <= m; ++j){
                while(!st.empty() && heights[j] < heights[st.top()]){
                    int curHeight = heights[st.top()] ;
                    st.pop() ;
                    res = max(res, curHeight * (st.empty() ? j : j - st.top() - 1)) ;
                }
                st.push(j) ;
            }
            ans = max(ans, res) ;
        }
        return ans ;
    }
};
