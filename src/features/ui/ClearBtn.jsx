import { useAppContext } from "../../Context/AppContext";

function ClearBtn() {
  const { setComment } = useAppContext();
  return <button onClick={() => setComment("")}>Clear</button>;
}

export default ClearBtn;
