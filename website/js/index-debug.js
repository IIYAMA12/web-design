const handleDrag = (function() {

    const handleDrag = {
        init: function () {
            const draggableContent = document.querySelectorAll("[draggable=true]");
            for (let index = 0; index < draggableContent.length; index++) {
                const element = draggableContent[index];
                this.setListenersForItem(element);
            }
            const draggableContentLists = document.querySelectorAll("ul");
            for (let index = 0; index < draggableContentLists.length; index++) {
                const element = draggableContentLists[index];
                
                element.addEventListener("dragover", this.dragOver, false);
                element.addEventListener("dragleave", this.dragLeave, false);

                element.addEventListener("drop", this.drop, false);
            }
            // https://stackoverflow.com/questions/12332403/html5-ul-li-draggable
        },
        setListenersForItem: function (element) {
            element.addEventListener("dragstart", this.start, false);
            element.addEventListener("dragend", this.end, false);
        },
        start: function (e) {
            console.log("start");
            
            e.dataTransfer.effectAllowed = 'copy';
            e.target.classList.add("dragged");
            // console.log(e.target.parentElement.id);
            
            e.dataTransfer.setData("text/plain", e.target.parentElement.id);

            document.getElementsByTagName("body")[0].classList.add("dragging-enabled");
        },
        end: function (e) {
            console.log("end");
            
            e.target.classList.remove("dragged");
            document.getElementsByTagName("body")[0].classList.remove("dragging-enabled");
        },
        dragOver: function (e) {
            
            console.log("over", e.target);
            const listItemParentElement = document.getElementById(e.dataTransfer.getData("text/plain"));
            if (listItemParentElement == e.target) {
                e.dataTransfer.dropEffect = "none";
            } else {
                if (e.target.classList.contains("drag-copy")) {
                    e.dataTransfer.dropEffect = "copy";
                } else if (e.target.classList.contains("drag-move")) {
                    e.dataTransfer.dropEffect = "move";
                } else if (e.target.classList.contains("drag-delete")) {
                    e.dataTransfer.dropEffect = "copy"; // move doesn't work
                }
            }
            e.preventDefault();
            return false;        
        },
        dragLeave: function (e) {
            console.log("leave");
            
            // this.className = '';
        },
        drop: function (e) {
            
            if (e.stopPropagation) e.stopPropagation();
            
            const listItemParentElement = document.getElementById(e.dataTransfer.getData("text/plain"));
            if (listItemParentElement != e.target) {
                const listItem = listItemParentElement.getElementsByClassName("dragged")[0];
                if (e.target.classList.contains("drag-move")) {
                    e.target.appendChild(listItem);
                } else if (e.target.classList.contains("drag-copy")) {
                    const copy = listItem.cloneNode(true);
                    copy.classList.remove("dragged");
                    setTimeout(function (){
                        handleDrag.setListenersForItem(copy);
                    });
                    
                    e.target.appendChild(copy);
                } else if (e.target.classList.contains("drag-delete")) {
                    listItem.parentElement.removeChild(listItem);
                }
                // el.parentNode.removeChild(el);  
            }
            e.preventDefault();    
            return false;
  
        }
        // https://html5demos.com/drag/#view-source
    };

    handleDrag.init();
    return handleDrag;
})();


window.addEventListener("load", function () {
    const template = [
        {
            content: function (data) {
                const itemsWithData = [];
                for (let i = 0; i < data.length; i++) {
                    const newElement = document.createElement("li");
                    newElement.setAttribute("draggable", "true")
                    itemsWithData[itemsWithData.length] = {element: newElement, data: data[i] }
                    handleDrag.setListenersForItem(newElement);
                }
                return itemsWithData;
            },
            type: "function",
            children: [
                {
                    content: "h3",
                    type: "tag",
                    child: {
                        type: "function",
                        content: function (data, parent) {
                            parent.textContent = data.title;
                            
                        }
                    }
                },
                {
                    content: "img",
                    type: "tag",
                    child: {
                        type: "function",
                        content: function (data, parent) {
                            parent.src = "http://image.tmdb.org/t/p/w185/" + data.poster_path;
                            parent.alt = data.title;
                        }
                    }
                }
            ]
        }
    ];
    
    fetch("https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=91e0bf2847df0304e6f6dc4be0546cf2")
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        console.log(myJson);
        console.log("templateEngine", templateEngine, myJson);
        
        templateEngine.render(template, document.getElementById("shop-list"), myJson.results);
    }).catch(function (error) {
        console.log(error);
    });
    // https://api.themoviedb.org/3/movie/550?api_key=91e0bf2847df0304e6f6dc4be0546cf2
});
// /discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22