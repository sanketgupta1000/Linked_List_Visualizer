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
    constructor(console, parent)
    {
        //saving element where to display buttons
        this.console = console;

        //saving element where to display linked list
        this.parent = parent;

        //data related to linked list
        this.head = null;
        this.size = 0;

        //buttons/fields related to linked list

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

        //now calling method to display the input fields
        this.displaygui();

        //calling show method to show empty linked list
        this.show();
    }

    //method to display input fields
    displaygui()
    {
        //creating a document fragment
        let tempconsole = new DocumentFragment();
        tempconsole.append(this.userinput, this.insertbtn, this.deletebtn,  this.clearbtn);
        this.console.append(tempconsole);
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
        let inittext = `<rect x="0" y="0"></rect><text x="50" y="${y}">H&#8594;</text><text x="90" y="${y}">NULL</text>`;

        //now emptying the parent
        this.parent.replaceChildren();

        //showing the initial configuration of linked list
        this.parent.insertAdjacentHTML("beforeend", inittext);

        //now iterating over linked list and adding in dom
        let xstart=92;
        let r=25;
        let ptr = this.head;
        while(ptr!=null)
        {
            //replacing last appended NULL in dom with the element
            this.parent.lastChild.remove();

            let newcircle = `<circle cx="${xstart+r}" cy="${y-4}" r="${r}"></circle>`;
            let newdata = `<text x="${xstart+r}" y="${y+3}" text-anchor="middle">${ptr.data}</text>`;
            let newarrow = `<text x="${xstart+r+r}" y="${y}">&#8594;</text>`;
            let newnull = `<text x="${xstart+r+r+25}" y="${y}">NULL</text>`;

            this.parent.insertAdjacentHTML("beforeend", newcircle+newdata+newarrow+newnull);

            xstart += (r+r+25);

            ptr = ptr.next;
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
let listconsole = document.querySelector(".console");
let svg = document.getElementById("main-svg");
let linkedlist = new LinkedList(listconsole, svg);