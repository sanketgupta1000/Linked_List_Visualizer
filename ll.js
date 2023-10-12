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
        this.userinput.placeholder="Insert at end/Delete from index";
        this.userinput.style.width="200px";
        
        //creating input button
        this.insertbtn = document.createElement("input");
        this.insertbtn.type = "button";
        this.insertbtn.classList = "consoleinput consolebtn insertbtn";
        this.insertbtn.id = "insertbtn";
        this.insertbtn.value = "Insert";
        //adding event listener on it
        this.insertbtn.addEventListener("click", (click)=>{
            this.addNode(Number(this.userinput.value));
            this.show(this.parent, this.x, this.y, this.nodeidprefix, this.circleidprefix, this.linkedlistid, this.head);
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
            this.show(this.parent, this.x, this.y, this.nodeidprefix, this.circleidprefix, this.linkedlistid, this.head);
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
            this.show(this.parent, this.x, this.y, this.nodeidprefix, this.circleidprefix, this.linkedlistid), this.head;
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

        //creating button for mergesort
        this.mergesortbtn = document.createElement("input");
        this.mergesortbtn.type = "button";
        this.mergesortbtn.classList.add("algobtn", "mergesortbtn");
        this.mergesortbtn.id = "mergesortbtn";
        this.mergesortbtn.value = "Merge Sort";
        //adding event listener to it
        this.mergesortbtn.addEventListener("click", (click)=>{
            this.parent.replaceChildren();
            let animobj = this.mergeSort(this.head, this.x, this.y, this.nodeidprefix, this.circleidprefix, this.linkedlistid, 0);
            this.head = animobj.headlink;
            animobj.driveranim.beginElement();
            this.logList();
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
        this.show(this.parent, this.x, this.y, this.nodeidprefix, this.circleidprefix, this.linkedlistid, this.head);
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
        algoitem.append(this.traversebtn);

        this.listalgos.append(algoitem);

        let algoitem2 = document.createElement("li");
        algoitem2.classList="algoitem";
        algoitem2.append(this.mergesortbtn);

        this.listalgos.append(algoitem2);
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

    show(container, startx, starty, nodeid, circleid, gid, startptr, shouldempty=true)
    {
        //emptying the container to display linked list in
        if(shouldempty)
        {
            container.replaceChildren();
        }
        
        //creating group to display the linked list
        let ll = new SVGGroup({id: gid});

        let inittext = new SVGText({
            class: "whitetxt",
            x: startx,
            y: starty
        }, "left");
        inittext.setTextContent("H\u2192");
        ll.add(inittext);

        //now iterating over linked list and adding in dom
        let xstart=startx+42;
        let ptr = startptr;
        let index = 0;
        while((ptr!=null))
        {
            //creating a circle
            let circle = new SVGCircle({
                cx: xstart+this.r,
                cy: starty-4,
                r: this.r,
                id: circleid+(index)
            });

            //text to display in the circle
            let v = new SVGText({
                x: xstart+this.r,
                y: starty+4,
                class: "whitetxt",
            }, "middle");
            v.setTextContent(ptr.data);

            //arrow
            let rarrow = new SVGText({
                x: xstart+this.r+this.r,
                y: starty,
                class: "whitetxt"
            }, "left");
            rarrow.setTextContent("\u2192");

            //node
            let node = new SVGGroup({id: nodeid+index});
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
            y: starty,
            class: "whitetxt"
        }, "left");
        nulltext.setTextContent("NULL");
        ll.add(nulltext);

        //showing the linked list
        ll.show(container);
    }

    //method to show traversal through svg animation
    showTraversal()
    {
        //first showing the linked list to make sure all ids are correct
        this.show(this.parent, this.x, this.y, this.nodeidprefix, this.circleidprefix, this.linkedlistid, this.head);

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
        }, "left");
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

    //method to show merge sort
    mergeSort(startptr, startx, starty, nodeid, circleid, gid, grpShowDelayByParent)
    {
        if((startptr!=null)&&(startptr.next!=null))
        {
            //showing the portion of linked list at specified location
            this.show(this.parent, startx, starty, nodeid, circleid, gid, startptr, false);
            
            //getting the group as an object of my class
            let g = new SVGGroup(document.getElementById(gid));

            //first hiding it to synchronize animation
            g.data.setAttribute("visibility", "hidden");

            //declaring necessary variables

            //general variables
            let nodeCount=0;
            let ptr = startptr;
            while(ptr!=null)
            {
                nodeCount++;
                ptr = (ptr.next);
            }
            const nodeCountInLeftHalf = Math.floor(nodeCount/2);
            const nodeCountInRightHalf = nodeCount - nodeCountInLeftHalf;
            const arrowCountInLeftHalf = nodeCountInLeftHalf + 1;
            const arrowCountInRightHalf = nodeCountInRightHalf + 1;
            //end of general variables

            //variables related to co-ordinates
            const offsety = 80;
            const leftStartx = startx;
            const leftStarty = starty + offsety;
            const rightStartx = leftStartx + (nodeCountInLeftHalf*2*this.r) + arrowCountInLeftHalf*25 + 100;
            const rightStarty = leftStarty;
            //end of variables related to co-ordinates
            
            //variables related to time

            //after how much seconds of showing the ll to highlight its left half
            const leftHighlightDelayByGrpShow = 1;

            //after how much seconds of highlighting the left half to show the left half separately
            const leftShowDelayByLeftHighlight = 1;

            //after how much seconds of showing the ll to show the left half separately
            const leftShowDelayByGrpShow = leftShowDelayByLeftHighlight + leftHighlightDelayByGrpShow;

            //total time taken by left half from its show till its hiding
            let leftTimeByLeftShow;

            //after how much seconds of hiding of left half to unhighlight it
            const leftUnhighlightDelayByLeftTime = 1;

            //after how much seconds of showing the ll to unhighlight its left half
            let leftUnhighlightDelayByGrpShow; //sum of above three

            //after how much seconds of unhighlighting the left half to highlight the right half
            const rightHighlightDelayByLeftUnhighlight = 0;

            //after how much seconds of showing the ll to highlight the right half
            let rightHighlightDelayByGrpShow; //sum of above two

            //after how much seconds of highlighting the right half to show it separately
            const rightShowDelayByRightHighlight = 1;

            //after how much seconds of showing the ll to show its right half separately
            let rightShowDelayByGrpShow; //sum of above two

            //total time taken by right half from its show till its hiding
            let rightTimeByRightShow;

            //after how much seconds of hiding of right half to unhighlight it
            const rightUnhighlightDelayByRightTime = 1;

            //after how much seconds of showing the ll to unhighlight its right half
            let rightUnhighlightDelayByGrpShow; //sum of above three

            //after how much seconds of unhighlighting the right half to hide the group
            const grpHideDelayByRightUnhighlight = 1;

            //after how much seconds of showing the group to hide the group
            let grpHideDelayByGrpShow; //sum of above two

            //after how much seconds of unhighlighting the right half to start showing the merge animation
            const mergeShowDelayByRightUnhighlight = 1;

            //after how much seconds of showing the group to start showing the merge animation
            let mergeShowDelayByGrpShow;

            //merge animation duration
            const mergeDur = 1;

            //end of variables related to time

            //now adding animation to show this on screen
            let ganim = g.set({
                attributeName: "visibility",
                attributeType: "CSS",
                from: "hidden",
                to:"visible",
                dur: "0.1s",
                fill: "freeze",
                begin: gid.slice(0, -1) + "anim.begin+"+grpShowDelayByParent+"s",
                id: gid + "anim"
            });

            //now adding animation to highlight the left half of linked list
            for(let index = 0; index<nodeCountInLeftHalf; index++)
            {
                let c = new SVGCircle(document.getElementById(circleid+index));
                c.set({
                    attributeName: "fill",
                    from: "deeppink",
                    to: "orangered",
                    dur: "0.1s",
                    fill: "freeze",
                    begin: gid+"anim.begin+"+leftHighlightDelayByGrpShow+"s"
                });
            }

            //now breaking it into two halves
            let lptr = startptr;
            ptr = startptr;
            for(let i = 0; i<(nodeCountInLeftHalf-1); i++)
            {
                ptr = (ptr.next);
            }
            let rptr = ptr.next;
            (ptr.next) = null;

            //sorting the left half
            //it will return an object as follows:
            /*
                {
                    tot_time: (total time to be taken by it to complete all of its animation starting from displaying the group till hiding it),
                    driveranim: (animation element on which all other animations after this call depend),
                    headlink: (the new head),
                    leaves: (SVGGroup array representing the leaves corresponding to the sorted halves)
                }
            */
            let lefthalfanimobj = this.mergeSort(lptr, leftStartx, leftStarty, nodeid+"l", circleid+"l", gid+"l", leftShowDelayByGrpShow);
            let leftleaves = lefthalfanimobj.leaves;

            //calculations
            leftTimeByLeftShow = lefthalfanimobj.tot_time;
            leftUnhighlightDelayByGrpShow = leftUnhighlightDelayByLeftTime + leftTimeByLeftShow + leftShowDelayByGrpShow;
            rightHighlightDelayByGrpShow = rightHighlightDelayByLeftUnhighlight + leftUnhighlightDelayByGrpShow;
            rightShowDelayByGrpShow = rightShowDelayByRightHighlight + rightHighlightDelayByGrpShow;

            //now adding animation to unhighlight the left half
            for(let index = 0; index<nodeCountInLeftHalf; index++)
            {
                let c = new SVGCircle(document.getElementById(circleid+index));
                c.set({
                    attributeName: "fill",
                    from: "orangered",
                    to: "deeppink",
                    dur: "0.1s",
                    fill: "freeze",
                    begin: gid+"anim.begin+"+leftUnhighlightDelayByGrpShow+"s"
                });
            }

            //now adding animation to highlight the right half
            for(let index = nodeCountInLeftHalf; index<nodeCount; index++)
            {
                let c = new SVGCircle(document.getElementById(circleid+index));
                c.set({
                    attributeName: "fill",
                    from: "deeppink",
                    to: "orangered",
                    dur: "0.1s",
                    fill: "freeze",
                    begin: gid+"anim.begin+"+rightHighlightDelayByGrpShow+"s"
                });
            }
            
            //now sorting the right half
            let righthalfanimobj = this.mergeSort(rptr, rightStartx, rightStarty, nodeid+"r", circleid+"r", gid+"r", rightShowDelayByGrpShow);
            let rightleaves = righthalfanimobj.leaves;
            
            //calculations
            rightTimeByRightShow = righthalfanimobj.tot_time;
            rightUnhighlightDelayByGrpShow = rightUnhighlightDelayByRightTime + rightTimeByRightShow + rightShowDelayByGrpShow;
            grpHideDelayByGrpShow = grpHideDelayByRightUnhighlight + rightUnhighlightDelayByGrpShow;
            mergeShowDelayByGrpShow = mergeShowDelayByRightUnhighlight + rightUnhighlightDelayByGrpShow

            //unhighlighting the right half
            for(let index = nodeCountInLeftHalf; index<nodeCount; index++)
            {
                let c = new SVGCircle(document.getElementById(circleid+index));
                c.set({
                    attributeName: "fill",
                    from: "orangered",
                    to: "deeppink",
                    dur: "0.1s",
                    fill: "freeze",
                    begin: gid+"anim.begin+"+rightUnhighlightDelayByGrpShow+"s"
                });
            }

            //now merging the two halves and adding merge animation
            lptr = (lefthalfanimobj.headlink);
            rptr = (righthalfanimobj.headlink);
            let leaves = [];
            let index = 0;
            let leftindex = 0;
            let rightindex = 0;
            let newhead;

            //on which circle to move
            let jispe = document.getElementById(circleid+index);

            //which group to move
            let jisko;
            
            if((lptr.data)<=(rptr.data))
            {
                ptr = lptr;
                newhead = lptr;
                lptr = (lptr.next);

                //which group to move
                jisko = leftleaves[leftindex];
                leaves.push(leftleaves[leftindex++]);
            }
            else
            {
                ptr = rptr;
                newhead = rptr;
                rptr = (rptr.next);

                jisko = rightleaves[rightindex];
                leaves.push(rightleaves[rightindex++]);
            }

            //finding relative co-ords to move group
            let relx = jispe.getAttribute("cx") - jisko.data.querySelector("circle").getAttribute("cx");
            let rely = jispe.getAttribute("cy") - jisko.data.querySelector("circle").getAttribute("cy");

            //merge animation
            jisko.animateTransform({
                attributeName: "transform",
                attributeType: "XML",
                type: "translate",
                // from: "0 0",
                to: `${relx} ${rely}`,
                dur: mergeDur,
                begin: gid+"anim.begin+"+mergeShowDelayByGrpShow+"s",
                fill: "freeze"
            });
            index++;

            while((lptr!=null)&&(rptr!=null))
            {
                jispe = document.getElementById(circleid+index);

                if((lptr.data)<=(rptr.data))
                {
                    (ptr.next) = lptr;
                    ptr = (ptr.next);
                    lptr = (lptr.next);

                    jisko = leftleaves[leftindex];
                    leaves.push(leftleaves[leftindex++]);
                }
                else
                {
                    (ptr.next) = rptr;
                    ptr = (ptr.next);
                    rptr = (rptr.next);

                    jisko = rightleaves[rightindex];
                    leaves.push(rightleaves[rightindex++]);
                }
                //finding relative co-ords to move group
                relx = jispe.getAttribute("cx") - jisko.data.querySelector("circle").getAttribute("cx");
                rely = jispe.getAttribute("cy") - jisko.data.querySelector("circle").getAttribute("cy");

                //merge animation
                jisko.animateTransform({
                    attributeName: "transform",
                    attributeType: "XML",
                    type: "translate",
                    // from: "0 0",
                    to: `${relx} ${rely}`,
                    dur: mergeDur,
                    begin: gid+"anim.begin+"+mergeShowDelayByGrpShow+"s",
                    fill: "freeze"
                });
                index++;
            }
            if(lptr==null)
            {
                (ptr.next) = rptr;

                while(rptr!=null)
                {
                    jispe = document.getElementById(circleid+index);
                    jisko = rightleaves[rightindex];

                    relx = jispe.getAttribute("cx") - jisko.data.querySelector("circle").getAttribute("cx");
                    rely = jispe.getAttribute("cy") - jisko.data.querySelector("circle").getAttribute("cy");

                    jisko.animateTransform({
                        attributeName: "transform",
                        attributeType: "XML",
                        type: "translate",
                        // from: "0 0",
                        to: `${relx} ${rely}`,
                        dur: mergeDur,
                        begin: gid+"anim.begin+"+mergeShowDelayByGrpShow+"s",
                        fill: "freeze"
                    });

                    leaves.push(rightleaves[rightindex++]);
                    index++;

                    rptr = (rptr.next);
                }
            }
            else if(rptr==null)
            {
                (ptr.next) = lptr;
                while(lptr!=null)
                {
                    jispe = document.getElementById(circleid+index);
                    jisko = leftleaves[leftindex];

                    relx = jispe.getAttribute("cx") - jisko.data.querySelector("circle").getAttribute("cx");
                    rely = jispe.getAttribute("cy") - jisko.data.querySelector("circle").getAttribute("cy");

                    jisko.animateTransform({
                        attributeName: "transform",
                        attributeType: "XML",
                        type: "translate",
                        // from: "0 0",
                        to: `${relx} ${rely}`,
                        dur: mergeDur,
                        begin: gid+"anim.begin+"+mergeShowDelayByGrpShow+"s",
                        fill: "freeze"
                    });

                    leaves.push(leftleaves[leftindex++]);
                    index++;

                    lptr = (lptr.next);
                }
            }

            //now hiding the group since its work is done
            // g.set({
            //     attributeName: "display",
            //     attributeType: "CSS",
            //     from: "initial",
            //     to:"none",
            //     dur: "0.1s",
            //     fill: "freeze",
            //     begin: gid+"anim.begin+"+grpHideDelayByGrpShow+"s"
            // });

            //hiding the children since their work is done
            let leftg = new SVGGroup(document.getElementById(gid+"l"));
            let rightg = new SVGGroup(document.getElementById(gid+"r"));

            leftg.set({
                attributeName: "visibility",
                attributeType: "CSS",
                to: "hidden",
                dur: "0.1s",
                fill: "freeze",
                begin: gid+"anim.begin+"+mergeShowDelayByGrpShow+"s"
            });

            rightg.set({
                attributeName: "visibility",
                attributeType: "CSS",
                to: "hidden",
                dur: "0.1s",
                fill: "freeze",
                begin: gid+"anim.begin+"+mergeShowDelayByGrpShow+"s"
            });

            //now returning
            return ({
                tot_time: grpHideDelayByGrpShow,
                driveranim: ganim,
                headlink: newhead,
                leaves: leaves
            });

        }
        else if(startptr!=null)
        {
            //showing the portion of linked list at specified location
            this.show(this.parent, startx, starty, nodeid, circleid, gid, startptr, false);
            
            //getting the group as an object of my class
            let g = new SVGGroup(document.getElementById(gid));

            //first hiding it to synchronize animation
            g.data.setAttribute("visibility", "hidden");

            //now adding animation to show this on screen
            let ganim = g.set({
                attributeName: "visibility",
                attributeType: "CSS",
                from: "hidden",
                to:"visible",
                dur: "0.1s",
                fill: "freeze",
                begin: gid.slice(0, -1) + "anim.begin+"+grpShowDelayByParent+"s",
                id: gid + "anim"
            });

            //now hiding the group since its work is done
            // g.set({
            //     attributeName: "display",
            //     attributeType: "CSS",
            //     from: "initial",
            //     to:"none",
            //     dur: "0.1s",
            //     fill: "freeze",
            //     begin: gid + "anim.begin+1s",
            //     id: gid + "anim"
            // });

            let leaf = new SVGGroup(document.getElementById(nodeid+"0"));

            leaf.set({
                attributeName: "visibility",
                attributeType: "CSS",
                from: "hidden",
                to:"visible",
                dur: "0.1s",
                fill: "freeze",
                begin: gid.slice(0, -1) + "anim.begin+"+grpShowDelayByParent+"s",
                id: gid + "anim"
            });


            //now returning
            return ({
                tot_time: 1,
                driveranim: ganim,
                headlink: startptr,
                leaves: [leaf]
            });
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