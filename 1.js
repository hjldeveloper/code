function solution(places) {
    const getPosition = (place) => {
        return place.flatMap((row,x) => [...row].flatMap((cell, y) => cell === 'P' ? [[x,y]]:[]));
    }
    
    const getDistance = (place,p1,p2) => {
        const [x1,y1] = p1;
        const [x2,y2] = p2;
        
        const dist = Math.abs(x1-x2) + Math.abs(y1-y2);
        if(dist > 2) return true;
        if(dist < 2) return false;
        if(x1 === x2) return place[x1][(y1+y2)/2] === 'X';
        if(y1 === y2) return place[(x1+x2)/2][y1] === 'X';
        return place[x1][y2] === 'X' && place[x2][y1] === 'X';
    };
    
    const result = places.map(place => {
        const pPositions = getPosition(place);
        
        const isValid = pPositions.every((p1, i) => pPositions.slice(i + 1).every(p2 => getDistance(place, p1, p2)));
        
        return isValid ? 1 : 0;
    });
    
    return result;
    
}
