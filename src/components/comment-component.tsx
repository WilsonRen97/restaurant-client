import Avatar from "boring-avatars";
import { CommentCollection } from "../interfaces/comment-interface";
import "../styles/style.css";

const CommentComponent: React.FC<CommentCollection> = ({ comments }) => {
  return (
    <div style={{ fontFamily: "Inter" }}>
      <h4 className="mb-4">Tasters' Thoughts</h4>
      {comments.length > 0 ? (
        <div className="comment-container">
          {comments.map((comment) => (
            <div key={comment._id} className="p-3 comment-element">
              <div
                className="d-flex"
                style={{
                  alignItems: "flex-start",
                  gap: "15px",
                }}
              >
                {/* Avatar Section */}
                <div
                  style={{
                    flex: "0 0 20%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar name={comment.createdBy.username} size={55} />
                </div>

                {/* Comment Details Section */}
                <div style={{ flex: "1" }}>
                  <div
                    className="d-flex justify-content-between"
                    style={{ marginBottom: "5px" }}
                  >
                    <strong
                      style={{
                        color: "#333",
                        fontSize: "1rem",
                      }}
                    >
                      {comment.createdBy?.username || "Anonymous"}
                    </strong>
                    <small style={{ color: "#999" }}>
                      {new Date(comment.date).toLocaleDateString()}
                    </small>
                  </div>
                  <p
                    style={{
                      color: "#555",
                      fontSize: "0.9rem",
                      wordBreak: "break-word",
                    }}
                  >
                    {comment.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "#777" }}>
          No taster comments yet. Be the first to leave one!
        </p>
      )}
    </div>
  );
};

export default CommentComponent;
