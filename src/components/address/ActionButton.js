import { Fragment, useContext } from "react";
import Button from "react-bootstrap/Button";;


function ActionButtons({id, onClick}) {
  const onFindPost = (id) => {
    console.log(id);
  }
  const onDeletePost = (id) => {}

  return (
    <Fragment>
      <Button className="post-button" onClick={() => onFindPost(id)}>
        Edit
        {/* <img src={editIcon} alt="edit" width="24" height="24" /> */}
      </Button>

      <Button className="post-button" onClick={() => onDeletePost(id)}>
        delete
        {/* <img src={deleteIcon} alt="delete" width="24" height="24" /> */}
      </Button>
    </Fragment>
  );
}

export default ActionButtons;
