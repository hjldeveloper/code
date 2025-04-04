const solution = (numbers, hand) => {
  const getPos = (n) => {
    switch (n) {
      case 0:
        return [3, 1];
      case '*':
        return [3, 0];
      case '#':
        return [3, 2];
      default:
        return [Math.floor((n - 1) / 3), (n - 1) % 3];
    }
  };

  const getDist = (pos1, pos2) =>
    Math.abs(pos1[0] - pos2[0]) + Math.abs(pos1[1] - pos2[1]);

  const leftKeys = [1, 4, 7];
  const rightKeys = [3, 6, 9];
  let leftHand = '*';
  let rightHand = '#';

  let result = '';

  for (const num of numbers) {
    if (leftKeys.includes(num)) {
      result += 'L';
      leftHand = num;
    } else if (rightKeys.includes(num)) {
      result += 'R';
      rightHand = num;
    } else {
      const curPos = getPos(num);
      const leftPos = getDist(getPos(leftHand), curPos);
      const rightPos = getDist(getPos(rightHand), curPos);

      if (leftPos < rightPos || (leftPos === rightPos && hand === 'left')) {
        result += 'L';
        leftHand = num;
      } else {
        result += 'R';
        rightHand = num;
      }
    }
  }

  return result;
};
// const numbers = [1, 3, 4, 5, 8];
// LRLLRRLLLRR
const numbers = [7, 0, 8, 2, 8, 3, 1, 5, 7, 6, 2];
const hand = 'left';

const result = solution(numbers, hand);
console.log(result);
