import turtle
import math
import random

wn = turtle.Screen()
wn.setup(600,550)

mineCounter = turtle.Turtle()
mineCounter.penup()
mineCounter.goto(0,-200)
mineCounter.hideturtle()

grid = turtle.Turtle()
grid.penup()
grid.speed(0)
grid.goto(-250,250)

count = 0
# these two loops draw the grid for the game.
while (count < 9) :
  grid.pendown()
  grid.forward(500)
  grid.penup()
  grid.goto(-250,grid.ycor()-50)
  count += 1

grid.goto(-250,250)
grid.right(90)
while (count > -2) :
  grid.pendown()
  grid.forward(400)
  grid.penup()
  grid.goto(grid.xcor()+50,250)
  count -= 1
grid.hideturtle()

# this list stores the turtles for use later in the program
field = []

count = 0
x = -225
y = 225
# this loop initializes the turtles and moves them into an 8x10 grid.
while (count < 80) :
  t = turtle.Turtle(shape="square")
  t.resizemode("user")
  t.shapesize(2.4,2.4,1)
  t.color("green")
  t.penup()
  t.speed(0)
  t.goto(x,y)
  count += 1
  if (count % 10 == 0) :
    x = -225
    y -= 50
  else :
    x += 50
  field.append(t)

spotsLeft = 80.0
minesLeft = 15
mineCount = 0
firstClick = True

# this function is called each time a user clicks with the left mouse button.
# the parameters a and b are the coordinates of the clicked spot.
def click(a,b) :
  global firstClick
  global minesLeft
  global spotsLeft
  global mineCount

  clickedSquare = field[0]
  d1 = 1000
  # this loop checks to see which turtle was actually clicked, and has that turtle write its speed in its square. It selects the turtle closest to the clicked coordinates. These few lines also show up in the flag function.
  for trtl in field :
    d2 = math.sqrt((a-trtl.xcor())**2 + (b-trtl.ycor())**2)
    if (d1 > d2) :
      d1 = d2
      clickedSquare = trtl

  # this conditional generates a random board when the user selects their fist square to ensure that their fisrt click is not a mine, and that their first click is not adjacent to any mines.
  if (firstClick) :
    for t in field :
      rand = random.uniform(0,1)
      # this is a formula for getting the distance between two points, and shows up often in this program.
      d = math.sqrt((t.xcor()-clickedSquare.xcor())**2 + (t.ycor()-clickedSquare.ycor())**2)
      # this conditional, when combined with the for loop will place mines at random locations and only places the mine there if it is not adjacent to the first clicked square.
      if ((rand < (minesLeft/spotsLeft)) and (d > 70.75)) :
        # if a square is a mine, its speed is set to nine.
        t.speed(9)
        minesLeft-=1
        mineCount += 1
      spotsLeft-=1

    # this next loop checks all the turtles in the field to see how many mines are adjacent to it, and then sets its speed to that number. It checks each turtle in the list to see how many are close enough to be considered adjacent to the first, and then how many are adjacent to the second, and so on.
    for t in field :
      if (t.speed() != 9) :
        for k in field :
          d = math.sqrt((t.xcor()-k.xcor())**2 + (t.ycor()-k.ycor())**2)
          if (d < 70.72) :
            if(k.speed() == 9) :
              t.speed(t.speed()+1)
    firstClick = False

  lost = False
  # it first checks to see if you have clicked an unflagged square. You cannot reveal a flagged square.
  if (clickedSquare.pencolor() == "green") :
    s = clickedSquare.speed()
    #if you click a square with a mine, you lose.
    if (s == 9) :
      for t in field :
        t.hideturtle()
        t.clear()
      grid.clear()
      mineCounter.clear()
      grid.goto(0,0)
      grid.write("You Lose", align="center", font=("Arial", 50, "normal"))
      clickedSquare.color("white")
      lost = True
    # if the square wasn't a mine, it reveals the number of mines adjacent to the square by writing its speed in its square.
    if (not lost) :
      clickedSquare.hideturtle()
      clickedSquare.setheading(-90)
      clickedSquare.forward(10)
      clickedSquare.color("blue")
      clickedSquare.write(s, align="center", font=("Arial", 15, "normal"))
      clickedSquare.backward(10)

      # if the square clicked had zero mines adjacent, it should reveal all adjacent squares, as none of them can be mines.
      if (s == 0) :
        # this loop checks to see what squares are adjacent to the revealed zero, and calls the click fuction with each of those square's coordinates.
        for k in field :
          d = math.sqrt((clickedSquare.xcor()-k.xcor())**2 + (clickedSquare.ycor()-k.ycor())**2)
          if (d < 70.72 and k.pencolor() == "green") :
            click(k.xcor(), k.ycor())

      mineCounter.write("Mines left: " + str(mineCount), align="center", font=("Arial", 25, "normal"))
      done = True
      # this loops just checks to see if all the safe squares have been revealed. Not all mines need to be flagged, but all safe squares must be clicked to win. If any safe square is still green, it stops checking.
      for t in field :
        if (t.speed() != 9 and t.pencolor() == "green") :
          done = False
          break
      #if all safe squares have been revealed, you win
      if (done) :
        for t in field :
          t.hideturtle()
          t.clear()
        grid.clear()
        mineCounter.clear()
        grid.goto(0,0)
        grid.write("You Win", align="center", font=("Arial", 50, "normal"))

# this function allows the user to 'flag' or 'unflag' a mine by clicking with the right mouse button. This turns the square red or green, depending on what it was before.
def flag(a,b) :
  global mineCount
  clickedSquare = field[0]
  d1 = 1000
  # selects the turtle closest to the clicked point.
  for trtl in field :
    d2 = math.sqrt((a-trtl.xcor())**2 + (b-trtl.ycor())**2)
    if (d1 > d2) :
      d1 = d2
      clickedSquare = trtl
  # this changes the color of the clicked square, and updates the display with the number of flags left to place. If the user only flags squares that are actually mines, this will always be the true number of mines left. 
  if (clickedSquare.pencolor() == "red") :
    clickedSquare.color("green")
    mineCount += 1
  else :
    clickedSquare.color("red")
    mineCount -= 1
  mineCounter.clear()
  mineCounter.write("Mines left: " + str(mineCount), align="center", font=("Arial", 25, "normal"))

for t in field :
  t.onclick(click, 1)
  t.onclick(flag, 3)

wn.mainloop()