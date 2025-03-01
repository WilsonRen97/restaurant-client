import Avatar from "boring-avatars";
import { CommentCollection } from "../interfaces/comment-interface";

const CommentComponent: React.FC<CommentCollection> = ({ comments }) => {
  return (
    <div style={{ fontFamily: "Inter" }}>
      <h4 className="mb-4">Tasters' Thoughts</h4>
      {comments.length > 0 ? (
        <div className="d-flex flex-wrap">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="p-3"
              style={{
                width: "calc(33.333% - 20px)",
                margin: "10px",
                backgroundColor: "#f9f9f9",
                borderRadius: "10px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              }}
            >
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
