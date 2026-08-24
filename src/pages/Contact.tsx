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
  const hintColor = touched && !ready ? 'var(--color-accent-700)' : 'color-mix(in srgb, var(--color-text) 50%, transparent)';

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
    <section className="pane">
      <div className="split" style={{ alignItems: 'center' }}>
        <div>
          <h2 className="disp" style={{ fontSize: 'clamp(23px,min(3.4vw,4.8vh),44px)', marginBottom: 16 }}>
            <span className="line">Say</span>
            <span className="line">something.</span>
          </h2>
          <p style={{ margin: '0 0 20px', fontSize: 'clamp(13px,min(1.1vw,1.9vh),15.5px)', lineHeight: 1.5, color: 'color-mix(in srgb, var(--color-text) 82%, transparent)' }}>
            Hiring, freelance, or you just want to argue about which casting is the rarest. I answer
            everything.
          </p>
          <div style={{ display: 'grid', gap: 8 }} className="mono">
            <a href="mailto:hello@graydonwasil.com" style={{ textTransform: 'none' }}>hello@graydonwasil.com</a>
            <a href="https://github.com/graydonwasil" target="_blank" rel="noreferrer" style={{ textTransform: 'none' }}>github.com/graydonwasil</a>
          </div>
        </div>

        <div className="blueprint" style={{ padding: 'clamp(13px,2vh,22px)' }}>
          <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
          {!sent ? (
            <div style={{ display: 'grid', gap: 'clamp(8px,1.4vh,14px)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="field">
                  <label>Name</label>
                  <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
                </div>
                <div className="field">
                  <label>Email</label>
                  <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
                </div>
              </div>
              <div className="field">
                <label>Message</label>
                <textarea className="input" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="What are you building?" />
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                <button type="button" className="btn btn-primary" onClick={send} disabled={sending}>
                  {sending ? 'Sending…' : 'Send it'}
                </button>
                <span className="mono" style={{ color: hintColor }} aria-live="polite">{formHint}</span>
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 12, padding: '14px 0' }} aria-live="polite">
              <span className="mono" style={{ color: 'var(--color-accent-700)' }}>Message logged</span>
              <h3 className="pt" style={{ fontSize: 24 }}>Thanks — that's on its way.</h3>
              <p style={{ margin: 0, fontSize: 15, lineHeight: '23px', color: 'color-mix(in srgb, var(--color-text) 80%, transparent)' }}>
                I read everything, usually within a day. If it's about a casting, expect a long reply.
              </p>
              <div>
                <button type="button" className="btn btn-secondary" onClick={reset}>Write another</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
