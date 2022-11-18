import React, { useState } from "react";
import Header from "./Header";
import Note from "./Note";
import CreateArea from "./CreateArea";
import LightbulbIcon from "@mui/icons-material/LightbulbOutlined";
import NotificationsIcon from "@mui/icons-material/NotificationsOutlined";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import ArchiveIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import BackgroundImg from "./BackgroundImg";
import DeleteArea from "./DeleteArea";
import QueryDialog from "./QueryDialog";

function App() {
  const [notes, setNotes] = useState([]);
  const [dNotes, setDnotes] = useState([]);
  const [itemBack, setItemback] = useState([]);
  const [dialogOpen, setDialog] = useState(false);
  const [noteID, setNoteID] = useState([]);
  const [overlayAll, setOverlay] = useState(false);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  function noteToBin(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return id !== index;
      });
    });

    setDnotes((prevNotes) => {
      return [
        ...prevNotes,
        notes.filter((noteItem, index) => {
          return id === index;
        }),
      ];
    });
  }

  function confirmDel(id) {
    setDialog(true);
    setNoteID(id);
    setOverlay(true);
  }

  function dialogControl(oc) {
    if (!oc) {
      setDialog(false);
      setOverlay(false);
    }
    if (oc) {
      setDnotes((prevNotes) => {
        return prevNotes.filter((noteItem, index) => {
          return index !== noteID;
        });
      });
      setDialog(false);
      setOverlay(false);
    }
    return;
  }

  function selectEffect() {
    const items = document.querySelector(".items");
    let itemNoSelected = document.querySelectorAll(".item");

    items.addEventListener("click", function (e) {
      const clicked = e.target.closest(".item");
      if (!clicked) return;
      itemNoSelected.forEach((el) => {
        el.classList.remove("item--active");
        el.style.backgroundColor = "";
      });

      clicked.classList.add("item--active");
      clicked.style.backgroundColor = "#dcffe4";

      setItemback(clicked.innerText);
    });
  }

  function ContentChanged(props) {
    const itemSelected = props.page;

    if (itemSelected === "Notes") {
      return (
        <div className="right-col">
          <div className="create-area">
            <CreateArea onAdd={addNote} />
          </div>
          <div className="note-area">
            {notes.map((noteItem, index) => {
              return (
                <Note
                  key={index}
                  id={index}
                  title={noteItem.title}
                  content={noteItem.content}
                  onDelete={noteToBin}
                />
              );
            })}
          </div>
        </div>
      );
    } else if (itemSelected === "Recycle bin") {
      return (
        <div className="right-col">
          <DeleteArea
            noteDeleted={dNotes.map((noteItem) => {
              return noteItem.map((note, index) => {
                return (
                  <Note
                    key={index}
                    id={index}
                    title={note.title}
                    content={note.content}
                    onDelete={confirmDel}
                  />
                );
              });
            })}
          />
          {dialogOpen ? (
            <QueryDialog onCancel={dialogControl} onDelete={dialogControl} />
          ) : null}
        </div>
      );
    } else if (itemSelected === "Reminder") {
      return;
    } else if (itemSelected === "Edit tag") {
      return;
    } else if (itemSelected === "Archive") {
      return;
    } else {
      return (
        <div className="right-col">
          <div className="create-area">
            <CreateArea onAdd={addNote} />
          </div>
          <div className="note-area">
            {notes.map((noteItem, index) => {
              return (
                <Note
                  key={index}
                  id={index}
                  title={noteItem.title}
                  content={noteItem.content}
                  onDelete={noteToBin}
                />
              );
            })}
          </div>
        </div>
      );
    }
  }

  function BackChanged(props) {
    const itemText = props.itemSelected;

    // console.log("B: " + itemBack, "T: " + itemText);

    if (itemText === "Notes") {
      return (
        <LightbulbIcon
          sx={{
            width: 120,
            height: 120,
            color: "#000",
          }}
        />
      );
    }

    if (itemText === "Reminder") {
      return (
        <NotificationsIcon
          sx={{
            width: 120,
            height: 120,
            color: "#000",
          }}
        />
      );
    }

    if (itemText === "Edit tag") {
      return (
        <ModeEditOutlineIcon
          sx={{
            width: 120,
            height: 120,
            color: "#000",
          }}
        />
      );
    }

    if (itemText === "Archive") {
      return (
        <ArchiveIcon
          sx={{
            width: 120,
            height: 120,
            color: "#000",
          }}
        />
      );
    }

    if (itemText === "Recycle bin") {
      return (
        <DeleteIcon
          sx={{
            width: 120,
            height: 120,
            color: "#000",
          }}
        />
      );
    }

    return (
      <LightbulbIcon
        sx={{
          width: 120,
          height: 120,
          color: "#000",
        }}
      />
    );
  }
  function Overlay() {
    return <div className="overlay"></div>;
  }

  return (
    <div>
      <Header />

      <div className="left-col">
        <div className="items" onClick={selectEffect}>
          <div className="item item--active">
            <LightbulbIcon />
            <span>Notes</span>
          </div>
          <div className="item">
            <NotificationsIcon />
            <span>Reminder</span>
          </div>
          <div className="item">
            <ModeEditOutlineIcon />
            <span>Edit tag</span>
          </div>
          <div className="item">
            <ArchiveIcon />
            <span>Archive</span>
          </div>
          <div className="item">
            <DeleteIcon />
            <span>Recycle bin</span>
          </div>
        </div>
      </div>
      <ContentChanged page={itemBack} />
      {overlayAll ? <Overlay /> : null}
      <BackgroundImg backImg={<BackChanged itemSelected={itemBack} />} />
    </div>
  );
}

export default App;
