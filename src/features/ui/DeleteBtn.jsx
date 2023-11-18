import { useAppContext } from "../../Context/AppContext";

function DeleteBtn({ id }) {
  const { dispatch } = useAppContext();
  return (
    <button
      onClick={() =>
        dispatch({
          type: "deleteReply",
          payload: id,
        })
      }
    >
      Delete
    </button>
  );
}

export default DeleteBtn;
