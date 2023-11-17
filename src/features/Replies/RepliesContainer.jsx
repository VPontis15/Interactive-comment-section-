function RepliesContainer({ children }) {
  return (
    <ul style={{ display: "flex" }}>
      <div style={{ width: "1px", backgroundColor: "#e3e3e3" }}></div>

      <div> {children}</div>
    </ul>
  );
}

export default RepliesContainer;
