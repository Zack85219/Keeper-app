import React, { useState } from "react";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const [isExpanded, setIsExpanded] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
    if (event.target.name === "content") {
      //console.log(event.target);

      if (event.target.rows >= 3) {
        event.target.addEventListener("input", function () {
          let _this = this;
          _this.style.height = "auto";
          //console.log(_this.scrollHeight);
          _this.style.height = `${_this.scrollHeight}px`;
        });
      }
    }
  }

  function submitNote(event) {
    setIsExpanded(false);
    props.onAdd(note);

    setNote({
      title: "",
      content: "",
    });

    event.preventDefault();
  }

  function stretch() {
    if (!isExpanded && note.title === "" && note.content === "") {
      setIsExpanded(true);
    } else if (isExpanded && note.title === "" && note.content === "") {
      setIsExpanded(false);
    } else if (!isExpanded && note.title !== "" && note.content === "") {
      setIsExpanded(true);
    }
  }

  function enterToTab(event) {
    // console.log(event.keyCode);
    // if (event.keyCode === 13) {
    //   event.preventDefault();
    // }
    let isie = document.all ? true : false;
    let key;
    let srcobj;
    // if the agent is an IE browser, it's easy to do this.
    if (isie) {
      key = event.keyCode;
      srcobj = event.srcElement; //event.srcElement，觸發這個事件的源對象
    } else {
      key = event.which;
      srcobj = event.target;
    }
    if (
      key === 13 &&
      srcobj.type !== "button" &&
      srcobj.type !== "submit" &&
      srcobj.type !== "reset" &&
      srcobj.type !== "textarea" &&
      srcobj.type !== ""
    ) {
      if (isie) event.keyCode = 9; //設置按鍵為tab鍵
      else {
        let el = getNextElement(event.target);

        if (
          el.type !== "hidden" //nothing to do here.
        );
        else while (el.type === "hidden") el = getNextElement(el);
        if (!el) return false;
        else {
          event.preventDefault();
          el.focus();
        }
      }
    }
  }

  function getNextElement(field) {
    let form = field.form;
    let e;
    for (e = 0; e < form.elements.length; e++) {
      if (field === form.elements[e]) break;
    }

    return form.elements[++e % form.elements.length];
  }

  return (
    <div onClick={stretch}>
      <form className="create-note">
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
          onKeyDown={enterToTab}
        />
        {isExpanded && (
          <textarea
            name="content"
            onChange={handleChange}
            value={note.content}
            placeholder="Take a note..."
            rows={isExpanded ? 3 : null}
          />
        )}

        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <ControlPointIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
