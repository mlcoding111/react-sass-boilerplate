import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_auth/client/files/$/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { _splat } = Route.useParams();
  const [filePath, setFilePath] = useState(_splat);

  return (
    <>
      <input
        type="text"
        value={filePath}
        onChange={(e) => setFilePath(e.target.value)}
      />
      <Link className="button" to={`/client/files/$`}>
        Go to File
      </Link>
      {_splat ? (
        <h2 className="title">File: {_splat}</h2>
      ) : (
        <h2 className="title">No file selected</h2>
      )}
    </>
  );
}
