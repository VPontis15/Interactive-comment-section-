function RepliesContainer({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "1px", backgroundColor: "#e3e3e3" }}></div>

      <ul> {children}</ul>
    </div>
  );
}

export default RepliesContainer;
