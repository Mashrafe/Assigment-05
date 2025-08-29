1.  Here is the breakdown of the differences between getElementById, getElementsByClassName, and querySelector / querySelectorAll in JavaScript:
(a). getElementById
•	Selects a single element by its unique id.
•	A single DOM element 
•	Fast and straightforward for selecting elements with a unique id.
(b). getElementsByClassName
•	Selects all elements with a specific class.
•	A live HTMLCollection 
•	Useful for selecting multiple elements by class name.
(c). querySelector
•	Selects the first element that matches a CSS selector.
•	A single DOM element 
•	Flexible for selecting elements using CSS selectors.
(d). querySelectorAll
•	Selects all elements that match a CSS selector.
•	A static NodeList 
•	Ideal for selecting multiple elements using CSS selectors.

2. To create and insert a new element into the DOM using JavaScript, you can follow these steps:
(a). Create the element: Use the document.createElement() method to create a new HTML element.
(b).Add content or attributes: Use methods like createTextNode() or set properties like innerHTML to             add content, and setAttribute() to add attributes.
(c). Insert the element: Use methods like appendChild() or insertBefore() to add the new element to the desired location in the DOM.

Example:
const newDiv = document.createElement("div");
newDiv.textContent = "Hello, this is a new div!";
newDiv.setAttribute("class", "my-class");
const parentElement = document.getElementById("parent-id"); 
parentElement.appendChild(newDiv);

3. Event bubbling: Event bubbling is a mechanism where an event triggered on a child element propagates upward through its parent elements in the DOM hierarchy until it reaches the root. This is the default behavior in JavaScript.
How It Works: When click a child element (like a <button> inside a <div>), the event runs on the button first, then bubbles up to the div, then the body, and finally the document.

4. Event Delegation: The event delegation is a programming technique used to handle events efficiently by leveraging the concept of event propagation . Instead of attaching event listeners to multiple child elements, a single event listener is added to a common parent element. This listener can then manage events for all its child elements dynamically.
How It Works: When an event occurs on a child element, it propagates up the DOM tree. The parent element's event listener can intercept this event and determine the actual target using the event. Target property. This allows the parent to handle events for its children without needing individual listeners.
5. Difference between preventDefault() Vs stopPropagation() methods are given below:
 preventDefault(): stops what the browser would normally do.
stopPropagation(): stops the event from moving up the DOM tree.

