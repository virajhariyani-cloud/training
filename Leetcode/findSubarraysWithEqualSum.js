/**
 * @param {number[]} nums
 * @return {boolean}
 */
var findSubarrays = function(nums) {
  const seen =new Set();
  for(let i=1;i<nums.length;i++)
  {
    const sum=nums[i]+nums[i-1];
    if(seen.has(sum)) return true;
    seen.add(sum);
  } 
  return false;
};
