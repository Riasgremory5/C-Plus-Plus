class Solution {
    unordered_map<string, vector<int>> ma ;
public:
    vector<int> diffWaysToCompute(string expression) {
        int n = expression.size() ;
        vector<int> ans ;
        
        for(int i = 0; i < n; ++i){
            char c = expression[i] ;
            if (c == '*' || c == '+' || c == '-'){
                vector<int> n1, n2 ;
                string s1 = expression.substr(0, i), s2 = expression.substr(i + 1) ;
                // cout << s1 << " " << s2 ;
                
                n1 = (ma.find(s1) != ma.end()) ? ma[s1] : diffWaysToCompute(s1) ;
                n2 = (ma.find(s2) != ma.end()) ? ma[s2] : diffWaysToCompute(s2) ;
                
                
                for(auto x : n1){
                    for(auto y : n2){
                        if (c == '-') ans.push_back(x - y) ;
                        else if (c == '+') ans.push_back(x + y) ;
                        else ans.push_back(x * y) ;
                    }
                }
            }
        }
        if(ans.empty()) ans.push_back(stoi(expression)) ;
        ma[expression] = ans ;
        return ans ;
     
    }
};
/*
Input: expression = "2-1-1"
Output: [0,2]
Explanation:
((2-1)-1) = 0 
(2-(1-1)) = 2
*/
