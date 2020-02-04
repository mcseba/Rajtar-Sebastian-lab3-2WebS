(function () {
    'use strict';

    var draggedEl,
        onDragStart,
        onDrag,
        onDragEnd,
        grabPointY,
        grabPointX,
        createNote,
        addNoteBtnEl,
        getNoteObject,
        init,
        testLocalStorage,
        saveNote,
        deleteNote,
        loadNotes,
        onAddNoteButtonClick;
    
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

    createNote = function (options) {
      var stickerEl = document.createElement('div'),
          barEl = document.createElement('div'),
          deleteBtnEl = document.createElement('button'),
          saveBtnEl = document.createElement('button'),
          textareaEl = document.createElement('textarea'),
          chooseColorEl = document.createElement('input'),
          onDelete,
          onSave,
          changeColor,
          noteConfig = options || {
            content: '',
            id: "sticker_" + new Date().getTime(),
            transformCSSValue: "translateX(" + Math.random() * 400 + "px) translateY(" + Math.random() * 400 + "px)",
          };

      onDelete = function () {    
        deleteNote (
          getNoteObject(stickerEl)
        );

        document.body.removeChild(stickerEl);
      };

      onSave = function () {
        saveNote(getNoteObject(stickerEl));
      };

      changeColor = function() {
        stickerEl.style.borderColor = barEl.querySelector('.chooseColor').value;
      };

      stickerEl.style.transform = noteConfig.transformCSSValue; 
      stickerEl.id = noteConfig.id;
      textareaEl.value = noteConfig.content;

      chooseColorEl.addEventListener('change', changeColor);
      
      barEl.classList.add('bar');
      stickerEl.classList.add('sticker');

      chooseColorEl.classList.add('chooseColor');
      chooseColorEl.type = 'color';

      deleteBtnEl.classList.add('deleteButton');
      deleteBtnEl.addEventListener('click', onDelete, false);

      saveBtnEl.classList.add('saveButton');
      saveBtnEl.addEventListener('click', onSave);
      
      barEl.appendChild(deleteBtnEl);
      barEl.appendChild(chooseColorEl);
      barEl.appendChild(saveBtnEl);
      stickerEl.appendChild(barEl);
      stickerEl.appendChild(textareaEl); 
      
      stickerEl.addEventListener('mousedown', onDragStart, false);
      
      document.body.appendChild(stickerEl);
    };

    onAddNoteButtonClick = function() {
      createNote();
    }
    
    testLocalStorage = function() {
      var bla = "bla";
      try
      {
        localStorage.setItem(bla, bla);
        localStorage.removeItem(bla);
        return true;
      } catch(e)
      {
        return false;
      }
    };

    init = function () {
    
      if (!testLocalStorage) {
        var message = "Nie mozesz uzywac localstorage";
        saveNote = function () {
          console.warn(message);
        };
        
        deleteNote = function () {
          console.warn(message);
        };
      } else {
        saveNote = function (note) {
          localStorage.setItem(note.id, JSON.stringify(note));
        };
  
        deleteNote = function (note) {
          localStorage.removeItem(note.id);
        };
  
        loadNotes = function () {
          for(var i = 0; i < localStorage.length; i++) {
            var noteObject = JSON.parse(
              localStorage.getItem(
                localStorage.key(i)
              )
            );
            createNote(noteObject);
          };
        };
        loadNotes();      
      }
  
      addNoteBtnEl = document.querySelector('.addNoteBtn');
      addNoteBtnEl.addEventListener('click', onAddNoteButtonClick, false);
      document.addEventListener('mousemove', onDrag, false);
      document.addEventListener('mouseup', onDragEnd, false);
    };
    
    init();

  })();
