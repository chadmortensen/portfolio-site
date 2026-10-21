import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { MindMap, RelatedList } from "@/components/chad-mapped/MindMap";
import type { PrivateNode, PublicData } from "@/components/chad-mapped/types";
import { nodeMeta } from "@/components/chad-mapped/types";
import { PublicDetail, publicIntro } from "@/components/chad-mapped/PublicDetail";

type EditorData = { nodes: PrivateNode[]; publicData: PublicData; themes: string[] };
type Update = { id: string; publish?: PrivateNode["publish"]; publicSummary?: string; publicResult?: string };

const api = async (init?: RequestInit): Promise<EditorData> => {
  const response = await fetch("/__chad-mapped", init);
  if (!response.ok) throw new Error(await response.text());
  return response.json();
};

function PublishingForm({ node, onSave }: { node: PrivateNode; onSave: (update: Update) => Promise<void> }) {
  const [summary, setSummary] = useState(node.publicSummary);
  const [result, setResult] = useState(node.publicResult);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ text: string; error?: boolean } | null>(null);
  const live = node.publish === "approved";
  const dirty = summary !== node.publicSummary || result !== node.publicResult;

  const run = async (update: Omit<Update, "id">, done: string) => {
    setBusy(true);
    setMessage(null);
    try {
      await onSave({ id: node.id, ...update });
      setMessage({ text: done });
    } catch (error) {
      setMessage({ text: error instanceof Error ? error.message : "Couldn’t save that change.", error: true });
    } finally {
      setBusy(false);
    }
  };

  if (!node.publishable) {
    return <p className="cm-editor-box cm-muted">Private only. Only stories and practices can go on the public map.</p>;
  }

  return (
    <div className="cm-editor-box">
      <div className="cm-editor-head">
        <h3>Public version</h3>
        <span className={`cm-pill${live ? " is-live" : ""}`}>{live ? "Published" : node.publish === "private" ? "Private" : "Draft"}</span>
      </div>
      <label htmlFor="cm-summary">Summary for hiring managers</label>
      <textarea id="cm-summary" rows={4} value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Two or three sentences: the situation, what you did, why it mattered." />
      <label htmlFor="cm-result">One-line result</label>
      <input id="cm-result" value={result} onChange={(e) => setResult(e.target.value)} placeholder="e.g. Quality registry creations rose 28% year over year." />
      <div className="cm-editor-actions">
        <button type="button" className="cm-btn" disabled={busy || !dirty} onClick={() => run({ publicSummary: summary, publicResult: result }, "Saved to the markdown file.")}>
          Save text
        </button>
        {live ? (
          <button type="button" className="cm-btn" disabled={busy} onClick={() => run({ publish: "draft", publicSummary: summary, publicResult: result }, "Moved back to draft. It’s off the public map.")}>
            Unpublish
          </button>
        ) : (
          <button type="button" className="cm-btn is-primary" disabled={busy || !summary.trim()} onClick={() => run({ publish: "approved", publicSummary: summary, publicResult: result }, "Published. It’s now in data/chad-mapped.json.")}>
            Publish
          </button>
        )}
      </div>
      {!live && !summary.trim() && <p className="cm-muted cm-small">Write a summary to publish this.</p>}
      {message && <p className={`cm-small${message.error ? " cm-error" : ""}`} role="status">{message.text}</p>}
    </div>
  );
}

