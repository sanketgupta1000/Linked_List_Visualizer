//will create class for linked list, and node
//Node class will contain data and constructor related to a node
//LinkedList class will contain data related to linked list, their methods, gui buttons/fields related to linked list, and their event listeners
//constructor will initialize data related to linked list, as well as add event listeners to gui buttons/fields
//it will also contain methods to display buttons/fields and display linked list

class Node
{
    constructor(val)
    {
        this.data = val;
        this.next = null;
    }
};

class LinkedList
{
    constructor(listconsole, listalgos, parent)
    {
        //saving element where to display buttons
        this.listconsole = listconsole;

        //saving element where to display algorithms
        this.listalgos = listalgos;

        //saving element where to display linked list
        this.parent = parent;

        //data related to linked list
        this.head = null;
        this.size = 0;

        //buttons/fields related to linked list manipulation

        //creating input field
        this.userinput = document.createElement("input");
        this.userinput.type = "number";
        this.userinput.classList = "consoleinput";
        this.userinput.id = "userinput";
        
        //creating input button
        this.insertbtn = document.createElement("input");
        this.insertbtn.type = "button";
        this.insertbtn.classList = "consoleinput consolebtn insertbtn";
        this.insertbtn.id = "insertbtn";
        this.insertbtn.value = "Insert";
        //adding event listener on it
        this.insertbtn.addEventListener("click", (click)=>{
            this.addNode(Number(this.userinput.value));
            this.show(this.parent, 0, this.size-1, this.nodeidprefix, this.circleidprefix, this.linkedlistid);
        });
        
        //creating delete button
        this.deletebtn = document.createElement("input");
        this.deletebtn.type = "button";
        this.deletebtn.classList = "consoleinput consolebtn deletebtn";
        this.deletebtn.id = "deletebtn";
        this.deletebtn.value = "Delete";
        //adding event listener on it
        this.deletebtn.addEventListener("click", (click)=>{
            this.deleteNode(Number(this.userinput.value));
            this.show(this.parent, 0, this.size-1, this.nodeidprefix, this.circleidprefix, this.linkedlistid);
        });
        
        //creating clear button
        this.clearbtn = document.createElement("input");
        this.clearbtn.type = "button";
        this.clearbtn.classList = "consoleinput consolebtn clearbtn";
        this.clearbtn.id = "clearbtn";
        this.clearbtn.value = "Clear";
        //adding event listener on it
        this.clearbtn.addEventListener("click", (click)=>{
            while(this.size)
            {
                this.deleteNode(0);
            }
            this.show(this.parent, 0, this.size-1, this.nodeidprefix, this.circleidprefix, this.linkedlistid);
        });

        //creating button for traversal
        this.traversebtn = document.createElement("input");
        this.traversebtn.type = "button";
        this.traversebtn.classList = "algobtn traversebtn";
        this.traversebtn.id = "traversebtn";
        this.traversebtn.value = "Traversal";
        //adding event listener to it
        this.traversebtn.addEventListener("click", (click)=>{
            this.showTraversal();
        });

        //creating data to help in printing as well as showing traversal
        this.circleidprefix = "Circle";
        this.nodeidprefix = "Node";
        this.x = 50;
        this.y = 50;
        this.r = 25;
        this.dur = 1.5;
        this.linkedlistid = "ll";
        this.ptranimid = "ptranim";

        //now calling method to display the input fields
        this.displayGui();

        //calling method to display buttons for algorithms
        this.displayAlgos();

        //calling show method to show empty linked list
        this.show(this.parent, 0, this.size-1, this.nodeidprefix, this.circleidprefix, this.linkedlistid);
    }

    //method to display input fields
    displayGui()
    {
        //creating a document fragment
        let tempconsole = new DocumentFragment();
        tempconsole.append(this.userinput, this.insertbtn, this.deletebtn,  this.clearbtn);
        this.listconsole.append(tempconsole);
    }

    //method to display algorithms
    displayAlgos()
    {
        let algoitem = document.createElement("li");
        algoitem.classList="algoitem";
        algoitem.appendChild(this.traversebtn);

        //creating document fragment
        let listitem = new DocumentFragment();
        listitem.append(algoitem);

        this.listalgos.append(listitem);
    }

    //now defining methods to manipulate linked list in memory

    //method to add a new node
    addNode(val)
    {
        //creating new node
        var newnode = new Node(val);

        if(this.head==null)
        {
            //edge case
            this.head=newnode;
        }
        else
        {
            //general case
            let ptr = this.head;
            while((ptr.next)!=null)
            {
                ptr = (ptr.next);
            }

            ptr.next = newnode;
        }
        this.size++;

        this.logList();

    }

    //method to delete a node at a specific index
    deleteNode(ind)
    {
        if((ind>=0)&&(ind<this.size))
        {
            //valid index
            let preptr = null;
            let ptr = this.head;
            while(ind--)
            {
                preptr = ptr;
                ptr = (ptr.next);
            }
            if(preptr!=null)
            {
                (preptr.next) = (ptr.next);
            }
            else
            {
                this.head = (ptr.next);
            }
            this.size--;
        }
        this.logList();
    }

    //now defining method to show linked list in svg

