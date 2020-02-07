# Open - Closed Principle

## Definition of the Open/Closed Principle:

Robert C. Martin considered this principle as the “the most important principle of object-oriented design”. But he wasn’t the first one who defined it. Bertrand Meyer wrote about it in 1988 in his book Object-Oriented Software Construction. He explained the Open/Closed Principle as:

  “Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification.”

The general idea of this principle is great. It tells you to write your code so that you will be able to add new functionality without changing the existing code. That prevents situations in which a change to one of your classes also requires you to adapt all depending classes. Bertrand Mayer proposes to use inheritance to achieve this goal:

  “A class is closed, since it may be compiled, stored in a library, baselined, and used by client classes. But it is also open, since any new class may use it as parent, adding new features. When a descendant class is defined, there is no need to change the original or to disturb its clients.”


## Main Points:
  - Open for extension, Closed for modification
  - Components and/or Classes should be extensible
  - React components all inherit from the <Component> class
  - The custom code written in a React component is essentially extending the function(s) of the base-level Component class
  - A few methods to doing so in React, will be different in more OOP based langs
  - Show examples
