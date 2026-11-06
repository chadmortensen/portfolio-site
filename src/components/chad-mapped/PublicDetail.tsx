import type { View } from "./groups";
import { RelatedList } from "./MindMap";
import { nodeMeta, type PublicNode } from "./types";

export function PublicDetail({ node, related, select }: { node: PublicNode; related: PublicNode[]; select: (id: string) => void }) {
  return (
    <>
      <p className="cm-eyebrow">{nodeMeta(node)}</p>
      <h2>{node.title}</h2>
      {node.role && <p className="cm-muted">{node.role}</p>}
      {node.summary && <p>{node.summary}</p>}
      {node.result && (
        <div>
          <h3>Result</h3>
          <p>{node.result}</p>
        </div>
      )}
      {node.answers.length > 0 && (
        <div>
          <h3>A good answer to</h3>
          <ul>{node.answers.map((a) => <li key={a}>{a}</li>)}</ul>
        </div>
      )}
      <div>
        <h3>Themes</h3>
        <div className="cm-tags">{node.themes.map((t) => <span key={t} className="cm-tag">{t}</span>)}</div>
      </div>
      <RelatedList related={related} select={select} />
    </>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const publicIntro = (count: number) => (view: View) => {
  const stories = `${count} ${count === 1 ? "story" : "stories"}`;
  return (
    <>
      <p className="cm-eyebrow">How to read this</p>
      {view === "career" ? (
        <p>My roles run left to right, oldest first, with {stories} branching off them. Pick a role or a story to read it, and scroll or drag to move along.</p>
      ) : (
        <p>
          Each branch is a theme that runs through my work, with {stories} beneath. Pick a theme or a story to read
          it, and drag to move around.
        </p>
      )}
    </>
  );
};
