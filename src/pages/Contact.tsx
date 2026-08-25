import { useState } from 'react';

const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

export function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [touched, setTouched] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const ready = name.trim().length > 0 && /.+@.+\..+/.test(email) && msg.trim().length > 3;
  const formHint = touched && !ready ? 'Name, a real email, and a sentence.' : 'Goes straight to my inbox.';

  const send = async () => {
    if (!ready) {
      setTouched(true);
      return;
    }
    if (!CONTACT_ENDPOINT) {
      window.location.href = `mailto:hello@graydonwasil.com?subject=${encodeURIComponent(
        `Message from ${name}`,
      )}&body=${encodeURIComponent(`${msg}\n\n— ${name} (${email})`)}`;
      setSent(true);
      return;
    }
    setSending(true);
    try {
      await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message: msg }),
      });
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    setSent(false);
    setTouched(false);
    setName('');
    setEmail('');
    setMsg('');
  };

  return (
    <div className="pane">
      <section className="hero hero--sub">
        <h1 className="disp hero-title">
          <span className="line">Say</span>
          <span className="line">something.</span>
        </h1>
      </section>

      <section className="contact-split">
        <div className="block">
          <p className="prose-lead">
            Questions, ideas, or an argument about which casting is the rarest &mdash; it all lands in
            the same inbox, and I answer everything.
          </p>
          <div className="linkstack mono">
            <a href="mailto:hello@graydonwasil.com">hello@graydonwasil.com</a>
            <a href="https://github.com/graydonwasil" target="_blank" rel="noreferrer">
              github.com/graydonwasil
            </a>
          </div>
        </div>

        <div className="formpanel glass">
          {!sent ? (
            <div className="formgrid">
              <div className="contact-fields">
                <div className="field">
                  <label htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>
                <div className="field">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    className="input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  className="input"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="What's on your mind?"
                />
              </div>
              <div className="formfoot">
                <button type="button" className="btn btn-primary" onClick={send} disabled={sending}>
                  {sending ? 'Sending…' : 'Send it'}
                </button>
                <span
                  className="mono formhint"
                  data-warn={touched && !ready ? '1' : '0'}
                  aria-live="polite"
                >
                  {formHint}
                </span>
              </div>
            </div>
          ) : (
            <div className="formgrid" aria-live="polite">
              <span className="mono block-label">Sent</span>
              <h2 className="pt sent-title">Thanks &mdash; that&rsquo;s on its way.</h2>
              <p className="prose-lead">
                I read everything, usually within a day. If it&rsquo;s about a casting, expect a long
                reply.
              </p>
              <div>
                <button type="button" className="btn btn-secondary" onClick={reset}>
                  Write another
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
