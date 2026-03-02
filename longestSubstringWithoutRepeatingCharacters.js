/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  const set = new Set();
  let i = 0, j = 0, max = 0;
  while (i < s.length && j < s.length) {
    if (!set.has(s[j])) {
      set.add(s[j++]);
      max = Math.max(max, set.size);
    } else {
      set.delete(s[i++]);
    }
  }
  return max;
};
