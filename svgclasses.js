//will create abstractions of various svg elements needed in the project
//to include classes for: svg groups, circle, text

//base class for all other svg classes
//contains data with methods to manipulate that data: show, animate, set, animateTransform
class SVGBase
{
    // call like this: (string, {attribute1: value1, attribute2: value2, ...}), where string represents svg element to create, "circle", "text", etc. and the second arg represents an object with key value pairs to set as attributes
    //or this: (svg), where svg represents an SVGElement
    constructor()
    {
        if(arguments.length==1)
        {
            this.data = arguments[0];
        }
        else
        {
            this.data = document.createElementNS("http://www.w3.org/2000/svg", arguments[0]);
            for(let attr in arguments[1])
            {
                this.data.setAttribute(attr, arguments[1][attr]);
            }
        }
    }

    show(parent)
    {
        parent.appendChild(this.data);
    }

    animate(attrs)
    {
        let anim = document.createElementNS("http://www.w3.org/2000/svg", "animate");
        for(let a in attrs)
        {
            anim.setAttribute(a, attrs[a]);
        }
        this.data.appendChild(anim);
        return anim;
    }

    set(attrs)
    {
        let anim = document.createElementNS("http://www.w3.org/2000/svg", "set");
        for(let a in attrs)
        {
            anim.setAttribute(a, attrs[a]);
        }
        this.data.appendChild(anim);
        return anim;
    }

    animateTransform(attrs)
    {
        let anim = document.createElementNS("http://www.w3.org/2000/svg", "animateTransform");
        for(let a in attrs)
        {
            anim.setAttribute(a, attrs[a]);
        }
        this.data.appendChild(anim);
        return anim;
    }
}

class SVGGroup extends SVGBase
{
    //call like this: ({attribute1: value1, attribute2: value2, ...})
    //or this: (g), where g represents an SVGElement corresponding to a group
    constructor()
    {
        if(arguments[0] instanceof SVGGElement)
        {
            //creating object of this class from an svg group so as to use this as an interface
            super(arguments[0]);
        }
        else
        {
            super("g", arguments[0]);
        }
    }

    //method to add its children svg elements
    add()
    {
        for(let ele in arguments)
        {
            if(ele instanceof SVGBase)
            {
                this.data.appendChild(ele.data);
            }
            else
            {
                this.data.appendChild(ele);
            }
        }
    }
};



class SVGCircle extends SVGBase
{
    //call like this: ({attribute1: value1, attribute2: value2, ...})
    //or this: (c), where c represents an SVGElement corresponding to a circle
    constructor()
    {
        if(arguments[0] instanceof SVGCircleElement)
        {
            super(arguments[0]);
        }
        else
        {
            super("circle", arguments[0]);
        }
    }
};

class SVGRect extends SVGBase
{
    //call like this: ({attribute1: value1, attribute2: value2, ...})
    //or this: (r), where r represents an SVGElement corresponding to a rect
    constructor()
    {
        if(arguments[0] instanceof SVGRectElement)
        {
            super(arguments[0]);
        }
        else
        {
            super("rect", arguments[0]);
        }
    }
};


class SVGText extends SVGBase
{
    //call like this: ({attribute1: value1, attribute2: value2, ...})
    //or this: (t), where t represents an SVGElement corresponding to a text
    constructor()
    {
        if(arguments[0] instanceof SVGTextElement)
        {
            super(arguments[0]);
        }
        else
        {
            super("text", arguments[0]);
        }
    }

    //method to set text content
    setTextContent(d)
    {
        this.data.textContent = d;
    }
};