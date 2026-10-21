import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import { MindMap } from "@/components/chad-mapped/MindMap";
import { PublicDetail, publicIntro } from "@/components/chad-mapped/PublicDetail";
import type { PublicData } from "@/components/chad-mapped/types";
import publicData from "../../data/chad-mapped.json";

const data = publicData as PublicData;

const ChadMapped = () => {
  useEffect(() => {
    document.title = "Chad, mapped — Chad Mortensen";
  }, []);

  return (
    <>
      <Navigation />
      <main id="main-content">
        <MindMap
          nodes={data.nodes}
          themes={data.themes}
          title="Chad, mapped"
          subtitle="Thirty years of design leadership, organized by the themes that run through it."
          intro={publicIntro(data.nodes.length)}
          empty={<p className="cm-muted">Stories are on their way. Check back soon.</p>}
          renderDetail={(node, related, select) => <PublicDetail node={node} related={related} select={select} />}
        />
      </main>
    </>
  );
};

export default ChadMapped;
