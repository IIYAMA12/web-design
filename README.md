# web-design
[Website](https://iiyama12.github.io/web-design/website)


## What can I do on this website?

![Title order-movies](readme-content/title-new.png)

Buying movies ofcourse! 
Which is not yet possible unfortunately, but you can drag and drop items to your shopping list.

### Drag and drop implementation
I have never implemented the drag and drop features in one of my websites before. So this was a new experience for me. And I am impressed that it isn't very easy to build it correctly. There are so many things can go wrong and all related to the browser default behaviour. At the end I made a terrible mistake by removing the pointer events from the element that I was dragging, this caused Firefox to Glitch out and the drag/drop events were broken on that tab.


<details>
    <summary>Older version</summary>
    <img alt="Version 1.0.0" src="https://raw.githubusercontent.com/IIYAMA12/web-design/master/readme-content/title.png">
    <p>"Order movies ofcourse!" That is what the title says atleast.</p>
</details>

### Make the title BIGGER? 

- [ ] Bigger?
- [ ] Or smaller?

---

## Missing some clarity

This interface is missing some clarity about how to order shop items. A zero state might be handy in this case.

Need:
`16. A crucial moment: the zero state`

- [ ] Zero state (partly added)


---

## Dominates on item text, which becomes visible when hover over it

`11. Strong visual hierarchies work best`

While hovering over an item, it will hide the image and show the title large on top. This will make the item the most visible element on the interface. The title which is ridiculously big gives the item even more attention. There is also a low visible background shadow which lift the item up.

![Hover](readme-content/zero-state-hover.png)

Hover over an item

<details>
    <summary>Older version</summary>
    <img alt="Version 1.0.0" src="https://raw.githubusercontent.com/IIYAMA12/web-design/master/readme-content/title.png">
</details>

---

## Dagging (+ zero state)

`5. Direct manipulation is best` 

<br>

`6. One primary action per screen`

Wouldn't it be nice to drag things?


![Zero state](readme-content/zero-state-hover.png)

While hovering, the zero-state becomes visible on right bottom.

<details>
    <summary>Older version</summary>
    <img alt="Version 1.0.0" src="https://raw.githubusercontent.com/IIYAMA12/web-design/master/readme-content/drag.png">
</details>

![Hover](readme-content/hover-effect.gif)

Adding a lift-up animation which will makes the content fly a bit up, like you can grab it.


When dragging
- [X] Do not show the raster on the list where the item is located at the moment.
- [X] Lift-up animation.
- [ ] Label. (Drag to here / Add to order list / Delete)
- [ ] Trash bin Icon might help supporting the label.
- [ ] Tested with users.


---

## Experimental item list hierarchy

<details>
    <summary>Experimental item list</summary>
    <img alt="Ordered items" src="https://raw.githubusercontent.com/IIYAMA12/web-design/master/readme-content/shopping-items.png">
</details>

I wanted the items `before` and `after` the targeted element, having different styling. By using a matrix you can create nice looking perspective styling.
A tool to generate matrix CSS code: [matrix3d](http://ds-overdesign.com/transform/matrix3d.html) 