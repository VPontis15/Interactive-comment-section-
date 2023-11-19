import { useAppContext } from "../../Context/AppContext";

function EditComment({ reply, id }) {
  const { edit, id } = useAppContext();
  console.log(id);
  return <div></div>;
}

export default EditComment;
