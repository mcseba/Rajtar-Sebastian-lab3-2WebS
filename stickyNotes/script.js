(function () {

    var draggedEl,
        onDragStart,
        onDrag,
        onDragEnd,
        grabPointY,
        grabPointX,
        createNote,
        addNoteBtnEl,
        deleteNote,
        getNoteObject;
    
    onDragStart = function (ev) {
      var boundingClientRect;
      if (ev.target.className.indexOf('bar') === -1) {
        return;
      }
      
      draggedEl = this;
      
      boundingClientRect = draggedEl.getBoundingClientRect();
      
      grabPointY = boundingClientRect.top - ev.clientY;
      grabPointX = boundingClientRect.left - ev.clientX;
    };
    
    onDrag = function (ev) {
      if (!draggedEl) {
        return;
      }
      
      var posX = ev.clientX + grabPointX,
          posY = ev.clientY + grabPointY;
           
      draggedEl.style.transform = "translateX(" + posX + "px) translateY(" + posY + "px)";
    };
    
    onDragEnd = function () { 
      draggedEl = null;
      grabPointX = null;
      grabPointY = null;
    };

    getNoteObject = function (el) {
        var textarea = el.querySelector('textarea');
        return {
          transformCSSValue: el.style.transform,
          content: textarea.value,
          id: el.id,
          textarea: {
            width: textarea.style.width,
            height: textarea.style.height,
          }
        };
      };
    
    createNote = function () {
      var stickerEl = document.createElement('div'),
          barEl = document.createElement('div'),
          deleteBtnEl = document.createElement('button'),
          textareaEl = document.createElement('textarea'),
          onDelete;

      onDelete = function () {
        
        getNoteObject(stickerEl);
      
        document.body.removeChild(stickerEl);
      };
      
      var transformCSSValue = "translateX(" + Math.random() * 400 + "px) translateY(" + Math.random() * 400 + "px)";
      
      stickerEl.style.transform = transformCSSValue; 
      
      barEl.classList.add('bar');
      stickerEl.classList.add('sticker');

      deleteBtnEl.classList.add('deleteButton');
      deleteBtnEl.addEventListener('click', onDelete);
      
      barEl.appendChild(deleteBtnEl);
      stickerEl.appendChild(barEl);
      stickerEl.appendChild(textareaEl); 
      
      stickerEl.addEventListener('mousedown', onDragStart, false);
      
      document.body.appendChild(stickerEl);
    };
    
    createNote(); 
    
    addNoteBtnEl = document.querySelector('.addNoteBtn');
    addNoteBtnEl.addEventListener('click', createNote, false);
    document.addEventListener('mousemove', onDrag, false);
    document.addEventListener('mouseup', onDragEnd, false);
  })();