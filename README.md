# LightGrid Problem

## Question
You have a grid of lights. Each light is initially either off or on. Every column in the grid has a switch and when the switch is flipped, all the lights in that column reverse states
Given a array Q of Strings, where the j-th character of the i-th element is 'Y' if the light in row i, column j is initially on, and 'N' otherwise, find the largest number of rows that can be lit after performing exactly M flips
A row in the grid is considered lit if all the lamps in that row are on and M flips do not necessarily have to be on M distinct switches
________________________________________

### Constraints
Array Q will contain between 1 to 50 elements, inclusive
Number of elements in Q will define rows and number of characters in each element will define columns of the grid
Each element of Q will have the same number of characters, ranging from 1 to 50, inclusive
M will range from 0 to 1000, inclusive
________________________________________
### Input Format
Line 1: Comma separated Strings representing Q
Line 2: Integer M
________________________________________
### Output Format
Largest number of rows
________________________________________
### Sample Input
NY,YN,YN
1
Sample Output
2
Explanation
This is a 3 rows by 2 columns grid. If we flip the switch on the second column, the bottom two rows will all light up, giving the largest possible number of lit rows with only 1 flip
