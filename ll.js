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
            this.show();
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
            this.show();
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
            this.show();
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
        })

        //now calling method to display the input fields
        this.displayGui();

        //calling method to display buttons for algorithms
        this.displayAlgos();

        //calling show method to show empty linked list
        this.show();
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
        //creating initial text to be displayed
        let y=50;
        let inittext = `<rect x="0" y="0"></rect><text class="whitetxt" x="50" y="${y}">H&#8594;</text><text class="whitetxt" x="90" y="${y}">NULL</text>`;

        //now emptying the parent
        this.parent.replaceChildren();

        //showing the initial configuration of linked list
        this.parent.insertAdjacentHTML("beforeend", inittext);

        //now iterating over linked list and adding in dom
        let xstart=92;
        let r=25;
        let ptr = this.head;
        let index = 0;
        while(ptr!=null)
        {
            //replacing last appended NULL in dom with the element
            this.parent.lastChild.remove();

            let newcircle = `<circle cx="${xstart+r}" cy="${y-4}" r="${r}" id="Node${index++}"></circle>`;
            let newdata = `<text class="whitetxt" x="${xstart+r}" y="${y+3}" text-anchor="middle">${ptr.data}</text>`;
            let newarrow = `<text class="whitetxt" x="${xstart+r+r}" y="${y}">&#8594;</text>`;
            let newnull = `<text class="whitetxt" x="${xstart+r+r+25}" y="${y}">NULL</text>`;

            this.parent.insertAdjacentHTML("beforeend", newcircle+newdata+newarrow+newnull);

            xstart += (r+r+25);

            ptr = ptr.next;
        }
    }

    //method to show traversal through svg animation
    showTraversal()
    {
        //first showing the linked list to make sure all ids are correct
        this.show();

        //variables to help in showing pointer
        let y_of_ptr=90;
        let x_of_ptr=118;

        //variables to help in moving pointer
        let ptrdist = 75;

        //duration of ptr movement
        let dur=1.5;

        //elements to show moving pointer on screen
        //arrow
        let arrow = document.createElementNS("http://www.w3.org/2000/svg", "text");
        arrow.setAttributeNS(null, "x", x_of_ptr);
        arrow.setAttributeNS(null, "y", y_of_ptr);
        arrow.appendChild(document.createTextNode("\u2191"));
        arrow.classList.add("whitetxt");
        // text PTR
        let ptrtext = document.createElementNS("http://www.w3.org/2000/svg", "text");
        ptrtext.setAttributeNS(null, "x", x_of_ptr);
        ptrtext.setAttributeNS(null, "y", y_of_ptr+25);
        ptrtext.appendChild(document.createTextNode("PTR"));
        ptrtext.classList.add("whitetxt");
        //group to contain both
        let pointer = document.createElementNS("http://www.w3.org/2000/svg", "g");
        pointer.id = "pointer";
        pointer.setAttributeNS(null, "text-anchor", "middle");

        //adding in group
        pointer.append(arrow, ptrtext);

        //creating animation for pointer
        let ptranim = document.createElementNS("http://www.w3.org/2000/svg", "animateTransform");
        ptranim.setAttributeNS(null, "attributeName", "transform");
        ptranim.setAttributeNS(null, "attributeType", "XML");
        ptranim.setAttributeNS(null, "type", "translate");
        ptranim.setAttributeNS(null, "from", "0");
        ptranim.setAttributeNS(null, "to", ptrdist);
        ptranim.setAttributeNS(null, "dur", dur+"s");
        ptranim.setAttributeNS(null, "additive", "sum");
        ptranim.setAttributeNS(null, "repeatCount", this.size);
        ptranim.setAttributeNS(null, "begin", "indefinite");
        ptranim.setAttributeNS(null, "accumulate", "sum");
        ptranim.setAttributeNS(null, "keyTimes", "0; 0.2; 1");
        ptranim.setAttributeNS(null, "values", `0; 0; ${ptrdist}`);
        ptranim.setAttributeNS(null, "fill", "freeze");
        ptranim.id = "ptranim";

        //adding animation on group
        pointer.appendChild(ptranim);

        //adding pointer in DOM
        this.parent.appendChild(pointer);

        //now will add animation to change color of node everytime pointer points it
        let currsize = this.size;
        let animoffset = 0;
        for(let i = 0; i<currsize; i++, animoffset+=dur)
        {
            let coloranim = `<set
                                xlink:href="#Node${i}"
                                attributeName="fill"
                                from="deeppink"
                                to="orangered"
                                dur="0.6s"
                                begin="ptranim.begin+${animoffset}s"
                            >
                            </set>`
            this.parent.insertAdjacentHTML("beforeend", coloranim);
        }

        //adding output text as well as animation for it
        animoffset = 0;
        let outy = 150;
        let outx = x_of_ptr;
        let outxoffset = 50;
        let outtext = document.createElementNS("http://www.w3.org/2000/svg", "text");
        outtext.setAttributeNS(null, "x", outx);
        outtext.setAttributeNS(null, "y", outy);
        outtext.setAttributeNS(null, "text-anchor", "middle");
        outtext.classList.add("whitetxt");
        outtext.appendChild(document.createTextNode("Output:"));
        this.parent.appendChild(outtext);
        //now traversing list in memory
        for(let i = 0, ptr = this.head; ptr!=null; (ptr=(ptr.next)), i++, (animoffset+=dur))
        {
            let textele = document.createElementNS("http://www.w3.org/2000/svg", "text");
            textele.setAttributeNS(null, "x", outx+(i*outxoffset));
            textele.setAttributeNS(null, "y", outy+50);
            textele.classList.add("outtxt");
            textele.id = `Out${i}`;
            textele.appendChild(document.createTextNode(ptr.data));

            let textanim = `<set
                                xlink:href="#Out${i}"
                                attributeName="fill"
                                from="none"
                                to="white"
                                dur="0.5s"
                                fill="freeze"
                                begin="ptranim.begin+${animoffset}s"
                            >
                            </set>`;
            
            this.parent.appendChild(textele);
            this.parent.insertAdjacentHTML("beforeend", textanim);
        }

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