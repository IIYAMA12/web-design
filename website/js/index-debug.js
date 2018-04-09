(function() {

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
        },
        end: function (e) {
            console.log("end");
            
            e.target.classList.remove("dragged");
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
            console.log("drop");
            
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

})();


window.addEventListener("load", function () {
    // https://api.themoviedb.org/3/movie/550?api_key=91e0bf2847df0304e6f6dc4be0546cf2
});