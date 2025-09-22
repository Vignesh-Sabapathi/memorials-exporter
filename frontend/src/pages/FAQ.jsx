import React from "react";

const QA = [
  { q: "Do you ship internationally?", a: "Yes, we export worldwide through partner logistics providers." },
  { q: "Can I customize sizes and finishes?", a: "Absolutely. Polished, honed, sandblasted, gold leaf—specify your needs." },
  { q: "Lead time?", a: "Typically 3–6 weeks depending on volume and finish." },
];

export default function FAQ() {
  return (
    <section className="stack">
      <h1>FAQ</h1>
      <div className="stack">
        {QA.map((x, i) => (
          <details className="card" key={i}>
            <summary><strong>{x.q}</strong></summary>
            <p>{x.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
