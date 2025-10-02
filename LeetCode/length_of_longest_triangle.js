/**
 * @param {number[][]} grid
 * @return {number}
 */

var lenOfVDiagonal = function (grid) {
    
    const dir = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
    let ans = 0;
    const len = grid.length; bred = grid[0].length;
    let vis = Array.from({ length: len }, () => Array(bred).fill(0)); 
    const isNinetyDegreeTurn = (px, py, nx, ny) => {
        // console.log('checking', {px, py, nx, ny})
        if(px === 1 && py === 1) {
            return nx === 1 && ny === -1
        }
        else if(px === -1 && py === -1) {
            return nx === -1 && ny === 1
        }
        else if(px === -1 && py === 1) {
            return nx === 1 && ny === 1
        }
        else if(px === 1 && py === -1) {
            return nx === -1 && ny === -1
            
        }
        return false; 
    }
    // const isNinetyDegreeTurn = (px, py, nx, ny) => (px * nx + py * ny) === 0;
     const memo = new Map();

    const encodeKey = (x, y, prev, isTurnTaken, dx, dy) =>
        `${x},${y},${prev},${isTurnTaken},${dx},${dy}`;

    // function dfs(grid, x, y, ans, vis, prev, isTurnTaken, diagIndex) {
    //     if (x >= len || x < 0 || y >= bred || y < 0) {
    //         return ans;
    //     }
    //     // x === 3 && y === 2 && console.log({grid, x, y, ans, vis, prev, isTurnTaken, diagIndex})
    //     const key = encodeKey(
    //         x, y, prev, isTurnTaken,
    //         diagIndex.length ? diagIndex[0] : 0,
    //         diagIndex.length ? diagIndex[1] : 0
    //     );
    //     // console.log('mkay memeoe', memo)
    //     if (memo.has(key)) return memo.get(key);
    //     let maxAns = ans;

    //     vis[x][y] = 1
    //     for (const [dx, dy] of dir) {
    //         const nx = x + dx, ny = y + dy;
    //         if (nx >= 0 && nx < len && ny >= 0 && ny < bred && !vis[nx][ny]) {
    //             if (prev === 1) {
    //                 if (grid[nx][ny] === 2 && !vis[nx][ny]) {

    //                     // maxAns = Math.max(maxAns, dfs(grid, nx, ny, ans + 1, vis, 2, false, [dx, dy]))
    //                     const newVal = dfs(grid, nx, ny, ans + 1, vis, 2, false, [dx, dy])
    //                     if(maxAns < newVal){
    //                         maxAns = newVal;
    //                     }
    //                 }
    //             }
    //             else if (prev === 2) {
    //                 if (grid[nx][ny] === 0) {
    //                     // console.log('mkay visist', {ne: {nx, ny}, orig: {x, y}, prev, ans, isTurnTaken, diagIndex, dir: {dx,dy}})
    //                     if (dx === diagIndex[0] && dy === diagIndex[1] ) {
    //                         // maxAns = Math.max(maxAns, dfs(grid, nx, ny, ans + 1, vis, 0, isTurnTaken, [dx, dy]))
    //                         const newVal = dfs(grid, nx, ny, ans + 1, vis, 0, isTurnTaken, [dx, dy])
    //                         if(maxAns < newVal) {
    //                             maxAns = newVal
    //                         }
    //                     }
    //                     else if ((isNinetyDegreeTurn(...diagIndex, dx, dy)) && !isTurnTaken) {
    //                         // console.log('mkay visist', {ne: {nx, ny}, orig: {x, y}, prev, ans, isTurnTaken, diagIndex, dir: {dx,dy}})
    //                         // maxAns = Math.max(maxAns, dfs(grid, nx, ny, ans + 1, vis, 0, true, [dx, dy]))
    //                         const newVal = dfs(grid, nx, ny, ans + 1, vis, 0, true, [dx, dy])
    //                         if(maxAns < newVal){
    //                             maxAns = newVal
    //                         }
                            
    //                     }
    //                 }

    //             }
    //             else if (prev === 0) {
    //                 if (grid[nx][ny] === 2) {
    //                     // console.log('mkay visist', {ne: {nx, ny}, orig: {x, y}, prev, ans, isTurnTaken, diagIndex, dir: {dx,dy}})
    //                     if (dx === diagIndex[0] && dy === diagIndex[1] ) {
    //                         // maxAns = Math.max(maxAns, dfs(grid, nx, ny, ans + 1, vis, 2, isTurnTaken, [dx, dy]))
    //                         const newVal =  dfs(grid, nx, ny, ans + 1, vis, 2, isTurnTaken, [dx, dy])
    //                         if(maxAns<newVal){
    //                             maxAns=newVal
    //                         }
    //                     }
    //                     else if (isNinetyDegreeTurn(...diagIndex, dx, dy) && !isTurnTaken) {
    //                         // maxAns = Math.max(maxAns, dfs(grid, nx, ny, ans + 1, vis, 2, true, [dx, dy]))
    //                         const newVal = dfs(grid, nx, ny, ans + 1, vis, 2, true, [dx, dy])
    //                         if(maxAns < newVal){
    //                             maxAns = newVal ;
    //                         }
    //                     }

    //                 }

    //             }
    //         }

    //     }
    //     vis[x][y] = 0 ;
    //     memo.set(key, maxAns);
    //     return maxAns;
    // }
    const dfs = (x, y, prev, turnTaken, dx, dy, length) => {
        if (x < 0 || x >= len || y < 0 || y >= bred) return length;
        if (vis[x][y]) return length;

        const key = encodeKey(x, y, prev, turnTaken, dx, dy);
        if (memo.has(key)) return memo.get(key);

        vis[x][y] = true;
        let maxLen = length;

        for (const [ndx, ndy] of dir) {
            const nx = x + ndx, ny = y + ndy;
            if (nx < 0 || nx >= len || ny < 0 || ny >= bred) continue;
            if (vis[nx][ny]) continue;
            if(turnTaken && (ndx !== dx || ndy !== dy)) continue;

            if (prev === 1 && grid[nx][ny] === 2) {
                maxLen = Math.max(maxLen, dfs(nx, ny, 2, turnTaken, ndx, ndy, length + 1));
            } else if (prev === 2 && grid[nx][ny] === 0) {
                if (ndx === dx && ndy === dy) {
                    maxLen = Math.max(maxLen, dfs(nx, ny, 0, turnTaken, ndx, ndy, length + 1));
                } else if (isNinetyDegreeTurn(dx, dy, ndx, ndy) && !turnTaken) {
                    maxLen = Math.max(maxLen, dfs(nx, ny, 0, true, ndx, ndy, length + 1));
                }
            } else if (prev === 0 && grid[nx][ny] === 2) {
                if (ndx === dx && ndy === dy) {
                    maxLen = Math.max(maxLen, dfs(nx, ny, 2, turnTaken, ndx, ndy, length + 1));
                } else if (isNinetyDegreeTurn(dx, dy, ndx, ndy) && !turnTaken) {
                    maxLen = Math.max(maxLen, dfs(nx, ny, 2, true, ndx, ndy, length + 1));
                }
            }
        }

        vis[x][y] = false;
        memo.set(key, maxLen);
        return maxLen;
    }
    for (let i = 0; i < len; ++i) {
        for (let j = 0; j < bred; ++j) {
            if (grid[i][j] === 1) {
                // ans = Math.max(ans, dfs(grid, idx, j, 1, vis, 1, false, []))
                ans = Math.max(ans, dfs(i, j, 1, false, 0, 0, 1));
                // vis = Array.from({ length: len }, () => Array(bred).fill(0));
                memo.clear();
            }
        }
    }
    return ans;
};