    show()
    {
        //emptying the parent
        this.parent.replaceChildren();
        
        //filling it with a coloured rectangle
        let fillrect = new SVGRect({
            x:0,
            y:0
        });
        fillrect.show(this.parent);
        
        //creating group to display the linked list
        let ll = new SVGGroup({id: this.linkedlistid});

        let inittext = new SVGText({
            class: "whitetxt",
            x: this.x,
            y: this.y
        }, "left");
        inittext.setTextContent("H\u2192");
        ll.add(inittext);

        //now iterating over linked list and adding in dom
        let xstart=this.x+42;
        let ptr = this.head;
        let index = 0;
        while(ptr!=null)
        {
            //creating a circle
            let circle = new SVGCircle({
                cx: xstart+this.r,
                cy: this.y-4,
                r: this.r,
                id: this.circleidprefix+(index)
            });

            //text to display in the circle
            let v = new SVGText({
                x: xstart+this.r,
                y: this.y+4,
                class: "whitetxt",
            }, "middle");
            v.setTextContent(ptr.data);

            //arrow
            let rarrow = new SVGText({
                x: xstart+this.r+this.r,
                y: this.y,
                class: "whitetxt"
            }, "left");
            rarrow.setTextContent("\u2192");

            //node
            let node = new SVGGroup({id: this.nodeidprefix+index});
            node.add(circle, v);

            //adding in group of linked list
            ll.add(node, rarrow);

            xstart+=(this.r+this.r+25);
            index++;
            ptr = ptr.next;
        }

        //adding null pointer in group
        let nulltext = new SVGText({
            x: xstart,
            y: this.y,
            class: "whitetxt"
        }, "left");
        nulltext.setTextContent("NULL");
        ll.add(nulltext);

        //showing the linked list
        ll.show(this.parent);
    }

    //method to show traversal through svg animation
    showTraversal()
    {
        //first showing the linked list to make sure all ids are correct
        this.show(this.parent, 0, this.size-1, this.nodeidprefix, this.circleidprefix, this.linkedlistid);

        //creating pointer
        let arrowx = this.x+60;
        let arrowy = this.y+40;
        let ptrx = arrowx+7;
        let ptry = arrowy+25;
        let uparr = new SVGText({
            x: arrowx,
            y: arrowy,
            class: "whitetxt"
        }, "left");
        uparr.setTextContent("\u2191");
        let ptrtext = new SVGText({
            x: ptrx,
            y: ptry,
            class: "whitetxt"
        }, "middle");
        ptrtext.setTextContent("PTR");
        let pointer = new SVGGroup({id: "pointer"});
        pointer.add(uparr, ptrtext);

        //adding animation to pointer
        let ptranim = pointer.animateTransform({
            attributeName: "transform",
            attributeType: "XML",
            type: "translate",
            additive: "sum",
            from: "0",
            to: this.r+25+this.r,
            accumulate: "sum",
            repeatCount: this.size,
            begin: "indefinite",
            dur: this.dur,
            keyTimes: "0; 0.2; 1",
            values: "0; 0; "+(this.r+25+this.r),
            fill: "freeze",
            id: this.ptranimid
        });

        //adding pointer in dom
        pointer.show(this.parent);

        //now adding color change animation for circles
        for(let i = 0, animoffset = 0; i<this.size; i++, animoffset+=this.dur)
        {
            let circle = new SVGCircle(document.getElementById(this.circleidprefix+i));
            circle.set({
                attributeName: "fill",
                from: "deeppink",
                to: "orangered",
                dur: "0.3s",
                begin: this.ptranimid+".begin+"+animoffset+"s"
            });
        }

        //now displaying output on screen
        let ptr = this.head;
        let animoffset = 0;
        let outx = this.x + 50;
        let outy = this.y + 200;
        let outoffsetx = 70;
        let outputtxt = new SVGText({
            id: "outputtxt",
            x: outx,
            y: this.y+150,
            class: "whitetxt"
        });
        outputtxt.setTextContent("Output:");
        outputtxt.show(this.parent);

        let outputgroup = new SVGGroup({id: "output"});
        while(ptr!=null)
        {
            let text = new SVGText({
                x: outx,
                y: outy,
                class: "outtxt"
            }, "left");
            text.setTextContent(ptr.data);
            text.set({
                attributeName: "fill",
                from: "none",
                to: "white",
                dur: "0.1s",
                begin: this.ptranimid+".begin+"+animoffset+"s",
                fill: "freeze"
            });
            outputgroup.add(text);
            animoffset+=this.dur;
            outx+=outoffsetx;
            ptr = ptr.next;
        }

        //showing output
        outputgroup.show(this.parent);

        //starting animation
        if(this.size)
        {
            ptranim.beginElement();
            
        }
    }

    //method to console log list for debugging
    logList()
    {
        //console log for debugging
        let ptr = this.head;
        let llstr = "head->";
        while(ptr!=null)
        {
            llstr+=(ptr.data + "->");
            ptr = (ptr.next);
        }
        llstr+="null";
        console.log(llstr);
    }
};

//driver code

//accessing the DOM elements where to display controls for manipulating linked list
let listconsole = document.querySelector(".console");
let listalgos = document.getElementById("ll1algolist");

//accessing SVG element to draw linked list in
let svg = document.getElementById("main-svg");

//creating object
let linkedlist = new LinkedList(listconsole, listalgos, svg);