
function getFriendsAtLevel(friends, id, level) {
    const visited = new Set();
    const queue = [[id, 0]]; // fila: [id, nivel]
    visited.add(id);
  
    const result = [];
  
    while (queue.length > 0) {
      const [currentId, currentLevel] = queue.shift();
  
      if (currentLevel === level) {
        result.push(currentId);
      } else if (currentLevel < level) {
        for (const neighbor of friends[currentId]) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push([neighbor, currentLevel + 1]);
          }
        }
      }
    }
  
    return result;
  }


  function watchedVideosByFriends(watchedVideos, friends, id, level) {
    
    const amigos_diretos = getFriendsAtLevel(friends, id, level)

   const videos = amigos_diretos.map(it => {
        return [ ...watchedVideos[it]]
    }).flat()

    const freqMap = videos.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
    }, {});

    const result = [...new Set(videos)].sort((a, b) => {
        const freqDiff = freqMap[a] - freqMap[b];
        if (freqDiff !== 0) return freqDiff; 
        return a.localeCompare(b); 
    });




    return result
};


console.log("--- Case 1 ----------- ************* --------------- ", watchedVideosByFriends([["A","B"],["C"],["B","C"],["D"]],  [[1,2],[0,3],[0,3],[1,2]], 0, 1))

console.log("---- Case 2 ---------- ************* --------------- ", watchedVideosByFriends([["A","B"],["C"],["B","C"],["D"]],  [[1,2],[0,3],[0,3],[1,2]], 0, 2))