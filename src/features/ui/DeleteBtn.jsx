import { useAppContext } from "../../Context/AppContext";

function DeleteBtn({ id, entityType }) {
  const { dispatch, comments } = useAppContext();
  return (
    <button
      onClick={() =>
        dispatch({
          type: "deleteComment",
          payload: { id: id, entityType: entityType },
        })
      }
    >
      Delete
    </button>
  );
}

export default DeleteBtn;