function PrivateDetail({ node, related, select, onSave }: { node: PrivateNode; related: PrivateNode[]; select: (id: string) => void; onSave: (u: Update) => Promise<void> }) {
  return (
    <>
      <p className="cm-eyebrow">{nodeMeta(node)}</p>
      <h2>{node.title}</h2>
      {node.role && <p className="cm-muted">{node.role}</p>}
      <PublishingForm key={`${node.id}:${node.publish}:${node.publicSummary}:${node.publicResult}`} node={node} onSave={onSave} />
      {node.summary && <p>{node.summary}</p>}
      {node.lesson && <p className="cm-lesson">{node.lesson}</p>}
      {node.outcomes.length > 0 && (<div><h3>Outcomes</h3><ul>{node.outcomes.map((o) => <li key={o}>{o}</li>)}</ul></div>)}
      {node.metrics.length > 0 && (<div><h3>Metrics</h3><ul>{node.metrics.map((o) => <li key={o}>{o}</li>)}</ul></div>)}
      {node.answers.length > 0 && (<div><h3>Answers</h3><ul>{node.answers.map((a) => <li key={a}>{a}</li>)}</ul></div>)}
      <div><h3>Themes</h3><div className="cm-tags">{node.themes.map((t) => <span key={t} className="cm-tag">{t}</span>)}</div></div>
      {node.competencies.length > 0 && (<div><h3>Competencies</h3><div className="cm-tags">{node.competencies.map((c) => <span key={c} className="cm-tag">{c.replace(/-/g, " ")}</span>)}</div></div>)}
      <RelatedList related={related} select={select} />
      <div className="cm-editor-box cm-house">
        <h3>Housekeeping</h3>
        <dl>
          <dt>Status</dt><dd>{node.status || "—"}</dd>
          <dt>Confidence</dt><dd>{node.confidence || "—"}</dd>
          <dt>File</dt><dd className="cm-mono">{node.id}</dd>
        </dl>
        {node.gaps.length > 0 && (<div><h3>Open gaps</h3><ul>{node.gaps.map((g) => <li key={g}>{g}</li>)}</ul></div>)}
        {node.sources.length > 0 && (<div><h3>Sources</h3><ul>{node.sources.map((s) => <li key={s}>{s}</li>)}</ul></div>)}
      </div>
    </>
  );
}

const ChadMappedEditor = () => {
  const [data, setData] = useState<EditorData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<"private" | "public">("private");

  useEffect(() => {
    document.title = "Chad, mapped (editor) — Chad Mortensen";
    api().then(setData).catch((e) => setError(e instanceof Error ? e.message : String(e)));
  }, []);

  const save = async (update: Update) => {
    setData(await api({ method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(update) }));
  };

  if (error || !data) {
    return (
      <>
        <Navigation />
        <main id="main-content" className="chad-mapped">
          <div className="cm-card cm-top">
            <h1>Chad, mapped</h1>
            <p className="cm-sub">{error ? `Couldn’t load the knowledge graph: ${error}` : "Loading the knowledge graph…"}</p>
          </div>
        </main>
      </>
    );
  }

  const publishable = data.nodes.filter((n) => n.publishable);
  const live = publishable.filter((n) => n.publish === "approved").length;
  const controls = (
    <div className="cm-seg" role="group" aria-label="Audience">
      <button type="button" aria-pressed={view === "public"} onClick={() => setView("public")}>Public</button>
      <button type="button" aria-pressed={view === "private"} onClick={() => setView("private")}>Private</button>
    </div>
  );
  const note = (
    <p className="cm-note">
      <b>Local editor.</b> {live} of {publishable.length} stories and practices are published.{" "}
      {view === "public" ? "This is exactly what uxtips.com/chad-mapped will show." : "Everything in the repo, including drafts, gaps and sources."}
    </p>
  );

  return (
    <>
      <Navigation />
      <main id="main-content">
        {view === "public" ? (
          <MindMap
            key="public"
            nodes={data.publicData.nodes}
            themes={data.publicData.themes}
            title="Chad, mapped"
            subtitle="Thirty years of design leadership, organized by the themes that run through it."
            controls={controls}
            note={note}
            intro={publicIntro(data.publicData.nodes.length)}
            empty={<p className="cm-muted">Nothing is published yet. Switch to Private, open a story and publish it.</p>}
            renderDetail={(node, related, select) => <PublicDetail node={node} related={related} select={select} />}
          />
        ) : (
          <MindMap
            key="private"
            showEmptyEras
            nodes={data.nodes}
            themes={data.themes}
            title="Chad, mapped"
            subtitle="Private view of the personal knowledge graph."
            controls={controls}
            note={note}
            intro={<><p className="cm-eyebrow">Editing</p><p>Open a story or practice to write its public summary and publish it. Changes save straight to the markdown file.</p></>}
            renderDetail={(node, related, select) => <PrivateDetail node={node} related={related} select={select} onSave={save} />}
          />
        )}
      </main>
    </>
  );
};

export default ChadMappedEditor;
