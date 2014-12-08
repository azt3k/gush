Gush
====

Provides touch scroll support for android < 3 devices as a work around for lack of overflow support.


Options / Defaults
------------------

````json
{
    x: true,
    y: true,
    start: {
        stopPropagation: false,
        preventDefault: false,
    },
    move: {
        stopPropagation: false,
        preventDefault: true
    }
}
````

- `x` : enables / disables scroll on x axis
- `y` : enables / disables scroll on y axis
- `start.stopPropagation` : prevents event propagation on touch start
- `start.preventDefault` : prevents default event behaviou touch start
- `move.stopPropagation` : prevents event propagation on touch move
- `move.preventDefault` : prevents default event behaviou touch move


Limitations
-----------

- only supports android < 3 devices