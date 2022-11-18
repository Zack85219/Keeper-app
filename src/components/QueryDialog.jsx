import React from "react";

function QueryDialog(props) {
  function cancel() {
    props.onCancel(false);
  }

  function del() {
    props.onDelete(true);
  }

  return (
    <div className="dialog">
      <p>Do you want to delete this note forever?</p>
      <div className="choice">
        <button onClick={del}>Delete</button>
        <button onClick={cancel}>Cancel</button>
      </div>
    </div>
  );
}

export default QueryDialog;
