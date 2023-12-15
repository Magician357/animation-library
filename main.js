function scrollAnimationScene(start_scroll,duration){
    this.start=start_scroll
    this.duration=duration
    this.end=start_scroll+duration

    this.elements = []

    this.tick = function (current_scroll) {
        const scroll = current_scroll-this.start;
        this.elements.forEach((element) => {
            if (element.start <= scroll && element.end >= scroll){
                element.element.style.display="fixed"
                // currently being animated
                element.element.style.left = element.x(scroll)+"px";
                element.element.style.top = element.y(scroll)+"px";
            } else if (scroll > element.end+element.after || scroll < element.start-element.before){
                element.element.style.display="none"
            }
        })
    }

    this.addElement_position = function (id,start,end,x_function,y_function, visible_before_duration=0, visible_after_duration=0){
        // id = id of the element
        // start = start scroll position to start animating
        // end = end scroll position to stop animating
        // x_function = function that takes in a number from 0 to 1, and returns the desired x position
        // y_function = same, but for y
        // visible_before_duration/visible_after_duration: how much longer the element should stay visible after the animation has finished

        let current = {
            id: id,
            element: document.getElementById(id),
            start: start,
            end: end,
            x: x_function,
            y: y_function,
            before: visible_before_duration,
            after: visible_after_duration
        };

        this.elements.push(current);
    }
}