class Solution:
    def findClosestNumber(self, nums: List[int]) -> int:
        CloseNum=nums[0]

        for i in nums:
            if abs(i) < abs(CloseNum):
                CloseNum = i

        if CloseNum < 0 and abs(CloseNum) in nums:
            return abs(CloseNum)
        return CloseNum
