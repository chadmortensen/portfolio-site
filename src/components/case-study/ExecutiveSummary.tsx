type ExecutiveSummaryProps = {
  overview: string;
  contribution: string;
  scope: string;
  outcome: string;
};

export const ExecutiveSummary = ({ overview, contribution, scope, outcome }: ExecutiveSummaryProps) => (
  <section aria-labelledby="executive-summary-heading" className="mb-16 border-b border-swiss-light pb-24">
    <h2 id="executive-summary-heading" className="text-title2 text-text-primary">At a glance</h2>
    <p className="mt-5 max-w-4xl text-xl leading-relaxed text-text-primary">{overview}</p>
    <dl className="mt-8 grid gap-6 md:grid-cols-3">
      {[['My contribution', contribution], ['Scope', scope], ['Outcome', outcome]].map(([label, value]) => (
        <div key={label}>
          <dt className="mb-2 text-base font-medium text-text-primary">{label}</dt>
          <dd className="text-base leading-relaxed text-text-secondary">{value}</dd>
        </div>
      ))}
    </dl>
  </section>
);
