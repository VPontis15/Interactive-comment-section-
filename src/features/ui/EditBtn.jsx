import { useAppContext } from "../../Context/AppContext";

function EditBtn({ id }) {
  const { dispatch, isEditing } = useAppContext();

  return (
    <button
      onClick={() => {
        console.log(id, isEditing);
        {
          dispatch({ type: "editCommentBtn", payload: id });
        }
      }}
    >
      Edit
    </button>
  );
}

export default EditBtn;
