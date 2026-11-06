import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ACROSS_ROLES, ERAS } from "@/components/chad-mapped/groups";
import Navigation from "@/components/Navigation";
import { MindMap } from "@/components/chad-mapped/MindMap";
import { PublicDetail, publicIntro } from "@/components/chad-mapped/PublicDetail";
import type { PublicData } from "@/components/chad-mapped/types";
import publicData from "../../data/chad-mapped.json";

const data = publicData as PublicData;

/** Links from the home page land on a role (?role=Etsy) or a theme (?theme=Growing designers). */
const useStartingPoint = () => {
  const [params] = useSearchParams();
  const role = params.get("role");
  const theme = params.get("theme");
  if (role && (role === ACROSS_ROLES || ERAS.some((e) => e.key === role))) return { view: "career" as const, group: role };
  if (theme && data.themes.includes(theme)) return { view: "theme" as const, group: theme };
  return { view: "career" as const, group: null };
};

const ChadMapped = () => {
  const start = useStartingPoint();
  useEffect(() => {
    document.title = "Chad, mapped — Chad Mortensen";
  }, []);

  return (
    <>
      <Navigation />
      <main id="main-content">
        <MindMap
          nodes={data.nodes}
          initialView={start.view}
          initialGroup={start.group}
          themes={data.themes}
          title="Chad, mapped"
          subtitle="30 years in design, 14 leading teams, told through the stories behind the work."
          note={<p className="cm-note">This started as an experiment. I add stories as I write them, so expect it to grow and change.</p>}
          intro={publicIntro(data.nodes.length)}
          empty={<p className="cm-muted">Stories are on their way. Check back soon.</p>}
          renderDetail={(node, related, select) => <PublicDetail node={node} related={related} select={select} />}
        />
      </main>
    </>
  );
};

export default ChadMapped;
